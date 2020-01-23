import session from "./telegraf-session-firestore";
import commandParts from "telegraf-command-parts";
import merge from "lodash/merge";
import {db, hello_message, command_list, getCompileFunction} from "./common";
import Extra from 'telegraf/extra';
import Markup from 'telegraf/markup'
import telegraf from 'telegraf'
import stage from "./stage";
import {getDayStampByDateTime} from "./utils";
import {DateTime} from 'luxon'
/**
 *
 * @param {telegraf} bot
 * @param {bool} is_scene
 */
import {getStudent, findStudent, linkTelegramStudentToSession, refreshStudent, refreshSettings} from './common'
let render = getCompileFunction('tg');
export default function(bot, is_scene = false){
    bot.use(session({store: db}))
    bot.use(commandParts());
    bot.use(async (ctx, next) => {
        ctx.state.refreshStudent = refreshStudent;
        let student = await ctx.state.refreshStudent(ctx, (s,ctx)=>(s.bot_type==='tg' && (!ctx.from || s.user_id === ctx.from.id)));
        ctx.state.refreshSettings = refreshSettings;
        let settings = await ctx.state.refreshSettings(ctx);
        ctx.state.local_day_stamp = getDayStampByDateTime(DateTime.local());
        if (student !== null) {
            return next();
        }
        if (ctx.callbackQuery) {
            if (ctx.callbackQuery.data === "help_with_invitation_code") return next();
            await ctx.answerCbQuery('Для начала нужно отправить свой код приглашения', true);
            return;
            //return next();
        }
        if (ctx.updateType === "edited_message") return;
        let extra_info = Extra.markup((e) => e.inlineKeyboard([
            e.callbackButton('У меня нет кода приглашения', 'help_with_invitation_code')
        ]));
        if (ctx.message) {
            if (ctx.state.command && ctx.state.command.command === "start") {
                if (ctx.state.command.args) {
                    let st = await findStudent(ctx.state.command.splitArgs[0]);
                    if (st === null) {
                        await ctx.replyWithMarkdown(hello_message + "\n\n*Странно, я не смог найти твой код приглашения.\nОбратись к своему классному руководителю.*")
                        return;
                    }
                    await linkTelegramStudentToSession(ctx, ctx.message.chat.id, st);
                    let student = st.data();
                    await ctx.replyWithMarkdown(hello_message + "\n\n*Все готово для использования.*\n" +
                        "*Твое имя:* " + student.name.last_name + ' ' + student.name.first_name + "\n\n" + command_list);
                    return;
                }
                await ctx.replyWithMarkdown(hello_message + "\n\n*Отправь свой код приглашения, чтобы я знал, кто же ты такой.*");
                return;
            }
            if (!ctx.state.command && ctx.message.text) {
                let st = await findStudent(ctx.message.text);
                if (st === null) {
                    await ctx.replyWithMarkdown("*Не могу найти такой код приглашения...*\n\nПроверь его на ошибки " +
                        "или обратись к своему классному руководителю.", extra_info);
                    return;
                }
                await linkTelegramStudentToSession(ctx, ctx.message.chat.id, st);
                let student = st.data();
                await ctx.replyWithMarkdown(render('success_code', {
                    first_name: student.name.first_name,
                    last_name: student.name.last_name
                }));
                return;
            }
        }
        await ctx.replyWithMarkdown("Прежде чем выполнять команды, мне нужно знать, кто ты. " +
            "Для этого отправь мне свой код приглашения.", extra_info);
        //next();
    });

    bot.action('help_with_invitation_code', (ctx) => {
        ctx.editMessageReplyMarkup(Markup.inlineKeyboard(
            []
        ));
        ctx.replyWithMarkdown("Код приглашения можно узнать у своего классного руководителя. " +
            "Он выглядит как два английских слова и число. Они разделены с помощью дефиса.\nНапример, вот как он может выглядеть: test-code-72");
    });




    if(!is_scene) bot.use(stage.middleware());
};