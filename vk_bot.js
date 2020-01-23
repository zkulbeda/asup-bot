import {VK, Keyboard, APIError, VKError} from 'vk-io';

import {SessionManager} from '@vk-io/session';
import FirestoreStorage from "./vk-io-session-storage";
import {
    command_list,
    db,
    getCompileFunction, getStudentMenu,
    hello_message,
    linkTelegramStudentToSession,
    linkVkStudentToSession, messages, unlinkStudentInSession,
    refreshStudent, refreshSettings
} from "./common";
import SceneManager, {StepScene} from "@vk-io/scenes";
import merge from "lodash/merge";
import {getDayStampByDateTime} from "./utils";
import {DateTime} from "luxon";
import {getStudent, findStudent} from "./common";
import vk from "./vk_instance";

const hearCommand = (name, conditions, handle) => {
    if (typeof handle !== 'function') {
        handle = conditions;
        conditions = [`/${name}`];
    }

    if (!Array.isArray(conditions)) {
        conditions = [conditions];
    }

    bot.hear(
        [
            (text, {state}) => (
                state.command === name
            ),
            ...conditions
        ],
        handle
    );
};

let storage = new FirestoreStorage({
    store: db
});

let session_manager = new SessionManager({
    storage,
    getStorageKey(context) {
        let id = context.senderId || context.userId;
        return String(id);
    }
});

const sceneManager = new SceneManager();

const render = getCompileFunction('vk');

sceneManager.addScene(new StepScene("settings", [
    async (context) => {
        let keyboard = () => Keyboard.builder().textButton({
            label: render("send_questions_button", {send: !context.state.student.send_questions}),
            payload: {
                command: (context.state.student.send_questions ? "dont_" : "") + "send_questions",
            },
            color: Keyboard.PRIMARY_COLOR
        }).row().textButton({
            label: "Закрыть настройки",
            payload: {
                command: 'cancel_action'
            }
        });
        if (context.scene.step.firstTime) {
            context.send(render("settings_first_message"), {keyboard: keyboard()});
            return;
        }
        switch (context.state.command) {
            case "dont_send_questions":
                await context.state.student.update({
                    send_questions: false
                });
                context.send(render("dont_send_questions_answer"), {keyboard: keyboard()});
                break;
            case "send_questions":
                await context.state.student.update({
                    send_questions: true
                });
                context.send(render("send_questions_answer"), {keyboard: keyboard()});
                break;
            case "cancel_action":
                context.send(render('settings_closed'), {keyboard: Keyboard.builder()});
                await context.scene.leave();
                break;
            default:
                context.send(render("settings_first_message"), {keyboard: keyboard()});
        }
    }
]));
let bot = vk.updates;
bot.use(async (context, next) => {
    try {
        await next();
    } catch (error) {
        console.error('Handle webhook update error: ', error);
    }
});
bot.use(async (context, next) => {
    try {
        await next();
    } catch (error) {
        // If there is no access in the chat (https://vk.com/dev/messages.getConversationsById)
        if (error instanceof APIError && error.code === 917) {
            console.error("Нет разрешения на отправку сообщений")
            return;
        }

        if (!context.is('message')) {
            throw error;
        }
        throw error;
    }
});
bot.use(session_manager.middleware);
bot.use((context, next) => {
    if (!context.is('message')) return next();
    const {messagePayload} = context;

    context.state.command = messagePayload && messagePayload.command
        ? messagePayload.command
        : null;

    return next();
});
bot.use(async (ctx, next) => {
    if (!ctx.is('message')) return next();
    ctx.state.refreshStudent = refreshStudent;
    let student = await ctx.state.refreshStudent(ctx, (s, ctx) => (s.bot_type === 'vk' && ctx.senderId === s.user_id));
    ctx.state.refreshSettings = refreshSettings;
    let settings = await ctx.state.refreshSettings(ctx);
    ctx.state.local_day_stamp = getDayStampByDateTime(DateTime.local());
    if (student !== null) {
        return next();
    }
    if (ctx.hasText) {
        if (ctx.state.command) {
            if (ctx.state.command === "start") {
                ctx.send(render('start_bot_without_code'));
                return;
            }
            if (ctx.state.command === "help_with_invitation_code") {
                ctx.send(render('help_with_invitation_code'));
                return;
            }
        }
        let st = await findStudent(ctx.text);
        if (st === null) {
            ctx.send(render('code_not_found'), {
                keyboard: Keyboard.builder().textButton({
                    label: render('help_with_invitation_code_button_label'),
                    payload: {
                        command: 'help_with_invitation_code'
                    },
                    color: Keyboard.SECONDARY_COLOR
                }).inline()
            });
            return;
        }
        await linkVkStudentToSession(ctx, ctx.senderId, st);
        let student = st.data();
        ctx.send(render('success_code', {
            first_name: student.name.first_name,
            last_name: student.name.last_name
        }));
        return;
    }
})
bot.on("message_unsubscribe", async (ctx) => {
    let r = await refreshStudent(ctx);
    if (!r) return;
    await unlinkStudentInSession(ctx, ctx.state.studentRef);
    ctx.session = {};
});
bot.on("message_subscribe", async (ctx) => {
    return vk.api.messages.send({
        user_id: ctx.userId,
        message: render('start_bot_without_code')
    });
})
bot.use(sceneManager.middleware);
bot.use((context, next) => {
    if (!context.scene.current) {
        return next();
    }

    // const cancel =  context.messagePayload && context.messagePayload.command === 'cancel';
    const cancel = context.hasText && context.text === '/cancel';
    if (cancel) {
        context.send("Принудительная отмена.")
        return context.scene.leave({
            canceled: true
        });
    }

    return context.scene.reenter();
});

bot.hear("Настройки", (context) => {
    context.scene.enter('settings');
});
bot.hear('send', async (context) => {
    let message = await vk.api.messages.send({
            user_id: context.state.student.user_id,
            message: render('question', {menu: getStudentMenu(context)}),
            keyboard: Keyboard.builder().textButton({
                label: "Да",
                color: Keyboard.POSITIVE_COLOR,
                payload: {
                    command: 'selected_yes'
                }
            }).textButton({
                label: "Нет",
                color: Keyboard.NEGATIVE_COLOR,
                payload: {
                    command: "selected_no"
                }
            }).oneTime()
        }
    );
    await context.state.student.update({
        last_message_id: message,
        answer: null,
        answer_day_stamp: context.state.local_day_stamp
    })
});
bot.hear([
    /^(?:Да)?(?:, )?(?:сегодня )?(?:Я )?(?:сегодня )?(?:хочу |буду )?(?:сегодня )?(?:я )?((?:кушать|кушаю)|(?:питаться|питаюсь)|(?:есть|ем))(?: сегодня)?$/i,
    (text, {state}) => (state.command === 'selected_yes')
], async context => {
    let update = async () => {
        if (context.state.student.answer === true) {
            return await context.send(render("you_already_will_eat_today"), {
                keyboard: Keyboard.builder().textButton({
                    label: render("i_dont_want_eat_button"),
                    color: Keyboard.NEGATIVE_COLOR
                }).oneTime()
            })
        }
        if (context.state.student.message_send_day_stamp === context.state.local_day_stamp)
            try {
                await vk.api.messages.edit({
                    peer_id: context.state.student.user_id,
                    message_id: context.state.student.last_message_id,
                    message: render("edited_question", {menu: getStudentMenu(context), will_eat: true}),
                });
            } catch (e) {
                if (e instanceof VKError && e.code === 100) {
                } else throw e;
            }
        await context.state.student.update({
            answer: true,
            answer_day_stamp: context.state.local_day_stamp
        });
        await context.send(render("ok_you_will_eat_today" +
            (context.state.student.answer_day_stamp !== context.state.settings.day_stamp ? "_but_poll_isnt_active" : '')), {
            keyboard: Keyboard.builder().textButton({
                label: render("i_dont_want_eat_button"),
                color: Keyboard.NEGATIVE_COLOR
            }).oneTime()
        })
    }
    /**
     * Ситуации:
     * Ученик не ответил, когда опрос уже был сегодня
     * Ученик не ответил, когда опрос был вчера
     * Ученик ответил, когда опрос был вчера
     * Ученик ответил, когда опрос не был завершен вчера
     */

    /***
     * ответ, день ответа, статус опроса, день запуска - действие
     * null 1 false 0 - r
     * null 1 true 1 - r
     * null 1 false 1 - late
     * null 1 true 0 - r
     * true 1 true 1 - r
     * false 1 false 1 - late
     * false 2 false 1 - r
     */
    if (context.state.settings.day_stamp === context.state.local_day_stamp) {
        if (!context.state.settings.is_poll_active) {
            if (context.state.student.answer === null) {
                return await context.send(render("sorry_you_re_late", {notified: context.state.student.send_questions}), {
                    keyboard: Keyboard.builder().textButton({
                        label: render("i_will_eat_anyway_button"),
                        payload: {
                            command: "i_will_eat_anyway"
                        }
                    }).oneTime()
                });
            } else {
                return await context.send(render('sorry_timeout'));
            }
        }
    }
    await update();
});
bot.hear([
    /^(?:Нет)?(?:, )?(?:(?<!не )сегодня )?(?:Я )?(?:(?<!не )сегодня )?(не )(?:хочу |буду )?(?:(?<!не )сегодня )?(?:я )?((?:кушать|кушаю)|(?:питаться|питаюсь)|(?:есть|ем))(?: сегодня)?$/i,
    (text, {state}) => (state.command === 'selected_no')
], async context => {
    let update = async () => {
        if (context.state.student.answer === false) {
            return await context.send(render("you_already_will_not_eat_today"), {
                keyboard: Keyboard.builder().textButton({
                    label: render("i_want_eat_button"),
                    color: Keyboard.POSITIVE_COLOR
                }).oneTime()
            })
        }
        let promises = [];
        if (context.state.student.message_send_day_stamp === context.state.local_day_stamp)
                promises.push(vk.api.messages.edit({
                    peer_id: context.state.student.user_id,
                    message_id: context.state.student.last_message_id,
                    message: render("edited_question", {menu: getStudentMenu(context), will_eat: false}),
                }));
        promises.push(context.state.student.update({
            answer: false,
            answer_day_stamp: context.state.local_day_stamp
        }));
        promises.push(context.send(render("ok_you_will_not_eat_today" +
            (context.state.student.answer_day_stamp !== context.state.settings.day_stamp ? "_but_poll_isnt_active" : '')), {
            keyboard: Keyboard.builder().textButton({
                label: render("i_want_eat_button"),
                color: Keyboard.POSITIVE_COLOR
            }).oneTime()
        }));
        try{
            await Promise.all(promises);
        } catch (e) {
            if (e instanceof VKError && e.code === 100) {
            } else throw e;
        }
    }
    if (context.state.settings.day_stamp === context.state.local_day_stamp) {
        if (!context.state.settings.is_poll_active) {
            if (context.state.student.answer === null) {
                return await context.send(render("sorry_you_re_late", {notified: context.state.student.send_questions}));
            } else {
                return await context.send(render('sorry_timeout'));
            }
        }
    }
    await update();
});
bot.hear('late', (context) => {
    context.send(render('you_did_not_record_yourself', {notified: context.state.student.send_questions}))
})
hearCommand("i_will_eat_anyway", async (context) => {
    await context.state.student.update({
        late_day_stamp: context.state.local_day_stamp
    })
    await context.send(render('i_will_eat_anyway_text'));
})

bot.setHearFallbackHandler(async (context) => {
    await context.send(render("i_dont_understand"));
})
//

export let vk_bot = ((path = null) => {
    const headers = {
        connection: 'keep-alive',
        'content-type': 'text/plain'
    };
    return async (req, res, next) => {
        if (req.method !== 'POST') {
            next();
            return;
        }
        let update = req.body;
        try {
            const {webhookSecret, webhookConfirmation} = vk.options;
            if (webhookSecret !== null && update.secret !== webhookSecret) {
                res.writeHead(403);
                res.end();
                return;
            }
            if (update.type === 'confirmation') {
                if (webhookConfirmation === null) {
                    res.writeHead(500);
                    res.end();
                    return;
                }
                res.writeHead(200, headers);
                res.end(String(webhookConfirmation));
                return;
            }
            res.writeHead(200, headers);
            vk.updates.webhookTransport.webhookHandler(update).then(() => {
                res.end('ok');
            }).catch((error) => {
                // eslint-disable-next-line no-console
                console.error('Handle webhook update error', error);
            });
        } catch (error) {
            res.writeHead(415);
            res.end();
        }
    };
})()