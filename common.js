import firestore from "@google-cloud/firestore";
import cloud_key from './bot_credentials.json'

export let db = new firestore({
    credentials: cloud_key
});
export let hello_message = "*Привет, это бот школьной столовой школы №1 г. Дрогичина.*\n" +
    "Я буду опрашивать тебя каждый будний день, будешь ли ты кушать. " +
    "Возможно иногда буду присылать интересную информацию о школе.";
export let command_list = "Список доступных команд:\n" +
    "/setting - открыть настройки\n" +
    "/contact - получить контакты школы\n" +
    "/help - получить список команд\n";
export let messages = {
    hello_message: {
        vk: [
            "Привет, это бот школьной столовой школы №1 г. Дрогичина.\n" +
            "Я буду опрашивать тебя каждый будний день, будешь ли ты кушать. " +
            "Возможно иногда буду присылать интересную информацию о школе."
        ]
    },
    start_bot_without_code: {
        vk: [
            "{{'hello_message'|render}}\n\nОтправь свой код приглашения, чтобы я знал, кто же ты такой.",
        ],
        tg: [
            "{{'hello_message'|render}}\n\n*Отправь свой код приглашения, чтобы я знал, кто же ты такой.*"
        ]
    },
    help_with_invitation_code: [
        "Код приглашения можно узнать у своего классного руководителя. " +
        "Он выглядит как два английских слова и число. Они разделены с помощью дефиса.\nНапример, вот как он может выглядеть: test-code-72"
    ],
    code_not_found: {
        tg: [
            "*Не могу найти такой код приглашения...*\n\nПроверь его на ошибки " +
            "или обратись к своему классному руководителю."
        ],
        vk: [
            "Не могу найти такой код приглашения...\n\nПроверь его на ошибки " +
            "или обратись к своему классному руководителю."
        ]
    },
    help_with_invitation_code_button_label: "У меня нет кода приглашения",
    success_code: [
        "Отлично! 🎉\nТеперь я знаю, что ты — {{last_name}} {{first_name}}.\n" + //TODO проверить смайл 🥳
        'Все готово, не пропускай мои сообщения.'
    ],
    settings_first_message: [
        "Что же ты желаешь сделать?"
    ],
    send_questions_button: [
        "{{'Х' if send else 'Не х'}}очу получать уведомления"
    ],
    dont_send_questions_answer: {
        tg: [
            "Хорошо, теперь тебе придется *самостоятельно* сообщать, когда ты хочешь кушать. " +
            "\nДля этого отправь мне сообщение \"*Я буду кушать*\".\n{{'something_more'|render}}"
        ],
        vk: [
            "Хорошо, теперь тебе придется САМОСТОЯТЕЛЬНО сообщать, когда ты хочешь кушать. " +
            "\nДля этого отправь мне сообщение \"Я буду кушать\".\n{{'something_more'|render}}"
        ]
    },
    send_questions_answer: [
        "Хорошо, теперь каждый будний день я тебе буду присылать сообщение с вопросом.\n{{'something_more'|render}}"
    ],
    something_more: [
        "Может что-нибудь еще?",
        "Желаешь сделать что-нибудь еще?"
    ],
    settings_closed: [
        'Настройки закрыты'
    ],
    no_menu: [
        "К сожалению, сегодня меню не указано.",
        "Меню не указано. 🌚",
        "Кажется меню забыли указать. 😧",
    ],
    question: {
        vk: "{{'eating_question'|render}}\n\n" +
            "{{'today_in_dining_room'|render}}\n" +
            "{{menu}}",
        tg: "*{{'eating_question'|render}}*\n\n" +
            "*{{'today_in_dining_room'|render}}*\n" +
            "{{menu}}"
    },
    edited_question: {
        vk: "{{'your_answer'|render}} {{('i_want_eat' if will_eat else 'i_dont_want_eat')|render}}.\n\n" +
            "{{'today_in_dining_room'|render}}\n" +
            "{{menu}}",
        tg: "{{('i_want_eat_thanks' if will_eat else 'i_dont_want_eat_okay')|render}}\n\n" +
            "*Ты еще можешь изменить свой выбор.*\n" +
            "*{{'today_in_dining_room'|render}}*\n" +
            "{{menu}}"
    },
    stopped_poll_question: {
        tg: "*{{'your_answer'|render}} {{('i_want_eat' if will_eat else 'i_dont_want_eat')|render}}.*\n\n" +
            "*{{'today_in_dining_room'|render}}*\n" +
            "{{menu}}",
    },
    your_answer: [
        "Твой ответ:",
        "Твой выбор:"
    ],
    i_want_eat: [
        "я буду есть",
        "я буду кушать",
        "я питаюсь сегодня",
        "я сегодня ем",
    ],
    i_dont_want_eat: [
        "я не буду есть",
        "я не буду кушать",
        "я не питаюсь сегодня",
        "я сегодня не ем",
    ],
    i_want_eat_thanks: [
        "Отлично, приятного аппетита👌🏻"
    ],
    i_dont_want_eat_okay: [
        "Хорошо, спасибо за твой ответ 👩🏻‍🍳"
    ],
    i_want_eat_button: "{{'i_want_eat'|render|capitalize_first}}",
    i_dont_want_eat_button: "Нет, {{'i_dont_want_eat'|render}}",
    today_in_dining_room: [
        "Сегодня в столовой:",
        "В столовой сегодня:",
        "В меню сегодня:",
        "Сегодня столовая предлагает:"
    ],
    eating_question: [
        'Привет, ты будешь сегодня питаться?',
        "Привет, не хочешь подкрепиться?"
    ],
    ok_you_will_eat_today: [
        "Хорошо, ты кушаешь сегодня.",
        "Отлично, буду знать, что ты питаешься сегодня🤗",
        "Хорошо, я передам это в столовую😏",
        "Окей, спасибо за твой ответ🙂"
    ],
    ok_you_will_not_eat_today: [
        'Ладно, ты не кушаешь сегодня.',
        "Ладно, я передам в столовую информацию об этом😟",
        "Хорошо, я сообщю нашей столовой об этой печальной новости😭"
    ],
    ok_you_will_eat_today_but_poll_isnt_active: [
        "Хорошо, если столовая работает сегодня, мы сообщим ей о том, что ты кушаешь."
    ],
    ok_you_will_not_eat_today_but_poll_isnt_active: [
        "Хорошо, если столовая работает сегодня, мы сообщим ей о том, что ты не кушаешь."
    ],
    you_already_will_eat_today: [
        "Да, я уже знаю, что ты будешь питаться сегодня"
    ],
    you_already_will_not_eat_today: [
        "Да, я уже знаю, что ты не будешь питаться сегодня"
    ],
    sorry_timeout: [
        "Извини, но уже свой выбор изменить нельзя",
    ],
    sorry_you_re_late: {
        vk: "Ты опоздал на запись.\n" +
            "Пожалуйста, в следующий раз {{'не пропусти наше сообщение' if notified else 'не забывай рассказать нам о своих планах'}}.",
        tg: "*Извини, ты опоздал на запись сегодня.*\n" +
            "Пожалуйста, в следующий раз {{'не пропусти наше сообщение' if notified else 'не забывай рассказать нам о своих планах'}}."
    },
    i_will_eat_anyway_button: {
        vk: "Но я все равно пойду есть",
        tg: "Но я все равно пойду есть"
    },
    i_will_eat_anyway_text: {
        vk: "Хорошо, мы уведомим столовую о том, что ты собираешься кушать.\n" +
            "Важно говорить в начале дня о том, что ты собираешься питаться. Повара приготавливают порцию специально для тебя. " +
            "В один день может получиться так, что лишних порций просто не останется и тебе придется быть без обеда.",
        tg: "*Хорошо, мы уведомим столовую о том, что ты собираешься кушать.*\n\n" +
            "Важно говорить в начале дня о том, что ты собираешься питаться. Повара приготавливают порцию специально для тебя. " +
            "В один день может получиться так, что лишних порций просто не останется и тебе придется быть без обеда."
    },
    you_did_not_record_yourself: {
        vk: "Ты питался сегодня.\n\n" + //TODO Изменить текст если ученик ответил НЕТ
            "Тебя не нашли в записях столовой сегодня. Пожалуйста, " +
            "{{'не забывай отвечать на мои сообщения' if notified else " +
            "'не забывай отправлять мне сообщения о том, что ты питаешься сегодня. Или я могу напоминать тебе об этом.'}}. " +
            "Это важно.\n\n" +
            "Если это не твое действие, обратись к своему классному руководителю. " +
            "Возможно, кто-то пользовался твоей картой питания.",
        tg: "*Ты питался сегодня.*\n\n" +
            "Тебя не нашли в записях столовой сегодня. " +
            "Пожалуйста, " +
            "{{'не забывай отвечать на мои сообщения' if notified else " +
            "'не забывай отправлять мне сообщения о том, что ты питаешься сегодня. Или в настойках включи отправку вопросов.'}}. " +
            "*Это важно.*"
    },
    but_i_did_not_eat_today: [
        "*Ты питался сегодня.*\n\n" +
        "Если это не твое действие, тогда, возможно, кто-то пользовался твоей картой питания. " +
        "Расскажи об этом классному руководителю, и мы попробуем предотвратить это.",
    ],
    but_i_did_not_eat_today_button: [
        "Но я не делал этого",
        "Но я сегодня не питался"
    ],
    i_dont_understand: [
        "Эмм, кажется, я не понимаю тебя. Не забывай: я всего лишь бот.",
        "Извини, я не понял тебя. Я умею выполнять только команды.",
        "К сожалению, я умею понимать только команды."
    ],
    i_dont_understand_media: [
        "К сожалению, я не умею обрабатывать такие сообщения."
    ],
    you_have_been_unlinked: [
        "Кто-то привязал твой аккаунт к себе с помощью пригласительного кода. " +
        "Теперь я не смогу выполнять твои команды. Если это сделал не ты, сообщи от этом классному руководителю."
    ],
    help: [
        "{{'hello_message'|render}}\n" +
        "iosfvgneognvo"
    ]
}

export let question_keyboard = (yes_answer)=>Extra.markdown().markup((e)=>e.inlineKeyboard([
    e.callbackButton((yes_answer===true?"✅ ":"")+"Да", yes_answer?"none":"selected_yes"),
    e.callbackButton((yes_answer===false?"✅ ":"")+"Нет", !yes_answer?"none":"selected_no")
]));

import nunjucks from "nunjucks"
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray'
import random from 'lodash/random'
import merge from "lodash/merge";

let env = new nunjucks.Environment();

env.addFilter('render', function (name, data) {
    return getMessage(this.env.getGlobal('messenger'), name, data)
})
env.addFilter("capitalize_first", function (text) {
    text = text.split("");
    text[0] = text[0].toUpperCase();
    return text.join("");
})

export function getMessage(messenger, text_message_id, data) {
    let text = messages[text_message_id];
    if (!text) throw Error("Шаблон сообщения не найден " + text_message_id);
    if (isPlainObject(text)) {
        if (messenger)
            text = text[messenger];
        else text = text.vk;
    }
    if (isArray(text)) {
        let el = random(0, text.length - 1, false);
        text = text[el];
    }
    return env.renderString(text, data);
}

export function getCompileFunction(messenger) {
    env.addGlobal('messenger', messenger)
    return (text_message_id, data) => {
        return getMessage(messenger, text_message_id, data)
    }
}

export async function getStudent(ctx) {
    if (!ctx.session.student_id) return null;
    let student = await db.collection('students').doc(ctx.session.student_id).get();
    if (!student.exists) return null;
    //console.log(student);
    return student;
}

export function getStudentMenu(ctx) {
    let menu = ctx.state.settings.menu[ctx.state.student.eating_type];
    if (!menu) menu = getMessage(null, "no_menu");
    return menu;
}

export async function findStudent(invitation_code) {
    let student = await db.collection('students').where('invitation_code', '==', invitation_code).limit(1).get();
    if (student.empty) return null;
    return student.docs[0];
}

export function get_db_data(el) {
    return {
        _id: el.id,
        ...el.data()
    }
}

export async function linkTelegramStudentToSession(ctx, chat_id, student) {
    ctx.session.student_id = student.id;
    await notify_about_unlink(student);
    await student.ref.update({
        user_id: chat_id,
        bot_type: 'tg',
        last_message_id: null,
        last_sticker_message_id: null
    });
}

export async function linkVkStudentToSession(ctx, chat_id, student) {
    ctx.session.student_id = student.id;
    await notify_about_unlink(student);
    await student.ref.update({
        user_id: chat_id,
        bot_type: 'vk',
        last_message_id: null,
        last_sticker_message_id: null,
        //TODO use_old_client: true
    });
}

export async function unlinkStudentInSession(ctx, student) {
    ctx.session.student_id = undefined;
    await unlinkStudent(student);
}

export async function unlinkStudent(student) {

    await student.ref.update({
        user_id: null,
        bot_type: null,
        last_message_id: null,
        last_sticker_message_id: null,
        //TODO use_old_client: true
    });
}

export async function refreshStudent(ctx, check_link) {
    let student = await getStudent(ctx);
    if (!student) return null;
    if (!check_link(student.data(), ctx)) {
        ctx.session = {};
        return null;
    }
    ctx.state.studentRef = student;
    ctx.state.student = student.data();
    ctx.state.student._id = student.id;
    ctx.state.student.update = async (els) => {
        let res = await student.ref.update(els);
        ctx.state.student = merge(ctx.state.student, els);
        return res;
    }
}

export async function refreshSettings(ctx) {
    let settings = await db.collection("system").doc("settings").get();
    ctx.state.settingsRef = settings;
    ctx.state.settings = settings.data();
    ctx.state.settings.update = async (els) => {
        let res = await settings.ref.update(els);
        ctx.state.settings = merge(ctx.state.settings, els);
        return res;
    }
}

export async function getSettings() {
    let settings = await db.collection("system").doc("settings").get();
    if (!settings.exists) {
        return null;
    }
    let data = settings.data();
    data.raw = settings;
    data.update = async (els) => {
        let res = await settings.ref.update(els);
        merge(this, els);
        return this;
    }
    return data;
}

import tg from './tg_instance';
import vk from './vk_instance';
import Extra from "telegraf/extra";

export async function notify_about_unlink(st) {
    let student = st.data();
    if (student.bot_type === "tg") {
        await tg.telegram.sendMessage(student.user_id, getMessage('tg', "you_have_been_unlinked"));
    } else if (student.bot_type === "vk") {
        await vk.api.messages.send({
            user_id: student.user_id,
            message: getMessage('vk', "you_have_been_unlinked")
        })
    }
}