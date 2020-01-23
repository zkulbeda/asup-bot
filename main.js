import Stage from 'telegraf/stage';
import Extra from 'telegraf/extra';
import Markup from 'telegraf/markup';
const {leave, enter} = Stage;
import standard_use from "./standard_use";
import {db, getStudent, getCompileFunction, getStudentMenu, question_keyboard} from "./common"
import bot from './tg_instance';
bot.catch(async (e)=>{
    console.log(e.toString());
    console.error(e);
});
const render = getCompileFunction("tg");

standard_use(bot);

let check_late_state = async (ctx)=>{
    if(!ctx.state.settings.is_poll_active) {
        if (ctx.state.student.answer === null) {
            return await ctx.replyWithMarkdown(render("sorry_you_re_late", {notified: ctx.state.student.send_questions}),
                Extra.markup(Markup.inlineKeyboard([
                    Markup.callbackButton(render('i_will_eat_anyway_button'), "i_want_eat")
                ])))
        }else{
            return await ctx.replyWithMarkdown(render('sorry_timeout'),
                (!ctx.state.student.answer?Extra.markup(Markup.inlineKeyboard([
                    Markup.callbackButton(render('i_will_eat_anyway_button'), "i_want_eat")
                ])):undefined));
        }
    }
    return false;
};

bot.command('start', async (ctx)=>{
    let student = await getStudent(ctx);
    if(student===null)
        await ctx.replyWithMarkdown("Привет, отправь свой код приглашения, чтобы я знал, кто ты.");
    let st_data = student.data(); //TODO Выделить это в отдельный middleware
    await ctx.reply("Привет, "+st_data.name.first_name+", я буду присылать тебе сообщения с вопросом," +
        " будешь ли ты кушать, каждый день. Если у тебя возникнут сложности, подойти к своему классному руководителю.");
});
bot.action('i_did_not_eat', (ctx)=>{
    return ctx.editMessageText(render("but_i_did_not_eat_today"), Extra.markdown())
});
bot.action("i_want_eat", async (ctx)=>{
    await ctx.state.student.update({
        late_day_stamp: ctx.state.local_day_stamp
    });
    await ctx.editMessageText(render("i_will_eat_anyway_text"), Extra.markdown());
});
bot.action(/^selected_(yes|no)$/, async (ctx)=>{
    if(ctx.callbackQuery.message.message_id !== ctx.state.student.last_message_id){
        return ctx.editMessageText('Сообщение больше не действительно.');
    }
    if(!ctx.state.settings.is_poll_active){
        if(ctx.state.student.answer === null){
            return await ctx.editMessageText(render("sorry_you_re_late"), Extra.markup((e) => e.inlineKeyboard([
                e.callbackButton(render("i_will_eat_anyway_button"), "i_want_eat")
            ])).markdown())
        }
        else return ctx.editMessageText(render("stopped_poll_question", {will_eat: ctx.state.student.answer, menu: getStudentMenu(ctx)}),
            Extra.markdown());
    }
    let yes_answer = ctx.match[1]==="yes";
    await ctx.state.student.update({
        answer: yes_answer
    });
    await ctx.editMessageText(render("edited_question", {will_eat: yes_answer, menu: getStudentMenu(ctx)}),
        question_keyboard(yes_answer));
    await ctx.answerCbQuery("", false)
});
bot.help((ctx)=>{
    return ctx.replyWithMarkdown(hello_message+"\n\n"+command_list);
});
bot.command('setting', enter('settings'));
bot.action("none", async (ctx)=>{
    await ctx.answerCbQuery("", false);
});
bot.on('callback_query', (ctx)=>{
    return ctx.answerCbQuery("Я не знаю, что делать с этой кнопкой");
});
bot.on("edited_message", (ctx)=>{
    return ctx.reply("Извини, я не умею обрабатывать отредактированные сообщения");
});
bot.hears(/^(?:Да)?(?:, )?(?:сегодня )?(?:Я )?(?:сегодня )?(?:хочу |буду )?(?:сегодня )?(?:я )?((?:кушать|кушаю)|(?:питаться|питаюсь)|(?:есть|ем))(?: сегодня)?$/i,
    async (ctx)=>{
        let is_days_same = ctx.state.settings.day_stamp === ctx.state.local_day_stamp;
        if(is_days_same && await check_late_state(ctx)) return;
        if(ctx.state.student.answer === true){
            return ctx.replyWithMarkdown(render("you_already_will_eat_today"))
        }
        await ctx.state.student.update({
            answer: true,
            answer_day_stamp: ctx.state.local_day_stamp
        });
        if(ctx.state.student.message_send_day_stamp === ctx.state.local_day_stamp)
            await bot.telegram.editMessageText(ctx.state.student.user_id, ctx.state.student.last_message_id, null,
                render("edited_question", {menu: getStudentMenu(ctx), will_eat: true}), question_keyboard(true));
        await ctx.replyWithMarkdown(render("ok_you_will_eat_today"+
            (!is_days_same?"_but_poll_isnt_active":'')));
    });
bot.hears(/^(?:Нет)?(?:, )?(?:(?<!не )сегодня )?(?:Я )?(?:(?<!не )сегодня )?(не )(?:хочу |буду )?(?:(?<!не )сегодня )?(?:я )?((?:кушать|кушаю)|(?:питаться|питаюсь)|(?:есть|ем))(?: сегодня)?$/i,
    async (ctx)=>{
        let is_days_same = ctx.state.settings.day_stamp === ctx.state.local_day_stamp;
        if(is_days_same && await check_late_state(ctx)) return;
        if(ctx.state.student.answer === false){
            return await ctx.replyWithMarkdown(render("you_already_will_not_eat_today"))
        }
        await ctx.state.student.update({
            answer: false,
            answer_day_stamp: ctx.state.local_day_stamp
        });
        if(ctx.state.student.message_send_day_stamp === ctx.state.local_day_stamp)
            await bot.telegram.editMessageText(ctx.state.student.user_id, ctx.state.student.last_message_id, null,
                render("edited_question", {menu: getStudentMenu(ctx), will_eat: false}), question_keyboard(false));
        await ctx.replyWithMarkdown(render("ok_you_will_not_eat_today"+
            (!is_days_same?"_but_poll_isnt_active":'')));
    });

bot.catch((err) => {
    console.log('Ooops', err)
});

bot.on('text',(ctx) => {
    return ctx.reply(render('i_dont_understand'));
    //return ctx.reply(`${ctx.message.from.username}: ${ctx.message.text}`)
});
bot.on("message", (ctx)=>{
    return ctx.reply(render("i_dont_understand_media"));
});
/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
export let mainBot = async (req, res) => {
    await bot.handleUpdate(req.body);
    return res.send("ok").end();
};