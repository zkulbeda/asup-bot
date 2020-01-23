import telegraf from 'telegraf';
import Extra from "telegraf/extra"
import Markup from "telegraf/markup"
import TelegramError from 'telegraf/core/network/error';
import {db, getMessage, getSettings, question_keyboard, unlinkStudent} from "./common";
import {getDayStampByDateTime} from "./utils";
import {DateTime} from "luxon";
import {Keyboard, VK} from "vk-io";
import modofun from "modofun";

let bot = new telegraf(process.env.botapi, {
    telegram: {
        webhookReply: false
    },
});
const vk = new VK({
    token: "17e439db455d36c65e95134c0e14998cb611be55f2a113225d2d711144237af341d76968643264a9bde4b"
});

/**
 *
 * @param student_id
 * @returns {Promise<null>}
 */
async function getStudent(student_id) {
    let student = await db.collection('students').doc(student_id).get();
    if (!student.exists) return null;
    return student;
}

function escapeMenu(menu) {
    menu = menu.replace(/\s+/g, ' ');
    menu = menu.replace(/\s*([,.])+\s*/g, "$1\n");
    menu = menu.replace(/\n[а-яА-Яa-zA-Z0-9_]/g, (s) => s.toUpperCase());
    menu = menu.split("");
    menu[0] = menu[0].toUpperCase();
    menu = menu.join("");
    return menu;
}

// async function withSettings(next) {
//     this.settings = await getSettings();
//     return next();
// }
//
// async function with

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
// export let commands = modofun({
//     test: async ()=>
// }, {
//     type: 'gcloud',
//     middleware: [
//         function(req, res, next){
//             if (req.body.secret !== "1234") { //todo
//                 return res.status(403).end();
//             }
//             next();
//         },
//     ]
// })

export let commandsBot = async (req, res) => {
    if (req.body.secret !== "1234") {
        return res.status(403).end();
    }
    let settings = await getSettings();
    switch (req.body.query) {
        case "send_question": {
            let st = await getStudent(req.body.student_id);
            if (st === null) return res.status(404).end();
            let student = st.data();
            if (!student.send_questions)
                return res.status(200).end();
            let message_id = null, sticker_message_id = null;
            switch (student.bot_type) {
                case "tg":
                    try {
                        if (student.send_stickers) {
                            let sticker = await bot.telegram.sendSticker(student.user_id, "CAADAgADRQADe8B9E0GlzdS6UZTnFgQ", Extra.notifications(false))
                            sticker_message_id = sticker.message_id;
                        }
                        let message = await bot.telegram.sendMessage(student.user_id,
                            getMessage('tg', student.answer===null?'question':'edited_question', {will_eat: student.answer, menu: settings.menu[student.eating_type]}),
                            question_keyboard(student.answer).notifications(student.answer===null));
                        message_id = message.message_id;
                    }catch (e) {
                        if(e instanceof TelegramError && e.code === 403){
                            await unlinkStudent(st)
                        }
                        else throw e
                    }
                    break;
                case 'vk': {
                    message_id = await vk.api.messages.send({
                        user_id: student.user_id,
                        message: getMessage('vk', 'question', {menu: settings.menu[student.eating_type]}),
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
                    });

                }
            }
            let now_day_stamp = getDayStampByDateTime(DateTime.local());
            await st.ref.update({
                last_message_id: message_id,
                last_sticker_message_id: sticker_message_id,
                answer: null,
                answer_day_stamp: now_day_stamp,
                message_send_day_stamp: now_day_stamp
            });
        }
            break;
        case "start_poll": {
            let raw_menu = req.body.menu;
            let menu = {};
            for (let key in raw_menu) {
                menu[key] = escapeMenu(raw_menu[key]);
            }
            await db.collection('system').doc('settings').update({
                is_poll_active: true,
                menu,
                day_stamp: getDayStampByDateTime(DateTime.local())
            });
        }
            break;
        case "stop_poll": {
            await db.collection('system').doc('settings').update({
                is_poll_active: false
            });
        }
            break;
        case "stop_poll_message": {
            let st = await getStudent(req.body.student_id);
            if (st === null) return res.status(404).end();
            let student = st.data();
            if (!student.send_questions)
                return res.status(200).end();
            try {
                switch (student.bot_type) {
                    case "tg": {
                        if (student.last_sticker_message_id)
                            try {
                                await bot.telegram.deleteMessage(student.user_id, student.last_sticker_message_id);
                            } catch (e) {
                                if (e instanceof TelegramError && e.code === 400) {
                                } else throw e;
                            }
                        if (student.answer === null) {
                            await bot.telegram.editMessageText(student.user_id, student.last_message_id, null,
                                getMessage('tg', "sorry_you_re_late", {notified: student.send_questions}),
                                Extra.markup((e) => e.inlineKeyboard([
                                    e.callbackButton(getMessage('tg',"i_will_eat_anyway_button"), "i_want_eat")
                                ])).markdown());
                        } else {
                            await bot.telegram.editMessageText(student.user_id, student.last_message_id, null,
                                getMessage("tg", "stopped_poll_question", {
                                    will_eat: student.answer,
                                    menu: settings.menu[student.eating_type]
                                }), Extra.markdown());
                        }
                    }
                        break;
                    case "vk": {

                    }
                        break;
                }
            }catch (e) {
                if(e instanceof TelegramError){
                    if(e.code === 403){
                        unlinkStudent(st);
                    }
                }
            }

        }
            break;
        case "forgot_to_notify": {
            let st = await getStudent(req.body.student_id);
            if (st === null) return res.status(404).end();
            let student = st.data();
            if(student.late_day_stamp === getDayStampByDateTime(DateTime.local())){
            }else
            try {
                switch (student.bot_type) {
                    case 'tg': {
                        await bot.telegram.sendMessage(student.user_id,
                            getMessage('tg', "you_did_not_record_yourself",
                                {answer: student.answer, notified: student.send_questions}),
                            Extra.markdown().markup(Markup.inlineKeyboard([Markup.callbackButton(getMessage('tg','but_i_did_not_eat_today_button'), "i_did_not_eat")])));
                    }
                        break;
                    case "vk": {
                        await vk.api.messages.send({
                            user_id: student.user_id,
                            message: getMessage('vk', 'you_did_not_record_yourself',
                                {answer: student.answer, notified: student.send_questions})
                        });
                    }
                }
            }catch (e) {
                if(e instanceof TelegramError){
                    if(e.code === 403)
                        unlinkStudent(st);
                }
            }
        }
            break;
    }
    res.send("ok").end();
    return res;
};