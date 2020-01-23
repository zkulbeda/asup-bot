import telegraf from "telegraf";

let bot = new telegraf(process.env.botapi, {
    telegram: {
        webhookReply: false
    },
});
export default bot;