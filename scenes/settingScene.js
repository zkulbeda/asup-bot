import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage'
import Markup from 'telegraf/markup';
import standard_use from "../standard_use";

const settingsScene = new Scene('settings')
const {leave, enter} = Stage
// standard_use(settingsScene, true);
let setting_keyboard = (ctx) => Markup.keyboard([
    (!ctx.state.student.send_stickers ? "П" : "Не п") + "рисылай мне стикеры",
    (!ctx.state.student.send_questions ? "Х" : "Не х") + "очу получать уведомления",
    "Закрыть"
]).oneTime(true).resize().extra();
settingsScene.enter((ctx) => ctx.reply("Что же ты желаешь сделать?", setting_keyboard(ctx)));
settingsScene.leave((ctx) => ctx.reply('Настройки закрыты', Markup.removeKeyboard().extra()))
settingsScene.command('back', leave());
settingsScene.hears("Закрыть", leave());
settingsScene.hears("Присылай мне стикеры", async (ctx) => {
    await Promise.all([
        ctx.state.student.update({
            send_stickers: true
        }),
        ctx.reply("Хорошо, теперь я буду присылать тебе стикеры.\nМожет что-нибудь еще?", setting_keyboard(ctx))
    ]);
});
settingsScene.hears("Не присылай мне стикеры", async (ctx) => {
    await Promise.all([
        ctx.state.student.update({
            send_stickers: false
        }),
        ctx.reply("Хорошо, теперь я не буду присылать тебе стикеры.\nМожет что-нибудь еще?", setting_keyboard(ctx))
    ]);
});
settingsScene.hears("Не хочу получать уведомления", async (ctx) => {
    await Promise.all([
        ctx.state.student.update({
            send_questions: false
        }),
        ctx.replyWithMarkdown("Хорошо, теперь тебе придется *самостоятельно* сообщать, когда ты хочешь кушать. " +
            "\nДля этого отправь мне сообщение \"*Я буду кушать*\".\nМожет что-нибудь еще?", setting_keyboard(ctx))
    ]);
});
settingsScene.hears("Хочу получать уведомления", async (ctx) => {
    await Promise.all([
        ctx.state.student.update({
            send_questions: true
        }),
        ctx.reply("Хорошо, теперь каждый будний день я тебе буду присылать сообщение с вопросом.\nМожет что-нибудь еще?", setting_keyboard(ctx))
    ]);
});
settingsScene.on('message', (ctx) => ctx.reply('Ты сейчас находишься в настройках'))
export default settingsScene;