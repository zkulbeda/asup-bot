module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./express.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./async_to_middleware.ts":
/*!********************************!*\
  !*** ./async_to_middleware.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function handle(result, next) {
    if (result && typeof result.then === 'function') {
        return result.then(function (n) {
            if (n === true)
                next();
        }, function (err) {
            return next(err || new Error('Promise was rejected with a falsy value'));
        });
    }
    return result;
}
function wrap(fn) {
    if (fn.length === 3) {
        return function (err, ctx, next) {
            return handle(fn(err, ctx, next), next);
        };
    }
    return function (ctx, next) {
        return handle(fn(ctx, next), next);
    };
}
exports.wrap = wrap;


/***/ }),

/***/ "./commands.js":
/*!*********************!*\
  !*** ./commands.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commandsBot = void 0;

var _telegraf = _interopRequireDefault(__webpack_require__(/*! telegraf */ "telegraf"));

var _extra = _interopRequireDefault(__webpack_require__(/*! telegraf/extra */ "telegraf/extra"));

var _markup = _interopRequireDefault(__webpack_require__(/*! telegraf/markup */ "telegraf/markup"));

var _error = _interopRequireDefault(__webpack_require__(/*! telegraf/core/network/error */ "telegraf/core/network/error"));

var _common = __webpack_require__(/*! ./common */ "./common.js");

var _utils = __webpack_require__(/*! ./utils */ "./utils.js");

var _luxon = __webpack_require__(/*! luxon */ "luxon");

var _vkIo = __webpack_require__(/*! vk-io */ "vk-io");

var _modofun = _interopRequireDefault(__webpack_require__(/*! modofun */ "modofun"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let bot = new _telegraf.default("587297912:AAEgIY01EjZJ0-jkVape0rwCbXfLl521mcE", {
  telegram: {
    webhookReply: false
  }
});
const vk = new _vkIo.VK({
  token: "17e439db455d36c65e95134c0e14998cb611be55f2a113225d2d711144237af341d76968643264a9bde4b"
});
/**
 *
 * @param student_id
 * @returns {Promise<null>}
 */

async function getStudent(student_id) {
  let student = await _common.db.collection('students').doc(student_id).get();
  if (!student.exists) return null;
  return student;
}

function escapeMenu(menu) {
  menu = menu.replace(/\s+/g, ' ');
  menu = menu.replace(/\s*([,.])+\s*/g, "$1\n");
  menu = menu.replace(/\n[а-яА-Яa-zA-Z0-9_]/g, s => s.toUpperCase());
  menu = menu.split("");
  menu[0] = menu[0].toUpperCase();
  menu = menu.join("");
  return menu;
} // async function withSettings(next) {
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


let commandsBot = async (req, res) => {
  console.log(req.body);

  if (req.body.secret !== "1234") {
    return res.status(403).end();
  }

  let settings = await (0, _common.getSettings)();

  switch (req.body.query) {
    case "send_question":
      {
        let st = await getStudent(req.body.student_id);
        if (st === null) return res.status(404).end();
        console.log(st);
        let student = st.data();
        if (!student.send_questions) return res.status(200).end();
        let message_id = null,
            sticker_message_id = null;

        switch (student.bot_type) {
          case "tg":
            try {
              if (student.send_stickers) {
                let sticker = await bot.telegram.sendSticker(student.user_id, "CAADAgADRQADe8B9E0GlzdS6UZTnFgQ", _extra.default.notifications(false));
                sticker_message_id = sticker.message_id;
              }

              let message = await bot.telegram.sendMessage(student.user_id, (0, _common.getMessage)('tg', 'question', {
                menu: settings.menu[student.eating_type]
              }), _extra.default.markup(e => e.inlineKeyboard([e.callbackButton("Да", "selected_yes"), e.callbackButton("Нет", "selected_no")])).markdown());
              message_id = message.message_id;
            } catch (e) {
              if (e instanceof _error.default && e.code === 403) {
                await (0, _common.unlinkStudent)(st);
              } else throw e;
            }

            break;

          case 'vk':
            {
              message_id = await vk.api.messages.send({
                user_id: student.user_id,
                message: (0, _common.getMessage)('vk', 'question', {
                  menu: settings.menu[student.eating_type]
                }),
                keyboard: _vkIo.Keyboard.builder().textButton({
                  label: "Да",
                  color: _vkIo.Keyboard.POSITIVE_COLOR,
                  payload: {
                    command: 'selected_yes'
                  }
                }).textButton({
                  label: "Нет",
                  color: _vkIo.Keyboard.NEGATIVE_COLOR,
                  payload: {
                    command: "selected_no"
                  }
                }).oneTime()
              });
            }
        }

        let now_day_stamp = (0, _utils.getDayStampByDateTime)(_luxon.DateTime.local());
        await st.ref.update({
          last_message_id: message_id,
          last_sticker_message_id: sticker_message_id,
          answer: null,
          answer_day_stamp: now_day_stamp,
          message_send_day_stamp: now_day_stamp
        });
      }
      break;

    case "start_poll":
      {
        let raw_menu = req.body.menu;
        let menu = {};

        for (let key in raw_menu) {
          menu[key] = escapeMenu(raw_menu[key]);
        }

        await _common.db.collection('system').doc('settings').update({
          is_poll_active: true,
          menu,
          day_stamp: (0, _utils.getDayStampByDateTime)(_luxon.DateTime.local())
        });
      }
      break;

    case "stop_poll":
      {
        await _common.db.collection('system').doc('settings').update({
          is_poll_active: false
        });
      }
      break;

    case "stop_poll_message":
      {
        let st = await getStudent(req.body.student_id);
        if (st === null) return res.status(404).end();
        let student = st.data();
        if (!student.send_questions) return res.status(200).end();

        try {
          switch (student.bot_type) {
            case "tg":
              {
                if (student.last_sticker_message_id) try {
                  await bot.telegram.deleteMessage(student.user_id, student.last_sticker_message_id);
                } catch (e) {
                  if (e instanceof _error.default && e.code === 400) {} else throw e;
                }

                if (student.answer === null) {
                  await bot.telegram.editMessageText(student.user_id, student.last_message_id, null, (0, _common.getMessage)('tg', "sorry_you_re_late", {
                    notified: student.send_questions
                  }), _extra.default.markup(e => e.inlineKeyboard([e.callbackButton((0, _common.getMessage)('tg', "i_will_eat_anyway_button"), "i_want_eat")])).markdown());
                } else {
                  await bot.telegram.editMessageText(student.user_id, student.last_message_id, null, (0, _common.getMessage)("tg", "stopped_poll_question", {
                    will_eat: student.answer,
                    menu: settings.menu[student.eating_type]
                  }), _extra.default.markdown());
                }
              }
              break;

            case "vk":
              {}
              break;
          }
        } catch (e) {
          if (e instanceof _error.default) {
            if (e.code === 403) {
              (0, _common.unlinkStudent)(st);
            }
          }
        }
      }
      break;

    case "forgot_to_notify":
      {
        let st = await getStudent(req.body.student_id);
        if (st === null) return res.status(404).end();
        let student = st.data();

        if (student.late_day_stamp === (0, _utils.getDayStampByDateTime)(_luxon.DateTime.local())) {} else try {
          switch (student.bot_type) {
            case 'tg':
              {
                await bot.telegram.sendMessage(student.user_id, (0, _common.getMessage)('tg', "you_did_not_record_yourself", {
                  notified: student.send_questions
                }), _extra.default.markdown().markup(_markup.default.inlineKeyboard([_markup.default.callbackButton("Но я не кушал сегодня", "i_did_not_eat")])));
              }
              break;

            case "vk":
              {
                await vk.api.messages.send({
                  user_id: student.user_id,
                  message: (0, _common.getMessage)('vk', 'you_did_not_record_yourself', {
                    notified: student.send_questions
                  })
                });
              }
          }
        } catch (e) {
          if (e instanceof _error.default) {
            if (e.code === 403) (0, _common.unlinkStudent)(st);
          }
        }
      }
      break;
  }

  res.send("ok").end();
  return res;
};

exports.commandsBot = commandsBot;

/***/ }),

/***/ "./common.js":
/*!*******************!*\
  !*** ./common.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessage = getMessage;
exports.getCompileFunction = getCompileFunction;
exports.getStudent = getStudent;
exports.getStudentMenu = getStudentMenu;
exports.findStudent = findStudent;
exports.get_db_data = get_db_data;
exports.linkTelegramStudentToSession = linkTelegramStudentToSession;
exports.linkVkStudentToSession = linkVkStudentToSession;
exports.unlinkStudentInSession = unlinkStudentInSession;
exports.unlinkStudent = unlinkStudent;
exports.refreshStudent = refreshStudent;
exports.refreshSettings = refreshSettings;
exports.getSettings = getSettings;
exports.notify_about_unlink = notify_about_unlink;
exports.messages = exports.command_list = exports.hello_message = exports.db = void 0;

var _firestore = _interopRequireDefault(__webpack_require__(/*! @google-cloud/firestore */ "@google-cloud/firestore"));

var _telegrambot255720E48c84943b = _interopRequireDefault(__webpack_require__(/*! ./telegrambot-255720-e48c84943b78.json */ "./telegrambot-255720-e48c84943b78.json"));

var _nunjucks = _interopRequireDefault(__webpack_require__(/*! nunjucks */ "nunjucks"));

var _isPlainObject = _interopRequireDefault(__webpack_require__(/*! lodash/isPlainObject */ "lodash/isPlainObject"));

var _isArray = _interopRequireDefault(__webpack_require__(/*! lodash/isArray */ "lodash/isArray"));

var _random = _interopRequireDefault(__webpack_require__(/*! lodash/random */ "lodash/random"));

var _merge = _interopRequireDefault(__webpack_require__(/*! lodash/merge */ "lodash/merge"));

var _tg_instance = _interopRequireDefault(__webpack_require__(/*! ./tg_instance */ "./tg_instance.js"));

var _vk_instance = _interopRequireDefault(__webpack_require__(/*! ./vk_instance */ "./vk_instance.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let db = new _firestore.default({
  // projectId: "telegrambot-255720",
  // keyFilename: './telegrambot-255720-e48c84943b78.json'
  credentials: _telegrambot255720E48c84943b.default
});
exports.db = db;
let hello_message = "*Привет, это бот школьной столовой школы №1 г. Дрогичина.*\n" + "Я буду опрашивать тебя каждый будний день, будешь ли ты кушать. " + "Возможно иногда буду присылать интересную информацию о школе.";
exports.hello_message = hello_message;
let command_list = "Список доступных команд:\n" + "/setting - открыть настройки\n" + "/contact - получить контакты школы\n" + "/help - получить список команд\n";
exports.command_list = command_list;
let messages = {
  hello_message: {
    vk: ["Привет, это бот школьной столовой школы №1 г. Дрогичина.\n" + "Я буду опрашивать тебя каждый будний день, будешь ли ты кушать. " + "Возможно иногда буду присылать интересную информацию о школе."]
  },
  start_bot_without_code: {
    vk: ["{{'hello_message'|render}}\n\nОтправь свой код приглашения, чтобы я знал, кто же ты такой."],
    tg: ["{{'hello_message'|render}}\n\n*Отправь свой код приглашения, чтобы я знал, кто же ты такой.*"]
  },
  help_with_invitation_code: ["Код приглашения можно узнать у своего классного руководителя. " + "Он выглядит как два английских слова и число. Они разделены с помощью дефиса.\nНапример, вот как он может выглядеть: test-code-72"],
  code_not_found: {
    tg: ["*Не могу найти такой код приглашения...*\n\nПроверь его на ошибки " + "или обратись к своему классному руководителю."],
    vk: ["Не могу найти такой код приглашения...\n\nПроверь его на ошибки " + "или обратись к своему классному руководителю."]
  },
  help_with_invitation_code_button_label: "У меня нет кода приглашения",
  success_code: ["Отлично! 🎉\nТеперь я знаю, что ты — {{last_name}} {{first_name}}.\n" + //TODO проверить смайл 🥳
  'Все готово, не пропускай мои сообщения.'],
  settings_first_message: ["Что же ты желаешь сделать?"],
  send_questions_button: ["{{'Х' if send else 'Не х'}}очу получать уведомления"],
  dont_send_questions_answer: {
    tg: ["Хорошо, теперь тебе придется *самостоятельно* сообщать, когда ты хочешь кушать. " + "\nДля этого отправь мне сообщение \"*Я буду кушать*\".\n{{'something_more'|render}}"],
    vk: ["Хорошо, теперь тебе придется САМОСТОЯТЕЛЬНО сообщать, когда ты хочешь кушать. " + "\nДля этого отправь мне сообщение \"Я буду кушать\".\n{{'something_more'|render}}"]
  },
  send_questions_answer: ["Хорошо, теперь каждый будний день я тебе буду присылать сообщение с вопросом.\n{{'something_more'|render}}"],
  something_more: ["Может что-нибудь еще?", "Желаешь сделать что-нибудь еще?"],
  settings_closed: ['Настройки закрыты'],
  no_menu: ["К сожалению, сегодня меню не указано.", "Меню не указано. 🌚", "Кажется меню забыли указать. 😧"],
  question: {
    vk: "{{'eating_question'|render}}\n\n" + "{{'today_in_dining_room'|render}}\n" + "{{menu}}",
    tg: "*{{'eating_question'|render}}*\n\n" + "*{{'today_in_dining_room'|render}}*\n" + "{{menu}}"
  },
  edited_question: {
    vk: "{{'your_answer'|render}} {{('i_want_eat' if will_eat else 'i_dont_want_eat')|render}}.\n\n" + "{{'today_in_dining_room'|render}}\n" + "{{menu}}",
    tg: "{{('i_want_eat_thanks' if will_eat else 'i_dont_want_eat_okay')|render}}\n\n" + "*Ты еще можешь изменить свой выбор.*\n" + "*{{'today_in_dining_room'|render}}*\n" + "{{menu}}"
  },
  stopped_poll_question: {
    tg: "*{{'your_answer'|render}} {{('i_want_eat' if will_eat else 'i_dont_want_eat')|render}}.*\n\n" + "*{{'today_in_dining_room'|render}}*\n" + "{{menu}}"
  },
  your_answer: ["Твой ответ:", "Твой выбор:"],
  i_want_eat: ["я буду есть", "я буду кушать", "я питаюсь сегодня", "я сегодня ем"],
  i_dont_want_eat: ["я не буду есть", "я не буду кушать", "я не питаюсь сегодня", "я сегодня не ем"],
  i_want_eat_thanks: ["Отлично, приятного аппетита👌🏻"],
  i_dont_want_eat_okay: ["Хорошо, спасибо за твой ответ 👩🏻‍🍳"],
  i_want_eat_button: "{{'i_want_eat'|render|capitalize_first}}",
  i_dont_want_eat_button: "Нет, {{'i_dont_want_eat'|render}}",
  today_in_dining_room: ["Сегодня в столовой:", "В столовой сегодня:", "В меню сегодня:", "Сегодня столовая предлагает:"],
  eating_question: ['Привет, ты будешь сегодня питаться?', "Привет, не хочешь подкрепиться?"],
  ok_you_will_eat_today: ["Хорошо, ты кушаешь сегодня.", "Отлично, буду знать, что ты питаешься сегодня🤗", "Хорошо, я передам это в столовую😏", "Окей, спасибо за твой ответ🙂"],
  ok_you_will_not_eat_today: ['Ладно, ты не кушаешь сегодня.', "Ладно, я передам в столовую информацию об этом😟", "Хорошо, я сообщю нашей столовой об этой печальной новости😭"],
  ok_you_will_eat_today_but_poll_isnt_active: ["Хорошо, если столовая работает сегодня, мы сообщим ей о том, что ты кушаешь"],
  ok_you_will_not_eat_today_but_poll_isnt_active: ["Хорошо, если столовая работает сегодня, мы сообщим ей о том, что ты не кушаешь"],
  you_already_will_eat_today: ["Да, я уже знаю, что ты будешь питаться сегодня"],
  you_already_will_not_eat_today: ["Да, я уже знаю, что ты не будешь питаться сегодня"],
  sorry_timeout: ["Извини, но уже свой выбор изменить нельзя"],
  sorry_you_re_late: {
    vk: "Ты опоздал на запись.\n" + "Пожалуйста, в следующий раз {{'не пропусти наше сообщение' if notified else 'не забывай рассказать нам о своих планах'}}.",
    tg: "*Извини, ты опоздал на запись сегодня.*\n" + "Пожалуйста, в следующий раз {{'не пропусти наше сообщение' if notified else 'не забывай рассказать нам о своих планах'}}."
  },
  i_will_eat_anyway_button: {
    vk: "Но я все равно пойду есть",
    tg: "Но я все равно пойду есть"
  },
  i_will_eat_anyway_text: {
    vk: "Хорошо, мы уведомим столовую о том, что ты собираешься кушать.\n" + "Важно говорить в начале дня о том, что ты собираешься питаться. Повара приготавливают порцию специально для тебя. " + "В один день может получиться так, что лишних порций просто не останется и тебе придется быть без обеда.",
    tg: "*Хорошо, мы уведомим столовую о том, что ты собираешься кушать.*\n\n" + "Важно говорить в начале дня о том, что ты собираешься питаться. Повара приготавливают порцию специально для тебя. " + "В один день может получиться так, что лишних порций просто не останется и тебе придется быть без обеда."
  },
  you_did_not_record_yourself: {
    vk: "Ты питался сегодня.\n\n" + "Тебя не нашли в записях столовой сегодня. Пожалуйста, " + "{{'не забывай отвечать на мои сообщения' if notified else " + "'не забывай отправлять мне сообщения о том, что ты питаешься сегодня. Или я могу напоминать тебе об этом.'}}. " + "Это важно.\n\n" + "Если это не твое действие, обратись к своему классному руководителю. " + "Возможно, кто-то пользовался твоей картой питания.",
    tg: "*Ты питался сегодня.*\n\n" + "Тебя не нашли в записях столовой сегодня. " + "Пожалуйста, " + "{{'не забывай отвечать на мои сообщения' if notified else " + "'не забывай отправлять мне сообщения о том, что ты питаешься сегодня. Или в настойках включи отправку вопросов.'}}. " + "*Это важно.*"
  },
  but_i_did_not_eat_today: ["*Ты питался сегодня.*\n\n" + "Если это не твое действие, тогда, возможно, кто-то пользовался твоей картой питания." + "Расскажи об этом классному руководителю, и мы попробуем предотвратить это."],
  i_dont_understand: ["Эмм, кажется, я не понимаю тебя. Не забывай: я всего лишь бот.", "Извини, я не понял тебя. Я умею выполнять только команды.", "К сожалению, я умею понимать только команды."],
  i_dont_understand_media: ["К сожалению, я не умею обрабатывать такие сообщения."],
  you_have_been_unlinked: ["Кто-то привязал твой аккаунт к себе с помощью пригласительного кода. " + "Теперь я не смогу выполнять твои команды. Если это сделал не ты, сообщи от этом классному руководителю."],
  help: ["{{'hello_message'|render}}\n" + "iosfvgneognvo"]
};
exports.messages = messages;
let env = new _nunjucks.default.Environment();
env.addFilter('render', function (name, data) {
  return getMessage(this.env.getGlobal('messenger'), name, data);
});
env.addFilter("capitalize_first", function (text) {
  text = text.split("");
  text[0] = text[0].toUpperCase();
  return text.join("");
});

function getMessage(messenger, text_message_id, data) {
  let text = messages[text_message_id];
  if (!text) throw Error("Шаблон сообщения не найден " + text_message_id);

  if ((0, _isPlainObject.default)(text)) {
    if (messenger) text = text[messenger];else text = text.vk;
  }

  if ((0, _isArray.default)(text)) {
    let el = (0, _random.default)(0, text.length - 1, false);
    text = text[el];
  }

  return env.renderString(text, data);
}

function getCompileFunction(messenger) {
  env.addGlobal('messenger', messenger);
  return (text_message_id, data) => {
    return getMessage(messenger, text_message_id, data);
  };
}

async function getStudent(ctx) {
  if (!ctx.session.student_id) return null;
  let student = await db.collection('students').doc(ctx.session.student_id).get();
  if (!student.exists) return null; //console.log(student);

  return student;
}

function getStudentMenu(ctx) {
  let menu = ctx.state.settings.menu[ctx.state.student.eating_type];
  if (!menu) menu = getMessage(null, "no_menu");
  return menu;
}

async function findStudent(invitation_code) {
  let student = await db.collection('students').where('invitation_code', '==', invitation_code).limit(1).get();
  if (student.empty) return null;
  return student.docs[0];
}

function get_db_data(el) {
  return {
    _id: el.id,
    ...el.data()
  };
}

async function linkTelegramStudentToSession(ctx, chat_id, student) {
  ctx.session.student_id = student.id;
  await notify_about_unlink(student);
  await student.ref.update({
    user_id: chat_id,
    bot_type: 'tg',
    last_message_id: null,
    last_sticker_message_id: null
  });
}

async function linkVkStudentToSession(ctx, chat_id, student) {
  ctx.session.student_id = student.id;
  await notify_about_unlink(student);
  await student.ref.update({
    user_id: chat_id,
    bot_type: 'vk',
    last_message_id: null,
    last_sticker_message_id: null //TODO use_old_client: true

  });
}

async function unlinkStudentInSession(ctx, student) {
  ctx.session.student_id = undefined;
  await unlinkStudent(student);
}

async function unlinkStudent(student) {
  await student.ref.update({
    user_id: null,
    bot_type: null,
    last_message_id: null,
    last_sticker_message_id: null //TODO use_old_client: true

  });
}

async function refreshStudent(ctx, check_link) {
  let student = await getStudent(ctx);
  if (!student) return null;

  if (!check_link(student.data(), ctx)) {
    ctx.session = {};
    return null;
  }

  ctx.state.studentRef = student;
  ctx.state.student = student.data();
  ctx.state.student._id = student.id;

  ctx.state.student.update = async els => {
    let res = await student.ref.update(els);
    ctx.state.student = (0, _merge.default)(ctx.state.student, els);
    return res;
  };
}

async function refreshSettings(ctx) {
  let settings = await db.collection("system").doc("settings").get();
  ctx.state.settingsRef = settings;
  ctx.state.settings = settings.data();

  ctx.state.settings.update = async els => {
    let res = await settings.ref.update(els);
    ctx.state.settings = (0, _merge.default)(ctx.state.settings, els);
    return res;
  };
}

async function getSettings() {
  let settings = await db.collection("system").doc("settings").get();

  if (!settings.exists) {
    return null;
  }

  let data = settings.data();
  data.raw = settings;

  data.update = async els => {
    let res = await settings.ref.update(els);
    (0, _merge.default)(this, els);
    return this;
  };

  return data;
}

async function notify_about_unlink(st) {
  let student = st.data();

  if (student.bot_type === "tg") {
    await _tg_instance.default.telegram.sendMessage(student.user_id, getMessage('tg', "you_have_been_unlinked"));
  } else if (student.bot_type === "vk") {
    await _vk_instance.default.api.messages.send({
      user_id: student.user_id,
      message: getMessage('vk', "you_have_been_unlinked")
    });
  }
}

/***/ }),

/***/ "./express.js":
/*!********************!*\
  !*** ./express.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = _interopRequireDefault(__webpack_require__(/*! express */ "express"));

var _bodyParser = _interopRequireDefault(__webpack_require__(/*! body-parser */ "body-parser"));

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "axios"));

var func = _interopRequireWildcard(__webpack_require__(/*! ./main */ "./main.js"));

var cmd = _interopRequireWildcard(__webpack_require__(/*! ./commands */ "./commands.js"));

var vk = _interopRequireWildcard(__webpack_require__(/*! ./vk_bot */ "./vk_bot.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// process.env.botapi = '587297912:AAEgIY01EjZJ0-jkVape0rwCbXfLl521mcE';
let app = new _express.default();
app.use(_bodyParser.default.json());
app.all('/webhook', (req, res) => {
  func.mainBot(req, res);
  return res.send("ok");
});
app.all('/webhook_vk', (req, res) => {
  console.log(req.url);
  req.method = "POST";
  vk.vk_bot(req, res, function () {
    console.log(arguments);
  });
});
app.all('/command', cmd.commandsBot); // app.use(cmd.commands);

app.listen(5000);

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mainBot = void 0;

var _stage = _interopRequireDefault(__webpack_require__(/*! telegraf/stage */ "telegraf/stage"));

var _extra = _interopRequireDefault(__webpack_require__(/*! telegraf/extra */ "telegraf/extra"));

var _markup = _interopRequireDefault(__webpack_require__(/*! telegraf/markup */ "telegraf/markup"));

var _standard_use = _interopRequireDefault(__webpack_require__(/*! ./standard_use */ "./standard_use.js"));

var _common = __webpack_require__(/*! ./common */ "./common.js");

var _tg_instance = _interopRequireDefault(__webpack_require__(/*! ./tg_instance */ "./tg_instance.js"));

var _async_to_middleware = __webpack_require__(/*! ./async_to_middleware.ts */ "./async_to_middleware.ts");

var _luxon = __webpack_require__(/*! luxon */ "luxon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  leave,
  enter
} = _stage.default;

_tg_instance.default.catch(async e => {
  console.log(e.toString());
  console.error(e);
});

const render = (0, _common.getCompileFunction)("tg");
(0, _standard_use.default)(_tg_instance.default);

let question_keyboard = yes_answer => _extra.default.markdown().markup(e => e.inlineKeyboard([e.callbackButton((yes_answer ? "✅ " : "") + "Да", yes_answer ? "none" : "selected_yes"), e.callbackButton((!yes_answer ? "✅ " : "") + "Нет", !yes_answer ? "none" : "selected_no")]));

let check_late_state = async ctx => {
  if (!ctx.state.settings.is_poll_active) {
    if (ctx.state.student.answer === null) {
      return await ctx.replyWithMarkdown(render("sorry_you_re_late", {
        notified: ctx.state.student.send_questions
      }), _extra.default.markup(_markup.default.inlineKeyboard([_markup.default.callbackButton(render('i_will_eat_anyway_button'), "i_want_eat")])));
    } else {
      return await ctx.replyWithMarkdown(render('sorry_timeout'), !ctx.state.student.answer ? _extra.default.markup(_markup.default.inlineKeyboard([_markup.default.callbackButton(render('i_will_eat_anyway_button'), "i_want_eat")])) : undefined);
    }
  }

  return false;
};

_tg_instance.default.command('start', (0, _async_to_middleware.wrap)(async ctx => {
  let student = await (0, _common.getStudent)(ctx);
  if (student === null) await ctx.replyWithMarkdown("Привет, отправь свой код приглашения, чтобы я знал, кто ты.");
  let st_data = student.data(); //TODO Выделить это в отдельный middleware

  await ctx.reply("Привет, " + st_data.name.first_name + ", я буду присылать тебе сообщения с вопросом," + " будешь ли ты кушать, каждый день. Если у тебя возникнут сложности, подойти к своему классному руководителю.");
}));

_tg_instance.default.action('i_did_not_eat', (0, _async_to_middleware.wrap)(async ctx => {
  await ctx.editMessageText(render("but_i_did_not_eat_today"), _extra.default.markdown());
}));

_tg_instance.default.action("i_want_eat", (0, _async_to_middleware.wrap)(async ctx => {
  await ctx.state.student.update({
    late_day_stamp: ctx.state.local_day_stamp
  });
  await ctx.editMessageText(render("i_will_eat_anyway_text"), _extra.default.markdown());
}));

_tg_instance.default.action(/^selected_(yes|no)$/, (0, _async_to_middleware.wrap)(async ctx => {
  if (ctx.callbackQuery.message.message_id !== ctx.state.student.last_message_id) {
    return ctx.editMessageText('Сообщение больше не действительно.');
  }

  if (!ctx.state.settings.is_poll_active) {
    if (ctx.state.student.answer === null) {
      await ctx.editMessageText(render("sorry_you_re_late"), _extra.default.markup(e => e.inlineKeyboard([e.callbackButton(render("i_will_eat_anyway_button"), "i_want_eat")])).markdown());
    } else return ctx.editMessageText(render("stopped_poll_question", {
      will_eat: ctx.state.student.answer,
      menu: (0, _common.getStudentMenu)(ctx)
    }));
  }

  let yes_answer = ctx.match[1] === "yes";
  await ctx.state.student.update({
    answer: yes_answer
  });
  await ctx.editMessageText(render("edited_question", {
    will_eat: yes_answer,
    menu: (0, _common.getStudentMenu)(ctx)
  }), question_keyboard(yes_answer));
  await ctx.answerCbQuery("", false);
}));

_tg_instance.default.help((0, _async_to_middleware.wrap)(ctx => {
  return ctx.replyWithMarkdown(hello_message + "\n\n" + command_list);
}));

_tg_instance.default.command('setting', enter('settings'));

_tg_instance.default.action("none", (0, _async_to_middleware.wrap)(async ctx => {
  await ctx.answerCbQuery("", false);
}));

_tg_instance.default.on('callback_query', (0, _async_to_middleware.wrap)(ctx => {
  return ctx.answerCbQuery("Я не знаю, что делать с этой кнопкой");
}));

_tg_instance.default.on("edited_message", (0, _async_to_middleware.wrap)(ctx => {
  return ctx.reply("Извини, я не умею обрабатывать отредактированные сообщения");
}));

_tg_instance.default.hears(/^(?:Да)?(?:, )?(?:сегодня )?(?:Я )?(?:хочу |буду )?(?:сегодня )?(?:я )?((?:кушать|кушаю)|(?:питаться|питаюсь)|(?:есть|ем))(?: сегодня)?$/i, (0, _async_to_middleware.wrap)(async ctx => {
  let is_days_same = ctx.state.settings.day_stamp === ctx.state.local_day_stamp;
  if (is_days_same && (await check_late_state(ctx))) return;

  if (ctx.state.student.answer === true) {
    return ctx.replyWithMarkdown(render("you_already_will_eat_today"));
  }

  await ctx.state.student.update({
    answer: true,
    answer_day_stamp: ctx.state.local_day_stamp
  });
  if (ctx.state.student.message_send_day_stamp === ctx.state.local_day_stamp) await _tg_instance.default.telegram.editMessageText(ctx.state.student.user_id, ctx.state.student.last_message_id, null, render("edited_question", {
    menu: (0, _common.getStudentMenu)(ctx),
    will_eat: true
  }), question_keyboard(true));
  await ctx.replyWithMarkdown(render("ok_you_will_eat_today" + (!is_days_same ? "_but_poll_isnt_active" : '')));
}));

_tg_instance.default.hears(/^(?:Нет)?(?:, )?(?:(?<!не )сегодня )?(?:Я )?(не )(?:хочу |буду )?(?:(?<!не )сегодня )?(?:я )?((?:кушать|кушаю)|(?:питаться|питаюсь)|(?:есть|ем))(?: сегодня)?$/i, (0, _async_to_middleware.wrap)(async ctx => {
  let is_days_same = ctx.state.settings.day_stamp === ctx.state.local_day_stamp;
  if (is_days_same && (await check_late_state(ctx))) return;

  if (ctx.state.student.answer === false) {
    return await ctx.replyWithMarkdown(render("you_already_will_not_eat_today"));
  }

  await ctx.state.student.update({
    answer: false,
    answer_day_stamp: ctx.state.local_day_stamp
  });
  if (ctx.state.student.message_send_day_stamp === ctx.state.local_day_stamp) await _tg_instance.default.telegram.editMessageText(ctx.state.student.user_id, ctx.state.student.last_message_id, null, render("edited_question", {
    menu: (0, _common.getStudentMenu)(ctx),
    will_eat: false
  }), question_keyboard(false));
  await ctx.replyWithMarkdown(render("ok_you_will_not_eat_today" + (!is_days_same ? "_but_poll_isnt_active" : '')));
}));

_tg_instance.default.catch(err => {
  console.log('Ooops', err);
});

_tg_instance.default.on('text', (0, _async_to_middleware.wrap)(ctx => {
  return ctx.reply(render('i_dont_understand')); //return ctx.reply(`${ctx.message.from.username}: ${ctx.message.text}`)
}));

_tg_instance.default.on("message", (0, _async_to_middleware.wrap)(ctx => {
  return ctx.reply(render("i_dont_understand_media"));
}));
/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */


let mainBot = async (req, res) => {
  let r = _luxon.DateTime.local();

  console.log('started');
  await _tg_instance.default.handleUpdate(req.body, res);
  console.log("ended", r - _luxon.DateTime.local());
};

exports.mainBot = mainBot;

/***/ }),

/***/ "./scenes/settingScene.js":
/*!********************************!*\
  !*** ./scenes/settingScene.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(/*! telegraf/scenes/base */ "telegraf/scenes/base"));

var _stage = _interopRequireDefault(__webpack_require__(/*! telegraf/stage */ "telegraf/stage"));

var _markup = _interopRequireDefault(__webpack_require__(/*! telegraf/markup */ "telegraf/markup"));

var _standard_use = _interopRequireDefault(__webpack_require__(/*! ../standard_use */ "./standard_use.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingsScene = new _base.default('settings');
const {
  leave,
  enter
} = _stage.default; // standard_use(settingsScene, true);

let setting_keyboard = ctx => _markup.default.keyboard([(!ctx.state.student.send_stickers ? "П" : "Не п") + "рисылай мне стикеры", (!ctx.state.student.send_questions ? "Х" : "Не х") + "очу получать уведомления", "Закрыть"]).oneTime(true).resize().extra();

settingsScene.enter(ctx => ctx.reply("Что же ты желаешь сделать?", setting_keyboard(ctx)));
settingsScene.leave(ctx => ctx.reply('Настройки закрыты', _markup.default.removeKeyboard().extra()));
settingsScene.command('back', leave());
settingsScene.hears("Закрыть", leave());
settingsScene.hears("Присылай мне стикеры", async ctx => {
  await ctx.state.student.update({
    send_stickers: true
  });
  ctx.reply("Хорошо, теперь я буду присылать тебе стикеры.\nМожет что-нибудь еще?", setting_keyboard(ctx));
});
settingsScene.hears("Не присылай мне стикеры", async ctx => {
  await ctx.state.student.update({
    send_stickers: false
  });
  console.log(setting_keyboard(ctx));
  console.log((await ctx.reply("Хорошо, теперь я не буду присылать тебе стикеры.\nМожет что-нибудь еще?", setting_keyboard(ctx))));
});
settingsScene.hears("Не хочу получать уведомления", async ctx => {
  await ctx.state.student.update({
    send_questions: false
  });
  ctx.replyWithMarkdown("Хорошо, теперь тебе придется *самостоятельно* сообщать, когда ты хочешь кушать. " + "\nДля этого отправь мне сообщение \"*Я буду кушать*\".\nМожет что-нибудь еще?", setting_keyboard(ctx));
});
settingsScene.hears("Хочу получать уведомления", async ctx => {
  await ctx.state.student.update({
    send_questions: true
  });
  ctx.reply("Хорошо, теперь каждый будний день я тебе буду присылать сообщение с вопросом.\nМожет что-нибудь еще?", setting_keyboard(ctx));
});
settingsScene.on('message', ctx => ctx.reply('Only text messages please'));
var _default = settingsScene;
exports.default = _default;

/***/ }),

/***/ "./stage.js":
/*!******************!*\
  !*** ./stage.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stage = _interopRequireDefault(__webpack_require__(/*! telegraf/stage */ "telegraf/stage"));

var _settingScene = _interopRequireDefault(__webpack_require__(/*! ./scenes/settingScene */ "./scenes/settingScene.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stage = new _stage.default([_settingScene.default]);
var _default = stage;
exports.default = _default;

/***/ }),

/***/ "./standard_use.js":
/*!*************************!*\
  !*** ./standard_use.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _telegrafSessionFirestore = _interopRequireDefault(__webpack_require__(/*! ./telegraf-session-firestore */ "./telegraf-session-firestore.js"));

var _telegrafCommandParts = _interopRequireDefault(__webpack_require__(/*! telegraf-command-parts */ "telegraf-command-parts"));

var _merge = _interopRequireDefault(__webpack_require__(/*! lodash/merge */ "lodash/merge"));

var _common = __webpack_require__(/*! ./common */ "./common.js");

var _extra = _interopRequireDefault(__webpack_require__(/*! telegraf/extra */ "telegraf/extra"));

var _markup = _interopRequireDefault(__webpack_require__(/*! telegraf/markup */ "telegraf/markup"));

var _telegraf = _interopRequireDefault(__webpack_require__(/*! telegraf */ "telegraf"));

var _stage = _interopRequireDefault(__webpack_require__(/*! ./stage */ "./stage.js"));

var _utils = __webpack_require__(/*! ./utils */ "./utils.js");

var _luxon = __webpack_require__(/*! luxon */ "luxon");

var _async_to_middleware = __webpack_require__(/*! ./async_to_middleware.ts */ "./async_to_middleware.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(bot, is_scene = false) {
  bot.use((0, _telegrafSessionFirestore.default)({
    store: _common.db
  }));
  bot.use((0, _telegrafCommandParts.default)());
  bot.use((0, _async_to_middleware.wrap)(async ctx => {
    ctx.state.refreshStudent = _common.refreshStudent;
    let student = await ctx.state.refreshStudent(ctx, (s, ctx) => s.bot_type === 'tg' && (!ctx.from || s.user_id === ctx.from.id));
    ctx.state.refreshSettings = _common.refreshSettings;
    let settings = await ctx.state.refreshSettings(ctx);
    ctx.state.local_day_stamp = (0, _utils.getDayStampByDateTime)(_luxon.DateTime.local());

    if (student !== null) {
      return true;
    }

    if (ctx.callbackQuery) {
      if (ctx.callbackQuery.data === "help_with_invitation_code") return next();
      await ctx.answerCbQuery('Для начала нужно отправить свой код приглашения', true);
      return; //return next();
    }

    if (ctx.updateType === "edited_message") return;

    let extra_info = _extra.default.markup(e => e.inlineKeyboard([e.callbackButton('У меня нет кода приглашения', 'help_with_invitation_code')]));

    if (ctx.message) {
      if (ctx.state.command && ctx.state.command.command === "start") {
        if (ctx.state.command.args) {
          let st = await (0, _common.findStudent)(ctx.state.command.splitArgs[0]);

          if (st === null) {
            await ctx.replyWithMarkdown(_common.hello_message + "\n\n*Странно, я не смог найти твой код приглашения.\nОбратись к своему классному руководителю.*");
            return;
          }

          await (0, _common.linkTelegramStudentToSession)(ctx, ctx.message.chat.id, st);
          let student = st.data();
          await ctx.replyWithMarkdown(_common.hello_message + "\n\n*Все готово для использования.*\n" + "*Твое имя:* " + student.name.last_name + ' ' + student.name.first_name + "\n\n" + _common.command_list);
          return;
        }

        await ctx.replyWithMarkdown(_common.hello_message + "\n\n*Отправь свой код приглашения, чтобы я знал, кто же ты такой.*");
        return;
      }

      if (!ctx.state.command && ctx.message.text) {
        let st = await (0, _common.findStudent)(ctx.message.text);

        if (st === null) {
          await ctx.replyWithMarkdown("*Не могу найти такой код приглашения...*\n\nПроверь его на ошибки " + "или обратись к своему классному руководителю.", extra_info);
          return;
        }

        await (0, _common.linkTelegramStudentToSession)(ctx, ctx.message.chat.id, st);
        let student = st.data();
        await ctx.replyWithMarkdown("Отлично! 🥳\nТеперь я знаю, что ты — " + student.name.last_name + ' ' + student.name.first_name + '.\n' + 'Все готово, не пропускай мои сообщения.');
        return;
      }
    }

    await ctx.replyWithMarkdown("Прежде чем выполнять команды, мне нужно знать, кто ты. " + "Для этого отправь мне свой код приглашения.", extra_info); //next();
  }));
  bot.action('help_with_invitation_code', (0, _async_to_middleware.wrap)(ctx => {
    ctx.editMessageReplyMarkup(_markup.default.inlineKeyboard([]));
    ctx.replyWithMarkdown("Код приглашения можно узнать у своего классного руководителя. " + "Он выглядит как два английских слова и число. Они разделены с помощью дефиса.\nНапример, вот как он может выглядеть: test-code-72");
  }));
  if (!is_scene) bot.use(_stage.default.middleware());
}

;

/***/ }),

/***/ "./telegraf-session-firestore.js":
/*!***************************************!*\
  !*** ./telegraf-session-firestore.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (opts) {
  const options = Object.assign({
    property: 'session',
    store: null,
    getSessionKey: ctx => ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`
  }, opts);

  if (!options.store) {
    throw Error("База не указана");
  }

  const ttlMs = options.ttl && options.ttl * 1000;
  return (ctx, next) => {
    const key = options.getSessionKey(ctx);

    if (!key) {
      return next(ctx);
    }

    const now = new Date().getTime();
    let docRef = options.store.collection('sessions').doc(key);
    return docRef.get().then(doc => {
      let session = null;

      if (!doc.exists || doc.data().expires != null && doc.data().expires >= now) {
        session = {};
      } else {
        session = doc.data().session;
      }

      Object.defineProperty(ctx, options.property, {
        get: function () {
          return session;
        },
        set: function (newValue) {
          session = Object.assign({}, newValue);
        }
      });
      return next(ctx).then(() => options.store.collection('sessions').doc(key).set({
        session,
        expires: ttlMs ? now + ttlMs : null
      }));
    });
  };
};

/***/ }),

/***/ "./telegrambot-255720-e48c84943b78.json":
/*!**********************************************!*\
  !*** ./telegrambot-255720-e48c84943b78.json ***!
  \**********************************************/
/*! exports provided: type, project_id, private_key_id, private_key, client_email, client_id, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"type\":\"service_account\",\"project_id\":\"telegrambot-255720\",\"private_key_id\":\"e48c84943b78cc852f77a70aedbf31262261cf7c\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCcQFsIYKZiU4pM\\nTq2AECz24WqeFz0R7T8lzO/+OqSrKfgvE+N9DduM5NdTaRa3z6AjGL5kgSM0ZmuT\\nTJIbOj4ojwUKD7dZ7BuA8hKvra99v3GBEmoid2H2fX02RNXpQI4B1nVj5q5jQixz\\ndit3+ThC9YdBCsbjFWj9wvGLNcnJQrU4Xj8QbFSsNC/WDitd66wv8XIgRwM2TPdq\\np4GXDRuhH2TpKliLT72rQAw2N7xGTjfryCl4j9hRehVzc4HPDmSFCQBeA13yR2Tj\\n8W883Y+WawqyiZf9Ce4GMCRdW1p5QOyKTXqL9tUWtSVNaOu/lOWGFf4xB1BkjBfF\\nbDtQKqBJAgMBAAECggEAAIYfuAS48hn1HAHkh4omWHKTjLGnwQRiYpJQGLJiJHfI\\nzwGaUOxHuO54gV1YF+gwkYWO99/N+ipAwJbwY3p7xF+MZQb99qV5xyIoqWGj9cA7\\nVXM2G2T6lVzA23p6HCTdBQkOzjWzDn6ljwKNrUKO63yOxktOtOq4ticd77lPsqbP\\nBOLs5JwJ9hCLNQHArrnm4MA1YH9cUPUQQbjyfn6a+jXKgG27YDYjavXx/JAEk/1I\\nTbPUhWGE9F0YvMYsqW+p5EPgXFNQVhWVhx5rxN9LL9Pv94mXuhapPD3gGyrlHM+p\\n+Txpbebnjlr3/qJdn4XfD8HJIZbakmU3/khJBzU0TQKBgQDI20vsn7BNBchddXxD\\nIZCHM84rZuE9MaqR3gzWUBtSXpiExQBGAZ0/klgOjNELo5Ty5eAnfeLJremecfO8\\nx5nW6Su2bj/Iv3eirFs8Os+s0r73LIZAY1U3uxO/PWhrhUz8l/KP5lyjJwG1C3fY\\nZtoc3CCj3l0uUeDCs/m3/gkHBQKBgQDHJheHslfCy/xAaDBpkixsvktRjSTAslqA\\nl7mUVkOoRgATb1LIVmwnMT0YJ8tLkR7cxte6q7PyhmF1HiSvo8NjdkX9GvSdLj6X\\nKx+BApBK4vs9yFiopTHb+gRmPVzo41JCMWV/+ov5Ig566dvOc9JGnxG7viZODRaj\\naRPKGaavdQKBgQCVd2NjfV3To0b8DU5gIl0Lz4hPkepxAEGe9K921/vM6unyeyr9\\n7XuX8A4pHa7+S0evDVMl8C7Qx+M+bivjwmD/pVpLEnXSrHCZlEr8YgNi5x0GkJKC\\n3ahvpX5HZKoMwRCOM4BkhxdOrds+X39agQc0TLbZWsLakkGAgi+FNLyBBQKBgQC+\\ndUKppzlhdh6wJjSusnpEIZX8z2Sn2arOMszr/bhE9XVbIOtl56kVrnSEZoJ5qbd/\\nY7erskytlDEehg6F37Ocqt9ymdX5gOGhRz+g7Se8RuoLA1EvMJXHkIumj+cMX2Mr\\nJPyycZZuVFDO4lsyTfh7S+P0znzpxoCxFWw0q2WLhQKBgQCAO5WQ799UTAOvpAbX\\nKDtZS/0OBC1VyYojuOiiCfLqRTIWslQ8JgvmCVhLRFcm/U/zG4S55PkziVJK1mKw\\n7XbO4VJuYni2TID94WwggXM0DVjeLZFHVzw4Al+2GWMhJN99YA6D/fh48zgqA+jx\\n2kf6yjqNAa9EArBIELI873EyHg==\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"telegrambot-255720@appspot.gserviceaccount.com\",\"client_id\":\"117914963901197902430\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"https://www.googleapis.com/robot/v1/metadata/x509/telegrambot-255720%40appspot.gserviceaccount.com\"}");

/***/ }),

/***/ "./tg_instance.js":
/*!************************!*\
  !*** ./tg_instance.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _telegraf = _interopRequireDefault(__webpack_require__(/*! telegraf */ "telegraf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let bot = new _telegraf.default("587297912:AAEgIY01EjZJ0-jkVape0rwCbXfLl521mcE", {
  telegram: {
    webhookReply: false
  }
});
var _default = bot;
exports.default = _default;

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDayStamp = getDayStamp;
exports.getDayStampByDateTime = getDayStampByDateTime;
exports.getTimeByDuration = getTimeByDuration;
exports.getIntervalByDurations = getIntervalByDurations;

var _luxon = __webpack_require__(/*! luxon */ "luxon");

/**
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {number} daystamp
 */
function getDayStamp(year, month, day) {
  return Math.round(_luxon.DateTime.local().set({
    year,
    month,
    day
  }).startOf('day').toSeconds() / (60 * 60 * 24));
}
/**
 *
 * @param {DateTime} time
 * @returns {number}
 */


function getDayStampByDateTime(time) {
  return Math.round(time.startOf('day').toSeconds() / (60 * 60 * 24));
}
/**
 *
 * @param duration
 * @param start_from
 * @returns {DateTime}
 */


function getTimeByDuration(duration, start_from) {
  start_from = start_from || _luxon.DateTime.local().startOf('day');
  return start_from.plus(duration);
}
/**
 *
 * @param d1
 * @param d2
 * @param start_from
 * @returns {Interval}
 */


function getIntervalByDurations(d1, d2, start_from) {
  start_from = start_from || _luxon.DateTime.local().startOf('day');
  return Interval.fromDateTimes(start_from.plus(d1), start_from.plus(d2));
}

/***/ }),

/***/ "./vk-io-session-storage.js":
/*!**********************************!*\
  !*** ./vk-io-session-storage.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FirestoreStorage {
  constructor(opts) {
    const options = Object.assign({
      property: 'session_vk',
      store: null
    }, opts);

    if (!options.store) {
      throw Error("База не указана");
    }

    this.store = options.store;
    this.property = options.property;
  }

  async get(key) {
    let res = await this.store.collection(this.property).doc(key).get();
    if (!res.exists) return undefined;
    return res.data();
  }

  async set(key, value) {
    delete value['$forceUpdate'];
    await this.store.collection(this.property).doc(key).set(value);
    return true;
  }

  async delete(key) {
    return this.store.collection(this.property).doc(key).delete();
  } // eslint-disable-next-line class-methods-use-this


  async touch() {// ...
  }

}

exports.default = FirestoreStorage;

/***/ }),

/***/ "./vk_bot.js":
/*!*******************!*\
  !*** ./vk_bot.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vk_bot = void 0;

var _vkIo = __webpack_require__(/*! vk-io */ "vk-io");

var _session = __webpack_require__(/*! @vk-io/session */ "@vk-io/session");

var _vkIoSessionStorage = _interopRequireDefault(__webpack_require__(/*! ./vk-io-session-storage */ "./vk-io-session-storage.js"));

var _common = __webpack_require__(/*! ./common */ "./common.js");

var _scenes = _interopRequireWildcard(__webpack_require__(/*! @vk-io/scenes */ "@vk-io/scenes"));

var _merge = _interopRequireDefault(__webpack_require__(/*! lodash/merge */ "lodash/merge"));

var _utils = __webpack_require__(/*! ./utils */ "./utils.js");

var _luxon = __webpack_require__(/*! luxon */ "luxon");

var _vk_instance = _interopRequireDefault(__webpack_require__(/*! ./vk_instance */ "./vk_instance.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hearCommand = (name, conditions, handle) => {
  if (typeof handle !== 'function') {
    handle = conditions;
    conditions = [`/${name}`];
  }

  if (!Array.isArray(conditions)) {
    conditions = [conditions];
  }

  bot.hear([(text, {
    state
  }) => state.command === name, ...conditions], handle);
};

let storage = new _vkIoSessionStorage.default({
  store: _common.db
});
let session_manager = new _session.SessionManager({
  storage,

  getStorageKey(context) {
    let id = context.senderId || context.userId;
    return String(id);
  }

});
const sceneManager = new _scenes.default();
const render = (0, _common.getCompileFunction)('vk');
sceneManager.addScene(new _scenes.StepScene("settings", [async context => {
  let keyboard = () => _vkIo.Keyboard.builder().textButton({
    label: render("send_questions_button", {
      send: !context.state.student.send_questions
    }),
    payload: {
      command: (context.state.student.send_questions ? "dont_" : "") + "send_questions"
    },
    color: _vkIo.Keyboard.PRIMARY_COLOR
  }).row().textButton({
    label: "Закрыть настройки",
    payload: {
      command: 'cancel_action'
    }
  });

  if (context.scene.step.firstTime) {
    context.send(render("settings_first_message"), {
      keyboard: keyboard()
    });
    return;
  }

  switch (context.state.command) {
    case "dont_send_questions":
      await context.state.student.update({
        send_questions: false
      });
      context.send(render("dont_send_questions_answer"), {
        keyboard: keyboard()
      });
      break;

    case "send_questions":
      await context.state.student.update({
        send_questions: true
      });
      context.send(render("send_questions_answer"), {
        keyboard: keyboard()
      });
      break;

    case "cancel_action":
      context.send(render('settings_closed'), {
        keyboard: _vkIo.Keyboard.builder()
      });
      await context.scene.leave();
      break;

    default:
      context.send(render("settings_first_message"), {
        keyboard: keyboard()
      });
  }
}]));
let bot = _vk_instance.default.updates;
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
    if (error instanceof _vkIo.APIError && error.code === 917) {
      console.error("Нет разрешения на отправку сообщений");
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
  const {
    messagePayload
  } = context;
  context.state.command = messagePayload && messagePayload.command ? messagePayload.command : null;
  return next();
});
bot.use(async (ctx, next) => {
  if (!ctx.is('message')) return next();
  ctx.state.refreshStudent = _common.refreshStudent;
  let student = await ctx.state.refreshStudent(ctx, (s, ctx) => s.bot_type === 'vk' && ctx.senderId === s.user_id);
  ctx.state.refreshSettings = _common.refreshSettings;
  let settings = await ctx.state.refreshSettings(ctx);
  ctx.state.local_day_stamp = (0, _utils.getDayStampByDateTime)(_luxon.DateTime.local());

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

    let st = await (0, _common.findStudent)(ctx.text);

    if (st === null) {
      ctx.send(render('code_not_found'), {
        keyboard: _vkIo.Keyboard.builder().textButton({
          label: render('help_with_invitation_code_button_label'),
          payload: {
            command: 'help_with_invitation_code'
          },
          color: _vkIo.Keyboard.SECONDARY_COLOR
        }).inline()
      });
      return;
    }

    await (0, _common.linkVkStudentToSession)(ctx, ctx.senderId, st);
    let student = st.data();
    ctx.send(render('success_code', {
      first_name: student.name.first_name,
      last_name: student.name.last_name
    }));
    return;
  }
});
bot.on("message_unsubscribe", async ctx => {
  let r = await (0, _common.refreshStudent)(ctx);
  if (!r) return;
  await (0, _common.unlinkStudentInSession)(ctx, ctx.state.studentRef);
  ctx.session = {};
});
bot.on("message_subscribe", async ctx => {
  return _vk_instance.default.api.messages.send({
    user_id: ctx.userId,
    message: render('start_bot_without_code')
  });
});
bot.use(sceneManager.middleware);
bot.use((context, next) => {
  if (!context.scene.current) {
    return next();
  } // const cancel =  context.messagePayload && context.messagePayload.command === 'cancel';


  const cancel = context.hasText && context.text === '/cancel';

  if (cancel) {
    context.send("Принудительная отмена.");
    return context.scene.leave({
      canceled: true
    });
  }

  return context.scene.reenter();
});
bot.hear("Настройки", context => {
  context.scene.enter('settings');
});
bot.hear('send', async context => {
  let message = await _vk_instance.default.api.messages.send({
    user_id: context.state.student.user_id,
    message: render('question', {
      menu: (0, _common.getStudentMenu)(context)
    }),
    keyboard: _vkIo.Keyboard.builder().textButton({
      label: "Да",
      color: _vkIo.Keyboard.POSITIVE_COLOR,
      payload: {
        command: 'selected_yes'
      }
    }).textButton({
      label: "Нет",
      color: _vkIo.Keyboard.NEGATIVE_COLOR,
      payload: {
        command: "selected_no"
      }
    }).oneTime()
  });
  await context.state.student.update({
    last_message_id: message,
    answer: null,
    answer_day_stamp: context.state.local_day_stamp
  });
});
bot.hear([/^(?:Да)?(?:, )?(?:сегодня )?(?:Я )?(?:хочу |буду )?(?:сегодня )?(?:я )?((?:кушать|кушаю)|(?:питаться|питаюсь)|(?:есть|ем))(?: сегодня)?$/i, (text, {
  state
}) => state.command === 'selected_yes'], async context => {
  let update = async () => {
    if (context.state.student.answer === true) {
      return await context.send(render("you_already_will_eat_today"), {
        keyboard: _vkIo.Keyboard.builder().textButton({
          label: render("i_dont_want_eat_button"),
          color: _vkIo.Keyboard.NEGATIVE_COLOR
        }).oneTime()
      });
    }

    if (context.state.student.message_send_day_stamp === context.state.local_day_stamp) await _vk_instance.default.api.messages.edit({
      peer_id: context.state.student.user_id,
      message_id: context.state.student.last_message_id,
      message: render("edited_question", {
        menu: (0, _common.getStudentMenu)(context),
        will_eat: true
      })
    });
    await context.state.student.update({
      answer: true,
      answer_day_stamp: context.state.local_day_stamp
    });
    await context.send(render("ok_you_will_eat_today" + (context.state.student.answer_day_stamp !== context.state.settings.day_stamp ? "_but_poll_isnt_active" : '')), {
      keyboard: _vkIo.Keyboard.builder().textButton({
        label: render("i_dont_want_eat_button"),
        color: _vkIo.Keyboard.NEGATIVE_COLOR
      }).oneTime()
    });
  };
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
        return await context.send(render("sorry_you_re_late", {
          notified: context.state.student.send_questions
        }), {
          keyboard: _vkIo.Keyboard.builder().textButton({
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
bot.hear([/^(?:Нет)?(?:, )?(?:(?<!не )сегодня )?(?:Я )?(не )(?:хочу |буду )?(?:(?<!не )сегодня )?(?:я )?((?:кушать|кушаю)|(?:питаться|питаюсь)|(?:есть|ем))(?: сегодня)?$/i, (text, {
  state
}) => state.command === 'selected_no'], async context => {
  let update = async () => {
    if (context.state.student.answer === false) {
      return await context.send(render("you_already_will_not_eat_today"), {
        keyboard: _vkIo.Keyboard.builder().textButton({
          label: render("i_want_eat_button"),
          color: _vkIo.Keyboard.POSITIVE_COLOR
        }).oneTime()
      });
    }

    if (context.state.student.message_send_day_stamp === context.state.local_day_stamp) await _vk_instance.default.api.messages.edit({
      peer_id: context.state.student.user_id,
      message_id: context.state.student.last_message_id,
      message: render("edited_question", {
        menu: (0, _common.getStudentMenu)(context),
        will_eat: false
      })
    });
    await context.state.student.update({
      answer: false,
      answer_day_stamp: context.state.local_day_stamp
    });
    await context.send(render("ok_you_will_not_eat_today" + (context.state.student.answer_day_stamp !== context.state.settings.day_stamp ? "_but_poll_isnt_active" : '')), {
      keyboard: _vkIo.Keyboard.builder().textButton({
        label: render("i_want_eat_button"),
        color: _vkIo.Keyboard.POSITIVE_COLOR
      }).oneTime()
    });
  };

  if (context.state.settings.day_stamp === context.state.local_day_stamp) {
    if (!context.state.settings.is_poll_active) {
      if (context.state.student.answer === null) {
        return await context.send(render("sorry_you_re_late", {
          notified: context.state.student.send_questions
        }));
      } else {
        return await context.send(render('sorry_timeout'));
      }
    }
  }

  await update();
});
bot.hear('late', context => {
  context.send(render('you_did_not_record_yourself', {
    notified: context.state.student.send_questions
  }));
});
hearCommand("i_will_eat_anyway", async context => {
  await context.state.student.update({
    late_day_stamp: context.state.local_day_stamp
  });
  await context.send(render('i_will_eat_anyway_text'));
});
bot.setHearFallbackHandler(async context => {
  await context.send(render("i_dont_understand"));
}); //

let vk_bot = _vk_instance.default.updates.getWebhookCallback();

exports.vk_bot = vk_bot;

/***/ }),

/***/ "./vk_instance.js":
/*!************************!*\
  !*** ./vk_instance.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vkIo = __webpack_require__(/*! vk-io */ "vk-io");

const vk = new _vkIo.VK({
  webhookConfirmation: "858039c1",
  webhookSecret: "nnn",
  token: "17e439db455d36c65e95134c0e14998cb611be55f2a113225d2d711144237af341d76968643264a9bde4b"
});
var _default = vk;
exports.default = _default;

/***/ }),

/***/ "@google-cloud/firestore":
/*!******************************************!*\
  !*** external "@google-cloud/firestore" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@google-cloud/firestore");

/***/ }),

/***/ "@vk-io/scenes":
/*!********************************!*\
  !*** external "@vk-io/scenes" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@vk-io/scenes");

/***/ }),

/***/ "@vk-io/session":
/*!*********************************!*\
  !*** external "@vk-io/session" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@vk-io/session");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "lodash/isArray":
/*!*********************************!*\
  !*** external "lodash/isArray" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/isArray");

/***/ }),

/***/ "lodash/isPlainObject":
/*!***************************************!*\
  !*** external "lodash/isPlainObject" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/isPlainObject");

/***/ }),

/***/ "lodash/merge":
/*!*******************************!*\
  !*** external "lodash/merge" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/merge");

/***/ }),

/***/ "lodash/random":
/*!********************************!*\
  !*** external "lodash/random" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/random");

/***/ }),

/***/ "luxon":
/*!************************!*\
  !*** external "luxon" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("luxon");

/***/ }),

/***/ "modofun":
/*!**************************!*\
  !*** external "modofun" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("modofun");

/***/ }),

/***/ "nunjucks":
/*!***************************!*\
  !*** external "nunjucks" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nunjucks");

/***/ }),

/***/ "telegraf":
/*!***************************!*\
  !*** external "telegraf" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("telegraf");

/***/ }),

/***/ "telegraf-command-parts":
/*!*****************************************!*\
  !*** external "telegraf-command-parts" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("telegraf-command-parts");

/***/ }),

/***/ "telegraf/core/network/error":
/*!**********************************************!*\
  !*** external "telegraf/core/network/error" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("telegraf/core/network/error");

/***/ }),

/***/ "telegraf/extra":
/*!*********************************!*\
  !*** external "telegraf/extra" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("telegraf/extra");

/***/ }),

/***/ "telegraf/markup":
/*!**********************************!*\
  !*** external "telegraf/markup" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("telegraf/markup");

/***/ }),

/***/ "telegraf/scenes/base":
/*!***************************************!*\
  !*** external "telegraf/scenes/base" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("telegraf/scenes/base");

/***/ }),

/***/ "telegraf/stage":
/*!*********************************!*\
  !*** external "telegraf/stage" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("telegraf/stage");

/***/ }),

/***/ "vk-io":
/*!************************!*\
  !*** external "vk-io" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vk-io");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXN5bmNfdG9fbWlkZGxld2FyZS50cyIsIndlYnBhY2s6Ly8vLi9jb21tYW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vZXhwcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9tYWluLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9zZXR0aW5nU2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhbmRhcmRfdXNlLmpzIiwid2VicGFjazovLy8uL3RlbGVncmFmLXNlc3Npb24tZmlyZXN0b3JlLmpzIiwid2VicGFjazovLy8uL3RnX2luc3RhbmNlLmpzIiwid2VicGFjazovLy8uL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3ZrLWlvLXNlc3Npb24tc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi92a19ib3QuanMiLCJ3ZWJwYWNrOi8vLy4vdmtfaW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGdvb2dsZS1jbG91ZC9maXJlc3RvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAdmstaW8vc2NlbmVzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQHZrLWlvL3Nlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaC9pc0FycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoL2lzUGxhaW5PYmplY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2gvbWVyZ2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2gvcmFuZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibHV4b25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb2RvZnVuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibnVuanVja3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0ZWxlZ3JhZlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRlbGVncmFmLWNvbW1hbmQtcGFydHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0ZWxlZ3JhZi9jb3JlL25ldHdvcmsvZXJyb3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0ZWxlZ3JhZi9leHRyYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRlbGVncmFmL21hcmt1cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRlbGVncmFmL3NjZW5lcy9iYXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidGVsZWdyYWYvc3RhZ2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ2ay1pb1wiIl0sIm5hbWVzIjpbImJvdCIsInRlbGVncmFmIiwicHJvY2VzcyIsInRlbGVncmFtIiwid2ViaG9va1JlcGx5IiwidmsiLCJWSyIsInRva2VuIiwiZ2V0U3R1ZGVudCIsInN0dWRlbnRfaWQiLCJzdHVkZW50IiwiZGIiLCJjb2xsZWN0aW9uIiwiZG9jIiwiZ2V0IiwiZXhpc3RzIiwiZXNjYXBlTWVudSIsIm1lbnUiLCJyZXBsYWNlIiwicyIsInRvVXBwZXJDYXNlIiwic3BsaXQiLCJqb2luIiwiY29tbWFuZHNCb3QiLCJyZXEiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiYm9keSIsInNlY3JldCIsInN0YXR1cyIsImVuZCIsInNldHRpbmdzIiwicXVlcnkiLCJzdCIsImRhdGEiLCJzZW5kX3F1ZXN0aW9ucyIsIm1lc3NhZ2VfaWQiLCJzdGlja2VyX21lc3NhZ2VfaWQiLCJib3RfdHlwZSIsInNlbmRfc3RpY2tlcnMiLCJzdGlja2VyIiwic2VuZFN0aWNrZXIiLCJ1c2VyX2lkIiwiRXh0cmEiLCJub3RpZmljYXRpb25zIiwibWVzc2FnZSIsInNlbmRNZXNzYWdlIiwiZWF0aW5nX3R5cGUiLCJtYXJrdXAiLCJlIiwiaW5saW5lS2V5Ym9hcmQiLCJjYWxsYmFja0J1dHRvbiIsIm1hcmtkb3duIiwiVGVsZWdyYW1FcnJvciIsImNvZGUiLCJhcGkiLCJtZXNzYWdlcyIsInNlbmQiLCJrZXlib2FyZCIsIktleWJvYXJkIiwiYnVpbGRlciIsInRleHRCdXR0b24iLCJsYWJlbCIsImNvbG9yIiwiUE9TSVRJVkVfQ09MT1IiLCJwYXlsb2FkIiwiY29tbWFuZCIsIk5FR0FUSVZFX0NPTE9SIiwib25lVGltZSIsIm5vd19kYXlfc3RhbXAiLCJEYXRlVGltZSIsImxvY2FsIiwicmVmIiwidXBkYXRlIiwibGFzdF9tZXNzYWdlX2lkIiwibGFzdF9zdGlja2VyX21lc3NhZ2VfaWQiLCJhbnN3ZXIiLCJhbnN3ZXJfZGF5X3N0YW1wIiwibWVzc2FnZV9zZW5kX2RheV9zdGFtcCIsInJhd19tZW51Iiwia2V5IiwiaXNfcG9sbF9hY3RpdmUiLCJkYXlfc3RhbXAiLCJkZWxldGVNZXNzYWdlIiwiZWRpdE1lc3NhZ2VUZXh0Iiwibm90aWZpZWQiLCJ3aWxsX2VhdCIsImxhdGVfZGF5X3N0YW1wIiwiTWFya3VwIiwiZmlyZXN0b3JlIiwiY3JlZGVudGlhbHMiLCJjbG91ZF9rZXkiLCJoZWxsb19tZXNzYWdlIiwiY29tbWFuZF9saXN0Iiwic3RhcnRfYm90X3dpdGhvdXRfY29kZSIsInRnIiwiaGVscF93aXRoX2ludml0YXRpb25fY29kZSIsImNvZGVfbm90X2ZvdW5kIiwiaGVscF93aXRoX2ludml0YXRpb25fY29kZV9idXR0b25fbGFiZWwiLCJzdWNjZXNzX2NvZGUiLCJzZXR0aW5nc19maXJzdF9tZXNzYWdlIiwic2VuZF9xdWVzdGlvbnNfYnV0dG9uIiwiZG9udF9zZW5kX3F1ZXN0aW9uc19hbnN3ZXIiLCJzZW5kX3F1ZXN0aW9uc19hbnN3ZXIiLCJzb21ldGhpbmdfbW9yZSIsInNldHRpbmdzX2Nsb3NlZCIsIm5vX21lbnUiLCJxdWVzdGlvbiIsImVkaXRlZF9xdWVzdGlvbiIsInN0b3BwZWRfcG9sbF9xdWVzdGlvbiIsInlvdXJfYW5zd2VyIiwiaV93YW50X2VhdCIsImlfZG9udF93YW50X2VhdCIsImlfd2FudF9lYXRfdGhhbmtzIiwiaV9kb250X3dhbnRfZWF0X29rYXkiLCJpX3dhbnRfZWF0X2J1dHRvbiIsImlfZG9udF93YW50X2VhdF9idXR0b24iLCJ0b2RheV9pbl9kaW5pbmdfcm9vbSIsImVhdGluZ19xdWVzdGlvbiIsIm9rX3lvdV93aWxsX2VhdF90b2RheSIsIm9rX3lvdV93aWxsX25vdF9lYXRfdG9kYXkiLCJva195b3Vfd2lsbF9lYXRfdG9kYXlfYnV0X3BvbGxfaXNudF9hY3RpdmUiLCJva195b3Vfd2lsbF9ub3RfZWF0X3RvZGF5X2J1dF9wb2xsX2lzbnRfYWN0aXZlIiwieW91X2FscmVhZHlfd2lsbF9lYXRfdG9kYXkiLCJ5b3VfYWxyZWFkeV93aWxsX25vdF9lYXRfdG9kYXkiLCJzb3JyeV90aW1lb3V0Iiwic29ycnlfeW91X3JlX2xhdGUiLCJpX3dpbGxfZWF0X2FueXdheV9idXR0b24iLCJpX3dpbGxfZWF0X2FueXdheV90ZXh0IiwieW91X2RpZF9ub3RfcmVjb3JkX3lvdXJzZWxmIiwiYnV0X2lfZGlkX25vdF9lYXRfdG9kYXkiLCJpX2RvbnRfdW5kZXJzdGFuZCIsImlfZG9udF91bmRlcnN0YW5kX21lZGlhIiwieW91X2hhdmVfYmVlbl91bmxpbmtlZCIsImhlbHAiLCJlbnYiLCJudW5qdWNrcyIsIkVudmlyb25tZW50IiwiYWRkRmlsdGVyIiwibmFtZSIsImdldE1lc3NhZ2UiLCJnZXRHbG9iYWwiLCJ0ZXh0IiwibWVzc2VuZ2VyIiwidGV4dF9tZXNzYWdlX2lkIiwiRXJyb3IiLCJlbCIsImxlbmd0aCIsInJlbmRlclN0cmluZyIsImdldENvbXBpbGVGdW5jdGlvbiIsImFkZEdsb2JhbCIsImN0eCIsInNlc3Npb24iLCJnZXRTdHVkZW50TWVudSIsInN0YXRlIiwiZmluZFN0dWRlbnQiLCJpbnZpdGF0aW9uX2NvZGUiLCJ3aGVyZSIsImxpbWl0IiwiZW1wdHkiLCJkb2NzIiwiZ2V0X2RiX2RhdGEiLCJfaWQiLCJpZCIsImxpbmtUZWxlZ3JhbVN0dWRlbnRUb1Nlc3Npb24iLCJjaGF0X2lkIiwibm90aWZ5X2Fib3V0X3VubGluayIsImxpbmtWa1N0dWRlbnRUb1Nlc3Npb24iLCJ1bmxpbmtTdHVkZW50SW5TZXNzaW9uIiwidW5kZWZpbmVkIiwidW5saW5rU3R1ZGVudCIsInJlZnJlc2hTdHVkZW50IiwiY2hlY2tfbGluayIsInN0dWRlbnRSZWYiLCJlbHMiLCJyZWZyZXNoU2V0dGluZ3MiLCJzZXR0aW5nc1JlZiIsImdldFNldHRpbmdzIiwicmF3IiwiYXBwIiwiZXhwcmVzcyIsInVzZSIsImJvZHlQYXJzZXIiLCJqc29uIiwiYWxsIiwiZnVuYyIsIm1haW5Cb3QiLCJ1cmwiLCJtZXRob2QiLCJ2a19ib3QiLCJhcmd1bWVudHMiLCJjbWQiLCJsaXN0ZW4iLCJsZWF2ZSIsImVudGVyIiwiU3RhZ2UiLCJjYXRjaCIsInRvU3RyaW5nIiwiZXJyb3IiLCJyZW5kZXIiLCJxdWVzdGlvbl9rZXlib2FyZCIsInllc19hbnN3ZXIiLCJjaGVja19sYXRlX3N0YXRlIiwicmVwbHlXaXRoTWFya2Rvd24iLCJzdF9kYXRhIiwicmVwbHkiLCJmaXJzdF9uYW1lIiwiYWN0aW9uIiwibG9jYWxfZGF5X3N0YW1wIiwiY2FsbGJhY2tRdWVyeSIsIm1hdGNoIiwiYW5zd2VyQ2JRdWVyeSIsIm9uIiwiaGVhcnMiLCJpc19kYXlzX3NhbWUiLCJlcnIiLCJyIiwiaGFuZGxlVXBkYXRlIiwic2V0dGluZ3NTY2VuZSIsIlNjZW5lIiwic2V0dGluZ19rZXlib2FyZCIsInJlc2l6ZSIsImV4dHJhIiwicmVtb3ZlS2V5Ym9hcmQiLCJzdGFnZSIsImlzX3NjZW5lIiwic3RvcmUiLCJmcm9tIiwibmV4dCIsInVwZGF0ZVR5cGUiLCJleHRyYV9pbmZvIiwiYXJncyIsInNwbGl0QXJncyIsImNoYXQiLCJsYXN0X25hbWUiLCJlZGl0TWVzc2FnZVJlcGx5TWFya3VwIiwibWlkZGxld2FyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJvcHRzIiwib3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsInByb3BlcnR5IiwiZ2V0U2Vzc2lvbktleSIsInR0bE1zIiwidHRsIiwibm93IiwiRGF0ZSIsImdldFRpbWUiLCJkb2NSZWYiLCJ0aGVuIiwiZXhwaXJlcyIsImRlZmluZVByb3BlcnR5Iiwic2V0IiwibmV3VmFsdWUiLCJnZXREYXlTdGFtcCIsInllYXIiLCJtb250aCIsImRheSIsIk1hdGgiLCJyb3VuZCIsInN0YXJ0T2YiLCJ0b1NlY29uZHMiLCJnZXREYXlTdGFtcEJ5RGF0ZVRpbWUiLCJ0aW1lIiwiZ2V0VGltZUJ5RHVyYXRpb24iLCJkdXJhdGlvbiIsInN0YXJ0X2Zyb20iLCJwbHVzIiwiZ2V0SW50ZXJ2YWxCeUR1cmF0aW9ucyIsImQxIiwiZDIiLCJJbnRlcnZhbCIsImZyb21EYXRlVGltZXMiLCJGaXJlc3RvcmVTdG9yYWdlIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsImRlbGV0ZSIsInRvdWNoIiwiaGVhckNvbW1hbmQiLCJjb25kaXRpb25zIiwiaGFuZGxlIiwiQXJyYXkiLCJpc0FycmF5IiwiaGVhciIsInN0b3JhZ2UiLCJzZXNzaW9uX21hbmFnZXIiLCJTZXNzaW9uTWFuYWdlciIsImdldFN0b3JhZ2VLZXkiLCJjb250ZXh0Iiwic2VuZGVySWQiLCJ1c2VySWQiLCJTdHJpbmciLCJzY2VuZU1hbmFnZXIiLCJTY2VuZU1hbmFnZXIiLCJhZGRTY2VuZSIsIlN0ZXBTY2VuZSIsIlBSSU1BUllfQ09MT1IiLCJyb3ciLCJzY2VuZSIsInN0ZXAiLCJmaXJzdFRpbWUiLCJ1cGRhdGVzIiwiQVBJRXJyb3IiLCJpcyIsIm1lc3NhZ2VQYXlsb2FkIiwiaGFzVGV4dCIsIlNFQ09OREFSWV9DT0xPUiIsImlubGluZSIsImN1cnJlbnQiLCJjYW5jZWwiLCJjYW5jZWxlZCIsInJlZW50ZXIiLCJlZGl0IiwicGVlcl9pZCIsInNldEhlYXJGYWxsYmFja0hhbmRsZXIiLCJnZXRXZWJob29rQ2FsbGJhY2si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QUFNLENBQUMsbUJBQUQsQ0FBbkIsQ0FBTjtBQUNILENBRkQsRSxDQUdBOztBQUVPLElBQUlWLE1BQU0sR0FBSXpMLHFCQUFHMlMsT0FBSCxDQUFXYyxrQkFBWCxFQUFkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwV1A7O0FBRUEsTUFBTXpULEVBQUUsR0FBRyxJQUFJQyxRQUFKLENBQU87QUFDZHlULHFCQUFtQixFQUFFLFVBRFA7QUFFZEMsZUFBYSxFQUFFLEtBRkQ7QUFHZHpULE9BQUssRUFBRTtBQUhPLENBQVAsQ0FBWDtlQUtlRixFOzs7Ozs7Ozs7Ozs7QUNQZixvRDs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSx3RDs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSxrQyIsImZpbGUiOiJiYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9leHByZXNzLmpzXCIpO1xuIiwiZXhwb3J0IGludGVyZmFjZSBOZXh0RnVuY3Rpb24ge1xyXG4gICAgKGVycj86IEVycm9yKTogdm9pZFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhhbmRsZXIgPFQ+IHtcclxuICAgIChjdHg6IFQsIG5leHQ6IE5leHRGdW5jdGlvbik6IGFueVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEVycm9ySGFuZGxlciA8VD4ge1xyXG4gICAgKGVycjogRXJyb3IsIGN0eDogVCwgbmV4dDogTmV4dEZ1bmN0aW9uKTogYW55XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZSAocmVzdWx0OiBhbnksIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4oKG4pPT57XHJcbiAgICAgICAgICAgIGlmKG4gPT09IHRydWUpIG5leHQoKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyOiBFcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV4dChlcnIgfHwgbmV3IEVycm9yKCdQcm9taXNlIHdhcyByZWplY3RlZCB3aXRoIGEgZmFsc3kgdmFsdWUnKSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXAgPFQ+IChmbjogSGFuZGxlcjxUPik6IEhhbmRsZXI8VD5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXAgPFQ+IChmbjogRXJyb3JIYW5kbGVyPFQ+KTogRXJyb3JIYW5kbGVyPFQ+XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwIDxUPiAoZm46IEhhbmRsZXI8VD4gfCBFcnJvckhhbmRsZXI8VD4pOiBIYW5kbGVyPFQ+IHwgRXJyb3JIYW5kbGVyPFQ+IHtcclxuICAgIGlmIChmbi5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVycjogRXJyb3IsIGN0eDogVCwgbmV4dDogTmV4dEZ1bmN0aW9uKTogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZSgoZm4gYXMgRXJyb3JIYW5kbGVyPFQ+KShlcnIsIGN0eCwgbmV4dCksIG5leHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY3R4OiBULCBuZXh0OiBOZXh0RnVuY3Rpb24pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBoYW5kbGUoKGZuIGFzIEhhbmRsZXI8VD4pKGN0eCwgbmV4dCksIG5leHQpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgdGVsZWdyYWYgZnJvbSAndGVsZWdyYWYnO1xyXG5pbXBvcnQgRXh0cmEgZnJvbSBcInRlbGVncmFmL2V4dHJhXCJcclxuaW1wb3J0IE1hcmt1cCBmcm9tIFwidGVsZWdyYWYvbWFya3VwXCJcclxuaW1wb3J0IFRlbGVncmFtRXJyb3IgZnJvbSAndGVsZWdyYWYvY29yZS9uZXR3b3JrL2Vycm9yJztcclxuaW1wb3J0IHtkYiwgZ2V0TWVzc2FnZSwgZ2V0U2V0dGluZ3MsIHVubGlua1N0dWRlbnR9IGZyb20gXCIuL2NvbW1vblwiO1xyXG5pbXBvcnQge2dldERheVN0YW1wQnlEYXRlVGltZX0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHtEYXRlVGltZX0gZnJvbSBcImx1eG9uXCI7XHJcbmltcG9ydCB7S2V5Ym9hcmQsIFZLfSBmcm9tIFwidmstaW9cIjtcclxuaW1wb3J0IG1vZG9mdW4gZnJvbSBcIm1vZG9mdW5cIjtcclxuXHJcbmxldCBib3QgPSBuZXcgdGVsZWdyYWYocHJvY2Vzcy5lbnYuYm90YXBpLCB7XHJcbiAgICB0ZWxlZ3JhbToge1xyXG4gICAgICAgIHdlYmhvb2tSZXBseTogZmFsc2VcclxuICAgIH0sXHJcbn0pO1xyXG5jb25zdCB2ayA9IG5ldyBWSyh7XHJcbiAgICB0b2tlbjogXCIxN2U0MzlkYjQ1NWQzNmM2NWU5NTEzNGMwZTE0OTk4Y2I2MTFiZTU1ZjJhMTEzMjI1ZDJkNzExMTQ0MjM3YWYzNDFkNzY5Njg2NDMyNjRhOWJkZTRiXCJcclxufSk7XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHN0dWRlbnRfaWRcclxuICogQHJldHVybnMge1Byb21pc2U8bnVsbD59XHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBnZXRTdHVkZW50KHN0dWRlbnRfaWQpIHtcclxuICAgIGxldCBzdHVkZW50ID0gYXdhaXQgZGIuY29sbGVjdGlvbignc3R1ZGVudHMnKS5kb2Moc3R1ZGVudF9pZCkuZ2V0KCk7XHJcbiAgICBpZiAoIXN0dWRlbnQuZXhpc3RzKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBzdHVkZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBlc2NhcGVNZW51KG1lbnUpIHtcclxuICAgIG1lbnUgPSBtZW51LnJlcGxhY2UoL1xccysvZywgJyAnKTtcclxuICAgIG1lbnUgPSBtZW51LnJlcGxhY2UoL1xccyooWywuXSkrXFxzKi9nLCBcIiQxXFxuXCIpO1xyXG4gICAgbWVudSA9IG1lbnUucmVwbGFjZSgvXFxuW9CwLdGP0JAt0K9hLXpBLVowLTlfXS9nLCAocykgPT4gcy50b1VwcGVyQ2FzZSgpKTtcclxuICAgIG1lbnUgPSBtZW51LnNwbGl0KFwiXCIpO1xyXG4gICAgbWVudVswXSA9IG1lbnVbMF0udG9VcHBlckNhc2UoKTtcclxuICAgIG1lbnUgPSBtZW51LmpvaW4oXCJcIik7XHJcbiAgICByZXR1cm4gbWVudTtcclxufVxyXG5cclxuLy8gYXN5bmMgZnVuY3Rpb24gd2l0aFNldHRpbmdzKG5leHQpIHtcclxuLy8gICAgIHRoaXMuc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5ncygpO1xyXG4vLyAgICAgcmV0dXJuIG5leHQoKTtcclxuLy8gfVxyXG4vL1xyXG4vLyBhc3luYyBmdW5jdGlvbiB3aXRoXHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHJlcVxyXG4gKiBAcGFyYW0gcmVzXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gKi9cclxuLy8gZXhwb3J0IGxldCBjb21tYW5kcyA9IG1vZG9mdW4oe1xyXG4vLyAgICAgdGVzdDogYXN5bmMgKCk9PlxyXG4vLyB9LCB7XHJcbi8vICAgICB0eXBlOiAnZ2Nsb3VkJyxcclxuLy8gICAgIG1pZGRsZXdhcmU6IFtcclxuLy8gICAgICAgICBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCl7XHJcbi8vICAgICAgICAgICAgIGlmIChyZXEuYm9keS5zZWNyZXQgIT09IFwiMTIzNFwiKSB7IC8vdG9kb1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5lbmQoKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBuZXh0KCk7XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgIF1cclxuLy8gfSlcclxuXHJcbmV4cG9ydCBsZXQgY29tbWFuZHNCb3QgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHJlcS5ib2R5KTtcclxuICAgIGlmIChyZXEuYm9keS5zZWNyZXQgIT09IFwiMTIzNFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5lbmQoKTtcclxuICAgIH1cclxuICAgIGxldCBzZXR0aW5ncyA9IGF3YWl0IGdldFNldHRpbmdzKCk7XHJcbiAgICBzd2l0Y2ggKHJlcS5ib2R5LnF1ZXJ5KSB7XHJcbiAgICAgICAgY2FzZSBcInNlbmRfcXVlc3Rpb25cIjoge1xyXG4gICAgICAgICAgICBsZXQgc3QgPSBhd2FpdCBnZXRTdHVkZW50KHJlcS5ib2R5LnN0dWRlbnRfaWQpO1xyXG4gICAgICAgICAgICBpZiAoc3QgPT09IG51bGwpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuZW5kKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0KTtcclxuICAgICAgICAgICAgbGV0IHN0dWRlbnQgPSBzdC5kYXRhKCk7XHJcbiAgICAgICAgICAgIGlmICghc3R1ZGVudC5zZW5kX3F1ZXN0aW9ucylcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuZW5kKCk7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlX2lkID0gbnVsbCwgc3RpY2tlcl9tZXNzYWdlX2lkID0gbnVsbDtcclxuICAgICAgICAgICAgc3dpdGNoIChzdHVkZW50LmJvdF90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidGdcIjpcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3R1ZGVudC5zZW5kX3N0aWNrZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RpY2tlciA9IGF3YWl0IGJvdC50ZWxlZ3JhbS5zZW5kU3RpY2tlcihzdHVkZW50LnVzZXJfaWQsIFwiQ0FBREFnQURSUUFEZThCOUUwR2x6ZFM2VVpUbkZnUVwiLCBFeHRyYS5ub3RpZmljYXRpb25zKGZhbHNlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNrZXJfbWVzc2FnZV9pZCA9IHN0aWNrZXIubWVzc2FnZV9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGF3YWl0IGJvdC50ZWxlZ3JhbS5zZW5kTWVzc2FnZShzdHVkZW50LnVzZXJfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRNZXNzYWdlKCd0ZycsICdxdWVzdGlvbicsIHttZW51OiBzZXR0aW5ncy5tZW51W3N0dWRlbnQuZWF0aW5nX3R5cGVdfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHRyYS5tYXJrdXAoKGUpID0+IGUuaW5saW5lS2V5Ym9hcmQoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuY2FsbGJhY2tCdXR0b24oXCLQlNCwXCIsIFwic2VsZWN0ZWRfeWVzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuY2FsbGJhY2tCdXR0b24oXCLQndC10YJcIiwgXCJzZWxlY3RlZF9ub1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSkpLm1hcmtkb3duKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlX2lkID0gbWVzc2FnZS5tZXNzYWdlX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1jYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlIGluc3RhbmNlb2YgVGVsZWdyYW1FcnJvciAmJiBlLmNvZGUgPT09IDQwMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB1bmxpbmtTdHVkZW50KHN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3ZrJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VfaWQgPSBhd2FpdCB2ay5hcGkubWVzc2FnZXMuc2VuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHN0dWRlbnQudXNlcl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZ2V0TWVzc2FnZSgndmsnLCAncXVlc3Rpb24nLCB7bWVudTogc2V0dGluZ3MubWVudVtzdHVkZW50LmVhdGluZ190eXBlXX0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlib2FyZDogS2V5Ym9hcmQuYnVpbGRlcigpLnRleHRCdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0JTQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IEtleWJvYXJkLlBPU0lUSVZFX0NPTE9SLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdzZWxlY3RlZF95ZXMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRleHRCdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0J3QtdGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogS2V5Ym9hcmQuTkVHQVRJVkVfQ09MT1IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJzZWxlY3RlZF9ub1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLm9uZVRpbWUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm93X2RheV9zdGFtcCA9IGdldERheVN0YW1wQnlEYXRlVGltZShEYXRlVGltZS5sb2NhbCgpKTtcclxuICAgICAgICAgICAgYXdhaXQgc3QucmVmLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsYXN0X21lc3NhZ2VfaWQ6IG1lc3NhZ2VfaWQsXHJcbiAgICAgICAgICAgICAgICBsYXN0X3N0aWNrZXJfbWVzc2FnZV9pZDogc3RpY2tlcl9tZXNzYWdlX2lkLFxyXG4gICAgICAgICAgICAgICAgYW5zd2VyOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYW5zd2VyX2RheV9zdGFtcDogbm93X2RheV9zdGFtcCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2Vfc2VuZF9kYXlfc3RhbXA6IG5vd19kYXlfc3RhbXBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwic3RhcnRfcG9sbFwiOiB7XHJcbiAgICAgICAgICAgIGxldCByYXdfbWVudSA9IHJlcS5ib2R5Lm1lbnU7XHJcbiAgICAgICAgICAgIGxldCBtZW51ID0ge307XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiByYXdfbWVudSkge1xyXG4gICAgICAgICAgICAgICAgbWVudVtrZXldID0gZXNjYXBlTWVudShyYXdfbWVudVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKCdzeXN0ZW0nKS5kb2MoJ3NldHRpbmdzJykudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGlzX3BvbGxfYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWVudSxcclxuICAgICAgICAgICAgICAgIGRheV9zdGFtcDogZ2V0RGF5U3RhbXBCeURhdGVUaW1lKERhdGVUaW1lLmxvY2FsKCkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInN0b3BfcG9sbFwiOiB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oJ3N5c3RlbScpLmRvYygnc2V0dGluZ3MnKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgaXNfcG9sbF9hY3RpdmU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInN0b3BfcG9sbF9tZXNzYWdlXCI6IHtcclxuICAgICAgICAgICAgbGV0IHN0ID0gYXdhaXQgZ2V0U3R1ZGVudChyZXEuYm9keS5zdHVkZW50X2lkKTtcclxuICAgICAgICAgICAgaWYgKHN0ID09PSBudWxsKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmVuZCgpO1xyXG4gICAgICAgICAgICBsZXQgc3R1ZGVudCA9IHN0LmRhdGEoKTtcclxuICAgICAgICAgICAgaWYgKCFzdHVkZW50LnNlbmRfcXVlc3Rpb25zKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5lbmQoKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3R1ZGVudC5ib3RfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0Z1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHVkZW50Lmxhc3Rfc3RpY2tlcl9tZXNzYWdlX2lkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBib3QudGVsZWdyYW0uZGVsZXRlTWVzc2FnZShzdHVkZW50LnVzZXJfaWQsIHN0dWRlbnQubGFzdF9zdGlja2VyX21lc3NhZ2VfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgVGVsZWdyYW1FcnJvciAmJiBlLmNvZGUgPT09IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3R1ZGVudC5hbnN3ZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGJvdC50ZWxlZ3JhbS5lZGl0TWVzc2FnZVRleHQoc3R1ZGVudC51c2VyX2lkLCBzdHVkZW50Lmxhc3RfbWVzc2FnZV9pZCwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRNZXNzYWdlKCd0ZycsIFwic29ycnlfeW91X3JlX2xhdGVcIiwge25vdGlmaWVkOiBzdHVkZW50LnNlbmRfcXVlc3Rpb25zfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXh0cmEubWFya3VwKChlKSA9PiBlLmlubGluZUtleWJvYXJkKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5jYWxsYmFja0J1dHRvbihnZXRNZXNzYWdlKCd0ZycsXCJpX3dpbGxfZWF0X2FueXdheV9idXR0b25cIiksIFwiaV93YW50X2VhdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pKS5tYXJrZG93bigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGJvdC50ZWxlZ3JhbS5lZGl0TWVzc2FnZVRleHQoc3R1ZGVudC51c2VyX2lkLCBzdHVkZW50Lmxhc3RfbWVzc2FnZV9pZCwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRNZXNzYWdlKFwidGdcIiwgXCJzdG9wcGVkX3BvbGxfcXVlc3Rpb25cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsX2VhdDogc3R1ZGVudC5hbnN3ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnU6IHNldHRpbmdzLm1lbnVbc3R1ZGVudC5lYXRpbmdfdHlwZV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgRXh0cmEubWFya2Rvd24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ2a1wiOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1jYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoZSBpbnN0YW5jZW9mIFRlbGVncmFtRXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGUuY29kZSA9PT0gNDAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5saW5rU3R1ZGVudChzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZvcmdvdF90b19ub3RpZnlcIjoge1xyXG4gICAgICAgICAgICBsZXQgc3QgPSBhd2FpdCBnZXRTdHVkZW50KHJlcS5ib2R5LnN0dWRlbnRfaWQpO1xyXG4gICAgICAgICAgICBpZiAoc3QgPT09IG51bGwpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuZW5kKCk7XHJcbiAgICAgICAgICAgIGxldCBzdHVkZW50ID0gc3QuZGF0YSgpO1xyXG4gICAgICAgICAgICBpZihzdHVkZW50LmxhdGVfZGF5X3N0YW1wID09PSBnZXREYXlTdGFtcEJ5RGF0ZVRpbWUoRGF0ZVRpbWUubG9jYWwoKSkpe1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdHVkZW50LmJvdF90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndGcnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGJvdC50ZWxlZ3JhbS5zZW5kTWVzc2FnZShzdHVkZW50LnVzZXJfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRNZXNzYWdlKCd0ZycsIFwieW91X2RpZF9ub3RfcmVjb3JkX3lvdXJzZWxmXCIsIHtub3RpZmllZDogc3R1ZGVudC5zZW5kX3F1ZXN0aW9uc30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXh0cmEubWFya2Rvd24oKS5tYXJrdXAoTWFya3VwLmlubGluZUtleWJvYXJkKFtNYXJrdXAuY2FsbGJhY2tCdXR0b24oXCLQndC+INGPINC90LUg0LrRg9GI0LDQuyDRgdC10LPQvtC00L3Rj1wiLCBcImlfZGlkX25vdF9lYXRcIildKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInZrXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdmsuYXBpLm1lc3NhZ2VzLnNlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9pZDogc3R1ZGVudC51c2VyX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZ2V0TWVzc2FnZSgndmsnLCAneW91X2RpZF9ub3RfcmVjb3JkX3lvdXJzZWxmJywge25vdGlmaWVkOiBzdHVkZW50LnNlbmRfcXVlc3Rpb25zfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9Y2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKGUgaW5zdGFuY2VvZiBUZWxlZ3JhbUVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihlLmNvZGUgPT09IDQwMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5saW5rU3R1ZGVudChzdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmVzLnNlbmQoXCJva1wiKS5lbmQoKTtcclxuICAgIHJldHVybiByZXM7XHJcbn07IiwiaW1wb3J0IGZpcmVzdG9yZSBmcm9tIFwiQGdvb2dsZS1jbG91ZC9maXJlc3RvcmVcIjtcclxuaW1wb3J0IGNsb3VkX2tleSBmcm9tICcuL3RlbGVncmFtYm90LTI1NTcyMC1lNDhjODQ5NDNiNzguanNvbidcclxuXHJcbmV4cG9ydCBsZXQgZGIgPSBuZXcgZmlyZXN0b3JlKHtcclxuICAgIC8vIHByb2plY3RJZDogXCJ0ZWxlZ3JhbWJvdC0yNTU3MjBcIixcclxuICAgIC8vIGtleUZpbGVuYW1lOiAnLi90ZWxlZ3JhbWJvdC0yNTU3MjAtZTQ4Yzg0OTQzYjc4Lmpzb24nXHJcbiAgICBjcmVkZW50aWFsczogY2xvdWRfa2V5XHJcbn0pO1xyXG5leHBvcnQgbGV0IGhlbGxvX21lc3NhZ2UgPSBcIirQn9GA0LjQstC10YIsINGN0YLQviDQsdC+0YIg0YjQutC+0LvRjNC90L7QuSDRgdGC0L7Qu9C+0LLQvtC5INGI0LrQvtC70Ysg4oSWMSDQsy4g0JTRgNC+0LPQuNGH0LjQvdCwLipcXG5cIiArXHJcbiAgICBcItCvINCx0YPQtNGDINC+0L/RgNCw0YjQuNCy0LDRgtGMINGC0LXQsdGPINC60LDQttC00YvQuSDQsdGD0LTQvdC40Lkg0LTQtdC90YwsINCx0YPQtNC10YjRjCDQu9C4INGC0Ysg0LrRg9GI0LDRgtGMLiBcIiArXHJcbiAgICBcItCS0L7Qt9C80L7QttC90L4g0LjQvdC+0LPQtNCwINCx0YPQtNGDINC/0YDQuNGB0YvQu9Cw0YLRjCDQuNC90YLQtdGA0LXRgdC90YPRjiDQuNC90YTQvtGA0LzQsNGG0LjRjiDQviDRiNC60L7Qu9C1LlwiO1xyXG5leHBvcnQgbGV0IGNvbW1hbmRfbGlzdCA9IFwi0KHQv9C40YHQvtC6INC00L7RgdGC0YPQv9C90YvRhSDQutC+0LzQsNC90LQ6XFxuXCIgK1xyXG4gICAgXCIvc2V0dGluZyAtINC+0YLQutGA0YvRgtGMINC90LDRgdGC0YDQvtC50LrQuFxcblwiICtcclxuICAgIFwiL2NvbnRhY3QgLSDQv9C+0LvRg9GH0LjRgtGMINC60L7QvdGC0LDQutGC0Ysg0YjQutC+0LvRi1xcblwiICtcclxuICAgIFwiL2hlbHAgLSDQv9C+0LvRg9GH0LjRgtGMINGB0L/QuNGB0L7QuiDQutC+0LzQsNC90LRcXG5cIjtcclxuXHJcbmV4cG9ydCBsZXQgbWVzc2FnZXMgPSB7XHJcbiAgICBoZWxsb19tZXNzYWdlOiB7XHJcbiAgICAgICAgdms6IFtcclxuICAgICAgICAgICAgXCLQn9GA0LjQstC10YIsINGN0YLQviDQsdC+0YIg0YjQutC+0LvRjNC90L7QuSDRgdGC0L7Qu9C+0LLQvtC5INGI0LrQvtC70Ysg4oSWMSDQsy4g0JTRgNC+0LPQuNGH0LjQvdCwLlxcblwiICtcclxuICAgICAgICAgICAgXCLQryDQsdGD0LTRgyDQvtC/0YDQsNGI0LjQstCw0YLRjCDRgtC10LHRjyDQutCw0LbQtNGL0Lkg0LHRg9C00L3QuNC5INC00LXQvdGMLCDQsdGD0LTQtdGI0Ywg0LvQuCDRgtGLINC60YPRiNCw0YLRjC4gXCIgK1xyXG4gICAgICAgICAgICBcItCS0L7Qt9C80L7QttC90L4g0LjQvdC+0LPQtNCwINCx0YPQtNGDINC/0YDQuNGB0YvQu9Cw0YLRjCDQuNC90YLQtdGA0LXRgdC90YPRjiDQuNC90YTQvtGA0LzQsNGG0LjRjiDQviDRiNC60L7Qu9C1LlwiXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHN0YXJ0X2JvdF93aXRob3V0X2NvZGU6IHtcclxuICAgICAgICB2azogW1xyXG4gICAgICAgICAgICBcInt7J2hlbGxvX21lc3NhZ2UnfHJlbmRlcn19XFxuXFxu0J7RgtC/0YDQsNCy0Ywg0YHQstC+0Lkg0LrQvtC0INC/0YDQuNCz0LvQsNGI0LXQvdC40Y8sINGH0YLQvtCx0Ysg0Y8g0LfQvdCw0LssINC60YLQviDQttC1INGC0Ysg0YLQsNC60L7QuS5cIixcclxuICAgICAgICBdLFxyXG4gICAgICAgIHRnOiBbXHJcbiAgICAgICAgICAgIFwie3snaGVsbG9fbWVzc2FnZSd8cmVuZGVyfX1cXG5cXG4q0J7RgtC/0YDQsNCy0Ywg0YHQstC+0Lkg0LrQvtC0INC/0YDQuNCz0LvQsNGI0LXQvdC40Y8sINGH0YLQvtCx0Ysg0Y8g0LfQvdCw0LssINC60YLQviDQttC1INGC0Ysg0YLQsNC60L7QuS4qXCJcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgaGVscF93aXRoX2ludml0YXRpb25fY29kZTogW1xyXG4gICAgICAgIFwi0JrQvtC0INC/0YDQuNCz0LvQsNGI0LXQvdC40Y8g0LzQvtC20L3QviDRg9C30L3QsNGC0Ywg0YMg0YHQstC+0LXQs9C+INC60LvQsNGB0YHQvdC+0LPQviDRgNGD0LrQvtCy0L7QtNC40YLQtdC70Y8uIFwiICtcclxuICAgICAgICBcItCe0L0g0LLRi9Cz0LvRj9C00LjRgiDQutCw0Log0LTQstCwINCw0L3Qs9C70LjQudGB0LrQuNGFINGB0LvQvtCy0LAg0Lgg0YfQuNGB0LvQvi4g0J7QvdC4INGA0LDQt9C00LXQu9C10L3RiyDRgSDQv9C+0LzQvtGJ0YzRjiDQtNC10YTQuNGB0LAuXFxu0J3QsNC/0YDQuNC80LXRgCwg0LLQvtGCINC60LDQuiDQvtC9INC80L7QttC10YIg0LLRi9Cz0LvRj9C00LXRgtGMOiB0ZXN0LWNvZGUtNzJcIlxyXG4gICAgXSxcclxuICAgIGNvZGVfbm90X2ZvdW5kOiB7XHJcbiAgICAgICAgdGc6IFtcclxuICAgICAgICAgICAgXCIq0J3QtSDQvNC+0LPRgyDQvdCw0LnRgtC4INGC0LDQutC+0Lkg0LrQvtC0INC/0YDQuNCz0LvQsNGI0LXQvdC40Y8uLi4qXFxuXFxu0J/RgNC+0LLQtdGA0Ywg0LXQs9C+INC90LAg0L7RiNC40LHQutC4IFwiICtcclxuICAgICAgICAgICAgXCLQuNC70Lgg0L7QsdGA0LDRgtC40YHRjCDQuiDRgdCy0L7QtdC80YMg0LrQu9Cw0YHRgdC90L7QvNGDINGA0YPQutC+0LLQvtC00LjRgtC10LvRji5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdms6IFtcclxuICAgICAgICAgICAgXCLQndC1INC80L7Qs9GDINC90LDQudGC0Lgg0YLQsNC60L7QuSDQutC+0LQg0L/RgNC40LPQu9Cw0YjQtdC90LjRjy4uLlxcblxcbtCf0YDQvtCy0LXRgNGMINC10LPQviDQvdCwINC+0YjQuNCx0LrQuCBcIiArXHJcbiAgICAgICAgICAgIFwi0LjQu9C4INC+0LHRgNCw0YLQuNGB0Ywg0Log0YHQstC+0LXQvNGDINC60LvQsNGB0YHQvdC+0LzRgyDRgNGD0LrQvtCy0L7QtNC40YLQtdC70Y4uXCJcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgaGVscF93aXRoX2ludml0YXRpb25fY29kZV9idXR0b25fbGFiZWw6IFwi0KMg0LzQtdC90Y8g0L3QtdGCINC60L7QtNCwINC/0YDQuNCz0LvQsNGI0LXQvdC40Y9cIixcclxuICAgIHN1Y2Nlc3NfY29kZTogW1xyXG4gICAgICAgIFwi0J7RgtC70LjRh9C90L4hIPCfjolcXG7QotC10L/QtdGA0Ywg0Y8g0LfQvdCw0Y4sINGH0YLQviDRgtGLIOKAlCB7e2xhc3RfbmFtZX19IHt7Zmlyc3RfbmFtZX19LlxcblwiICsgLy9UT0RPINC/0YDQvtCy0LXRgNC40YLRjCDRgdC80LDQudC7IPCfpbNcclxuICAgICAgICAn0JLRgdC1INCz0L7RgtC+0LLQviwg0L3QtSDQv9GA0L7Qv9GD0YHQutCw0Lkg0LzQvtC4INGB0L7QvtCx0YnQtdC90LjRjy4nXHJcbiAgICBdLFxyXG4gICAgc2V0dGluZ3NfZmlyc3RfbWVzc2FnZTogW1xyXG4gICAgICAgIFwi0KfRgtC+INC20LUg0YLRiyDQttC10LvQsNC10YjRjCDRgdC00LXQu9Cw0YLRjD9cIlxyXG4gICAgXSxcclxuICAgIHNlbmRfcXVlc3Rpb25zX2J1dHRvbjogW1xyXG4gICAgICAgIFwie3sn0KUnIGlmIHNlbmQgZWxzZSAn0J3QtSDRhSd9fdC+0YfRgyDQv9C+0LvRg9GH0LDRgtGMINGD0LLQtdC00L7QvNC70LXQvdC40Y9cIlxyXG4gICAgXSxcclxuICAgIGRvbnRfc2VuZF9xdWVzdGlvbnNfYW5zd2VyOiB7XHJcbiAgICAgICAgdGc6IFtcclxuICAgICAgICAgICAgXCLQpdC+0YDQvtGI0L4sINGC0LXQv9C10YDRjCDRgtC10LHQtSDQv9GA0LjQtNC10YLRgdGPICrRgdCw0LzQvtGB0YLQvtGP0YLQtdC70YzQvdC+KiDRgdC+0L7QsdGJ0LDRgtGMLCDQutC+0LPQtNCwINGC0Ysg0YXQvtGH0LXRiNGMINC60YPRiNCw0YLRjC4gXCIgK1xyXG4gICAgICAgICAgICBcIlxcbtCU0LvRjyDRjdGC0L7Qs9C+INC+0YLQv9GA0LDQstGMINC80L3QtSDRgdC+0L7QsdGJ0LXQvdC40LUgXFxcIirQryDQsdGD0LTRgyDQutGD0YjQsNGC0YwqXFxcIi5cXG57eydzb21ldGhpbmdfbW9yZSd8cmVuZGVyfX1cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdms6IFtcclxuICAgICAgICAgICAgXCLQpdC+0YDQvtGI0L4sINGC0LXQv9C10YDRjCDRgtC10LHQtSDQv9GA0LjQtNC10YLRgdGPINCh0JDQnNCe0KHQotCe0K/QotCV0JvQrNCd0J4g0YHQvtC+0LHRidCw0YLRjCwg0LrQvtCz0LTQsCDRgtGLINGF0L7Rh9C10YjRjCDQutGD0YjQsNGC0YwuIFwiICtcclxuICAgICAgICAgICAgXCJcXG7QlNC70Y8g0Y3RgtC+0LPQviDQvtGC0L/RgNCw0LLRjCDQvNC90LUg0YHQvtC+0LHRidC10L3QuNC1IFxcXCLQryDQsdGD0LTRgyDQutGD0YjQsNGC0YxcXFwiLlxcbnt7J3NvbWV0aGluZ19tb3JlJ3xyZW5kZXJ9fVwiXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHNlbmRfcXVlc3Rpb25zX2Fuc3dlcjogW1xyXG4gICAgICAgIFwi0KXQvtGA0L7RiNC+LCDRgtC10L/QtdGA0Ywg0LrQsNC20LTRi9C5INCx0YPQtNC90LjQuSDQtNC10L3RjCDRjyDRgtC10LHQtSDQsdGD0LTRgyDQv9GA0LjRgdGL0LvQsNGC0Ywg0YHQvtC+0LHRidC10L3QuNC1INGBINCy0L7Qv9GA0L7RgdC+0LwuXFxue3snc29tZXRoaW5nX21vcmUnfHJlbmRlcn19XCJcclxuICAgIF0sXHJcbiAgICBzb21ldGhpbmdfbW9yZTogW1xyXG4gICAgICAgIFwi0JzQvtC20LXRgiDRh9GC0L4t0L3QuNCx0YPQtNGMINC10YnQtT9cIixcclxuICAgICAgICBcItCW0LXQu9Cw0LXRiNGMINGB0LTQtdC70LDRgtGMINGH0YLQvi3QvdC40LHRg9C00Ywg0LXRidC1P1wiXHJcbiAgICBdLFxyXG4gICAgc2V0dGluZ3NfY2xvc2VkOiBbXHJcbiAgICAgICAgJ9Cd0LDRgdGC0YDQvtC50LrQuCDQt9Cw0LrRgNGL0YLRiydcclxuICAgIF0sXHJcbiAgICBub19tZW51OiBbXHJcbiAgICAgICAgXCLQmiDRgdC+0LbQsNC70LXQvdC40Y4sINGB0LXQs9C+0LTQvdGPINC80LXQvdGOINC90LUg0YPQutCw0LfQsNC90L4uXCIsXHJcbiAgICAgICAgXCLQnNC10L3RjiDQvdC1INGD0LrQsNC30LDQvdC+LiDwn4yaXCIsXHJcbiAgICAgICAgXCLQmtCw0LbQtdGC0YHRjyDQvNC10L3RjiDQt9Cw0LHRi9C70Lgg0YPQutCw0LfQsNGC0YwuIPCfmKdcIixcclxuICAgIF0sXHJcbiAgICBxdWVzdGlvbjoge1xyXG4gICAgICAgIHZrOiBcInt7J2VhdGluZ19xdWVzdGlvbid8cmVuZGVyfX1cXG5cXG5cIiArXHJcbiAgICAgICAgICAgIFwie3sndG9kYXlfaW5fZGluaW5nX3Jvb20nfHJlbmRlcn19XFxuXCIgK1xyXG4gICAgICAgICAgICBcInt7bWVudX19XCIsXHJcbiAgICAgICAgdGc6IFwiKnt7J2VhdGluZ19xdWVzdGlvbid8cmVuZGVyfX0qXFxuXFxuXCIgK1xyXG4gICAgICAgICAgICBcIip7eyd0b2RheV9pbl9kaW5pbmdfcm9vbSd8cmVuZGVyfX0qXFxuXCIgK1xyXG4gICAgICAgICAgICBcInt7bWVudX19XCJcclxuICAgIH0sXHJcbiAgICBlZGl0ZWRfcXVlc3Rpb246IHtcclxuICAgICAgICB2azogXCJ7eyd5b3VyX2Fuc3dlcid8cmVuZGVyfX0ge3soJ2lfd2FudF9lYXQnIGlmIHdpbGxfZWF0IGVsc2UgJ2lfZG9udF93YW50X2VhdCcpfHJlbmRlcn19LlxcblxcblwiICtcclxuICAgICAgICAgICAgXCJ7eyd0b2RheV9pbl9kaW5pbmdfcm9vbSd8cmVuZGVyfX1cXG5cIiArXHJcbiAgICAgICAgICAgIFwie3ttZW51fX1cIixcclxuICAgICAgICB0ZzogXCJ7eygnaV93YW50X2VhdF90aGFua3MnIGlmIHdpbGxfZWF0IGVsc2UgJ2lfZG9udF93YW50X2VhdF9va2F5Jyl8cmVuZGVyfX1cXG5cXG5cIiArXHJcbiAgICAgICAgICAgIFwiKtCi0Ysg0LXRidC1INC80L7QttC10YjRjCDQuNC30LzQtdC90LjRgtGMINGB0LLQvtC5INCy0YvQsdC+0YAuKlxcblwiICtcclxuICAgICAgICAgICAgXCIqe3sndG9kYXlfaW5fZGluaW5nX3Jvb20nfHJlbmRlcn19KlxcblwiICtcclxuICAgICAgICAgICAgXCJ7e21lbnV9fVwiXHJcbiAgICB9LFxyXG4gICAgc3RvcHBlZF9wb2xsX3F1ZXN0aW9uOiB7XHJcbiAgICAgICAgdGc6IFwiKnt7J3lvdXJfYW5zd2VyJ3xyZW5kZXJ9fSB7eygnaV93YW50X2VhdCcgaWYgd2lsbF9lYXQgZWxzZSAnaV9kb250X3dhbnRfZWF0Jyl8cmVuZGVyfX0uKlxcblxcblwiICtcclxuICAgICAgICAgICAgXCIqe3sndG9kYXlfaW5fZGluaW5nX3Jvb20nfHJlbmRlcn19KlxcblwiICtcclxuICAgICAgICAgICAgXCJ7e21lbnV9fVwiLFxyXG4gICAgfSxcclxuICAgIHlvdXJfYW5zd2VyOiBbXHJcbiAgICAgICAgXCLQotCy0L7QuSDQvtGC0LLQtdGCOlwiLFxyXG4gICAgICAgIFwi0KLQstC+0Lkg0LLRi9Cx0L7RgDpcIlxyXG4gICAgXSxcclxuICAgIGlfd2FudF9lYXQ6IFtcclxuICAgICAgICBcItGPINCx0YPQtNGDINC10YHRgtGMXCIsXHJcbiAgICAgICAgXCLRjyDQsdGD0LTRgyDQutGD0YjQsNGC0YxcIixcclxuICAgICAgICBcItGPINC/0LjRgtCw0Y7RgdGMINGB0LXQs9C+0LTQvdGPXCIsXHJcbiAgICAgICAgXCLRjyDRgdC10LPQvtC00L3RjyDQtdC8XCIsXHJcbiAgICBdLFxyXG4gICAgaV9kb250X3dhbnRfZWF0OiBbXHJcbiAgICAgICAgXCLRjyDQvdC1INCx0YPQtNGDINC10YHRgtGMXCIsXHJcbiAgICAgICAgXCLRjyDQvdC1INCx0YPQtNGDINC60YPRiNCw0YLRjFwiLFxyXG4gICAgICAgIFwi0Y8g0L3QtSDQv9C40YLQsNGO0YHRjCDRgdC10LPQvtC00L3Rj1wiLFxyXG4gICAgICAgIFwi0Y8g0YHQtdCz0L7QtNC90Y8g0L3QtSDQtdC8XCIsXHJcbiAgICBdLFxyXG4gICAgaV93YW50X2VhdF90aGFua3M6IFtcclxuICAgICAgICBcItCe0YLQu9C40YfQvdC+LCDQv9GA0LjRj9GC0L3QvtCz0L4g0LDQv9C/0LXRgtC40YLQsPCfkYzwn4+7XCJcclxuICAgIF0sXHJcbiAgICBpX2RvbnRfd2FudF9lYXRfb2theTogW1xyXG4gICAgICAgIFwi0KXQvtGA0L7RiNC+LCDRgdC/0LDRgdC40LHQviDQt9CwINGC0LLQvtC5INC+0YLQstC10YIg8J+RqfCfj7vigI3wn42zXCJcclxuICAgIF0sXHJcbiAgICBpX3dhbnRfZWF0X2J1dHRvbjogXCJ7eydpX3dhbnRfZWF0J3xyZW5kZXJ8Y2FwaXRhbGl6ZV9maXJzdH19XCIsXHJcbiAgICBpX2RvbnRfd2FudF9lYXRfYnV0dG9uOiBcItCd0LXRgiwge3snaV9kb250X3dhbnRfZWF0J3xyZW5kZXJ9fVwiLFxyXG4gICAgdG9kYXlfaW5fZGluaW5nX3Jvb206IFtcclxuICAgICAgICBcItCh0LXQs9C+0LTQvdGPINCyINGB0YLQvtC70L7QstC+0Lk6XCIsXHJcbiAgICAgICAgXCLQkiDRgdGC0L7Qu9C+0LLQvtC5INGB0LXQs9C+0LTQvdGPOlwiLFxyXG4gICAgICAgIFwi0JIg0LzQtdC90Y4g0YHQtdCz0L7QtNC90Y86XCIsXHJcbiAgICAgICAgXCLQodC10LPQvtC00L3RjyDRgdGC0L7Qu9C+0LLQsNGPINC/0YDQtdC00LvQsNCz0LDQtdGCOlwiXHJcbiAgICBdLFxyXG4gICAgZWF0aW5nX3F1ZXN0aW9uOiBbXHJcbiAgICAgICAgJ9Cf0YDQuNCy0LXRgiwg0YLRiyDQsdGD0LTQtdGI0Ywg0YHQtdCz0L7QtNC90Y8g0L/QuNGC0LDRgtGM0YHRjz8nLFxyXG4gICAgICAgIFwi0J/RgNC40LLQtdGCLCDQvdC1INGF0L7Rh9C10YjRjCDQv9C+0LTQutGA0LXQv9C40YLRjNGB0Y8/XCJcclxuICAgIF0sXHJcbiAgICBva195b3Vfd2lsbF9lYXRfdG9kYXk6IFtcclxuICAgICAgICBcItCl0L7RgNC+0YjQviwg0YLRiyDQutGD0YjQsNC10YjRjCDRgdC10LPQvtC00L3Rjy5cIixcclxuICAgICAgICBcItCe0YLQu9C40YfQvdC+LCDQsdGD0LTRgyDQt9C90LDRgtGMLCDRh9GC0L4g0YLRiyDQv9C40YLQsNC10YjRjNGB0Y8g0YHQtdCz0L7QtNC90Y/wn6SXXCIsXHJcbiAgICAgICAgXCLQpdC+0YDQvtGI0L4sINGPINC/0LXRgNC10LTQsNC8INGN0YLQviDQsiDRgdGC0L7Qu9C+0LLRg9GO8J+Yj1wiLFxyXG4gICAgICAgIFwi0J7QutC10LksINGB0L/QsNGB0LjQsdC+INC30LAg0YLQstC+0Lkg0L7RgtCy0LXRgvCfmYJcIlxyXG4gICAgXSxcclxuICAgIG9rX3lvdV93aWxsX25vdF9lYXRfdG9kYXk6IFtcclxuICAgICAgICAn0JvQsNC00L3Qviwg0YLRiyDQvdC1INC60YPRiNCw0LXRiNGMINGB0LXQs9C+0LTQvdGPLicsXHJcbiAgICAgICAgXCLQm9Cw0LTQvdC+LCDRjyDQv9C10YDQtdC00LDQvCDQsiDRgdGC0L7Qu9C+0LLRg9GOINC40L3RhNC+0YDQvNCw0YbQuNGOINC+0LEg0Y3RgtC+0Lzwn5ifXCIsXHJcbiAgICAgICAgXCLQpdC+0YDQvtGI0L4sINGPINGB0L7QvtCx0YnRjiDQvdCw0YjQtdC5INGB0YLQvtC70L7QstC+0Lkg0L7QsSDRjdGC0L7QuSDQv9C10YfQsNC70YzQvdC+0Lkg0L3QvtCy0L7RgdGC0Ljwn5itXCJcclxuICAgIF0sXHJcbiAgICBva195b3Vfd2lsbF9lYXRfdG9kYXlfYnV0X3BvbGxfaXNudF9hY3RpdmU6IFtcclxuICAgICAgICBcItCl0L7RgNC+0YjQviwg0LXRgdC70Lgg0YHRgtC+0LvQvtCy0LDRjyDRgNCw0LHQvtGC0LDQtdGCINGB0LXQs9C+0LTQvdGPLCDQvNGLINGB0L7QvtCx0YnQuNC8INC10Lkg0L4g0YLQvtC8LCDRh9GC0L4g0YLRiyDQutGD0YjQsNC10YjRjFwiXHJcbiAgICBdLFxyXG4gICAgb2tfeW91X3dpbGxfbm90X2VhdF90b2RheV9idXRfcG9sbF9pc250X2FjdGl2ZTogW1xyXG4gICAgICAgIFwi0KXQvtGA0L7RiNC+LCDQtdGB0LvQuCDRgdGC0L7Qu9C+0LLQsNGPINGA0LDQsdC+0YLQsNC10YIg0YHQtdCz0L7QtNC90Y8sINC80Ysg0YHQvtC+0LHRidC40Lwg0LXQuSDQviDRgtC+0LwsINGH0YLQviDRgtGLINC90LUg0LrRg9GI0LDQtdGI0YxcIlxyXG4gICAgXSxcclxuICAgIHlvdV9hbHJlYWR5X3dpbGxfZWF0X3RvZGF5OiBbXHJcbiAgICAgICAgXCLQlNCwLCDRjyDRg9C20LUg0LfQvdCw0Y4sINGH0YLQviDRgtGLINCx0YPQtNC10YjRjCDQv9C40YLQsNGC0YzRgdGPINGB0LXQs9C+0LTQvdGPXCJcclxuICAgIF0sXHJcbiAgICB5b3VfYWxyZWFkeV93aWxsX25vdF9lYXRfdG9kYXk6IFtcclxuICAgICAgICBcItCU0LAsINGPINGD0LbQtSDQt9C90LDRjiwg0YfRgtC+INGC0Ysg0L3QtSDQsdGD0LTQtdGI0Ywg0L/QuNGC0LDRgtGM0YHRjyDRgdC10LPQvtC00L3Rj1wiXHJcbiAgICBdLFxyXG4gICAgc29ycnlfdGltZW91dDogW1xyXG4gICAgICAgIFwi0JjQt9Cy0LjQvdC4LCDQvdC+INGD0LbQtSDRgdCy0L7QuSDQstGL0LHQvtGAINC40LfQvNC10L3QuNGC0Ywg0L3QtdC70YzQt9GPXCIsXHJcbiAgICBdLFxyXG4gICAgc29ycnlfeW91X3JlX2xhdGU6IHtcclxuICAgICAgICB2azogXCLQotGLINC+0L/QvtC30LTQsNC7INC90LAg0LfQsNC/0LjRgdGMLlxcblwiICtcclxuICAgICAgICAgICAgXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGA0LDQtyB7eyfQvdC1INC/0YDQvtC/0YPRgdGC0Lgg0L3QsNGI0LUg0YHQvtC+0LHRidC10L3QuNC1JyBpZiBub3RpZmllZCBlbHNlICfQvdC1INC30LDQsdGL0LLQsNC5INGA0LDRgdGB0LrQsNC30LDRgtGMINC90LDQvCDQviDRgdCy0L7QuNGFINC/0LvQsNC90LDRhSd9fS5cIixcclxuICAgICAgICB0ZzogXCIq0JjQt9Cy0LjQvdC4LCDRgtGLINC+0L/QvtC30LTQsNC7INC90LAg0LfQsNC/0LjRgdGMINGB0LXQs9C+0LTQvdGPLipcXG5cIiArXHJcbiAgICAgICAgICAgIFwi0J/QvtC20LDQu9GD0LnRgdGC0LAsINCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgNCw0Lcge3sn0L3QtSDQv9GA0L7Qv9GD0YHRgtC4INC90LDRiNC1INGB0L7QvtCx0YnQtdC90LjQtScgaWYgbm90aWZpZWQgZWxzZSAn0L3QtSDQt9Cw0LHRi9Cy0LDQuSDRgNCw0YHRgdC60LDQt9Cw0YLRjCDQvdCw0Lwg0L4g0YHQstC+0LjRhSDQv9C70LDQvdCw0YUnfX0uXCJcclxuICAgIH0sXHJcbiAgICBpX3dpbGxfZWF0X2FueXdheV9idXR0b246IHtcclxuICAgICAgICB2azogXCLQndC+INGPINCy0YHQtSDRgNCw0LLQvdC+INC/0L7QudC00YMg0LXRgdGC0YxcIixcclxuICAgICAgICB0ZzogXCLQndC+INGPINCy0YHQtSDRgNCw0LLQvdC+INC/0L7QudC00YMg0LXRgdGC0YxcIlxyXG4gICAgfSxcclxuICAgIGlfd2lsbF9lYXRfYW55d2F5X3RleHQ6IHtcclxuICAgICAgICB2azogXCLQpdC+0YDQvtGI0L4sINC80Ysg0YPQstC10LTQvtC80LjQvCDRgdGC0L7Qu9C+0LLRg9GOINC+INGC0L7QvCwg0YfRgtC+INGC0Ysg0YHQvtCx0LjRgNCw0LXRiNGM0YHRjyDQutGD0YjQsNGC0YwuXFxuXCIgK1xyXG4gICAgICAgICAgICBcItCS0LDQttC90L4g0LPQvtCy0L7RgNC40YLRjCDQsiDQvdCw0YfQsNC70LUg0LTQvdGPINC+INGC0L7QvCwg0YfRgtC+INGC0Ysg0YHQvtCx0LjRgNCw0LXRiNGM0YHRjyDQv9C40YLQsNGC0YzRgdGPLiDQn9C+0LLQsNGA0LAg0L/RgNC40LPQvtGC0LDQstC70LjQstCw0Y7RgiDQv9C+0YDRhtC40Y4g0YHQv9C10YbQuNCw0LvRjNC90L4g0LTQu9GPINGC0LXQsdGPLiBcIiArXHJcbiAgICAgICAgICAgIFwi0JIg0L7QtNC40L0g0LTQtdC90Ywg0LzQvtC20LXRgiDQv9C+0LvRg9GH0LjRgtGM0YHRjyDRgtCw0LosINGH0YLQviDQu9C40YjQvdC40YUg0L/QvtGA0YbQuNC5INC/0YDQvtGB0YLQviDQvdC1INC+0YHRgtCw0L3QtdGC0YHRjyDQuCDRgtC10LHQtSDQv9GA0LjQtNC10YLRgdGPINCx0YvRgtGMINCx0LXQtyDQvtCx0LXQtNCwLlwiLFxyXG4gICAgICAgIHRnOiBcIirQpdC+0YDQvtGI0L4sINC80Ysg0YPQstC10LTQvtC80LjQvCDRgdGC0L7Qu9C+0LLRg9GOINC+INGC0L7QvCwg0YfRgtC+INGC0Ysg0YHQvtCx0LjRgNCw0LXRiNGM0YHRjyDQutGD0YjQsNGC0YwuKlxcblxcblwiICtcclxuICAgICAgICAgICAgXCLQktCw0LbQvdC+INCz0L7QstC+0YDQuNGC0Ywg0LIg0L3QsNGH0LDQu9C1INC00L3RjyDQviDRgtC+0LwsINGH0YLQviDRgtGLINGB0L7QsdC40YDQsNC10YjRjNGB0Y8g0L/QuNGC0LDRgtGM0YHRjy4g0J/QvtCy0LDRgNCwINC/0YDQuNCz0L7RgtCw0LLQu9C40LLQsNGO0YIg0L/QvtGA0YbQuNGOINGB0L/QtdGG0LjQsNC70YzQvdC+INC00LvRjyDRgtC10LHRjy4gXCIgK1xyXG4gICAgICAgICAgICBcItCSINC+0LTQuNC9INC00LXQvdGMINC80L7QttC10YIg0L/QvtC70YPRh9C40YLRjNGB0Y8g0YLQsNC6LCDRh9GC0L4g0LvQuNGI0L3QuNGFINC/0L7RgNGG0LjQuSDQv9GA0L7RgdGC0L4g0L3QtSDQvtGB0YLQsNC90LXRgtGB0Y8g0Lgg0YLQtdCx0LUg0L/RgNC40LTQtdGC0YHRjyDQsdGL0YLRjCDQsdC10Lcg0L7QsdC10LTQsC5cIlxyXG4gICAgfSxcclxuICAgIHlvdV9kaWRfbm90X3JlY29yZF95b3Vyc2VsZjoge1xyXG4gICAgICAgIHZrOiBcItCi0Ysg0L/QuNGC0LDQu9GB0Y8g0YHQtdCz0L7QtNC90Y8uXFxuXFxuXCIgK1xyXG4gICAgICAgICAgICBcItCi0LXQsdGPINC90LUg0L3QsNGI0LvQuCDQsiDQt9Cw0L/QuNGB0Y/RhSDRgdGC0L7Qu9C+0LLQvtC5INGB0LXQs9C+0LTQvdGPLiDQn9C+0LbQsNC70YPQudGB0YLQsCwgXCIgK1xyXG4gICAgICAgICAgICBcInt7J9C90LUg0LfQsNCx0YvQstCw0Lkg0L7RgtCy0LXRh9Cw0YLRjCDQvdCwINC80L7QuCDRgdC+0L7QsdGJ0LXQvdC40Y8nIGlmIG5vdGlmaWVkIGVsc2UgXCIgK1xyXG4gICAgICAgICAgICBcIifQvdC1INC30LDQsdGL0LLQsNC5INC+0YLQv9GA0LDQstC70Y/RgtGMINC80L3QtSDRgdC+0L7QsdGJ0LXQvdC40Y8g0L4g0YLQvtC8LCDRh9GC0L4g0YLRiyDQv9C40YLQsNC10YjRjNGB0Y8g0YHQtdCz0L7QtNC90Y8uINCY0LvQuCDRjyDQvNC+0LPRgyDQvdCw0L/QvtC80LjQvdCw0YLRjCDRgtC10LHQtSDQvtCxINGN0YLQvtC8Lid9fS4gXCIgK1xyXG4gICAgICAgICAgICBcItCt0YLQviDQstCw0LbQvdC+LlxcblxcblwiICtcclxuICAgICAgICAgICAgXCLQldGB0LvQuCDRjdGC0L4g0L3QtSDRgtCy0L7QtSDQtNC10LnRgdGC0LLQuNC1LCDQvtCx0YDQsNGC0LjRgdGMINC6INGB0LLQvtC10LzRgyDQutC70LDRgdGB0L3QvtC80YMg0YDRg9C60L7QstC+0LTQuNGC0LXQu9GOLiBcIiArXHJcbiAgICAgICAgICAgIFwi0JLQvtC30LzQvtC20L3Qviwg0LrRgtC+LdGC0L4g0L/QvtC70YzQt9C+0LLQsNC70YHRjyDRgtCy0L7QtdC5INC60LDRgNGC0L7QuSDQv9C40YLQsNC90LjRjy5cIixcclxuICAgICAgICB0ZzogXCIq0KLRiyDQv9C40YLQsNC70YHRjyDRgdC10LPQvtC00L3Rjy4qXFxuXFxuXCIgK1xyXG4gICAgICAgICAgICBcItCi0LXQsdGPINC90LUg0L3QsNGI0LvQuCDQsiDQt9Cw0L/QuNGB0Y/RhSDRgdGC0L7Qu9C+0LLQvtC5INGB0LXQs9C+0LTQvdGPLiBcIiArXHJcbiAgICAgICAgICAgIFwi0J/QvtC20LDQu9GD0LnRgdGC0LAsIFwiICtcclxuICAgICAgICAgICAgXCJ7eyfQvdC1INC30LDQsdGL0LLQsNC5INC+0YLQstC10YfQsNGC0Ywg0L3QsCDQvNC+0Lgg0YHQvtC+0LHRidC10L3QuNGPJyBpZiBub3RpZmllZCBlbHNlIFwiICtcclxuICAgICAgICAgICAgXCIn0L3QtSDQt9Cw0LHRi9Cy0LDQuSDQvtGC0L/RgNCw0LLQu9GP0YLRjCDQvNC90LUg0YHQvtC+0LHRidC10L3QuNGPINC+INGC0L7QvCwg0YfRgtC+INGC0Ysg0L/QuNGC0LDQtdGI0YzRgdGPINGB0LXQs9C+0LTQvdGPLiDQmNC70Lgg0LIg0L3QsNGB0YLQvtC50LrQsNGFINCy0LrQu9GO0YfQuCDQvtGC0L/RgNCw0LLQutGDINCy0L7Qv9GA0L7RgdC+0LIuJ319LiBcIiArXHJcbiAgICAgICAgICAgIFwiKtCt0YLQviDQstCw0LbQvdC+LipcIlxyXG4gICAgfSxcclxuICAgIGJ1dF9pX2RpZF9ub3RfZWF0X3RvZGF5OiBbXHJcbiAgICAgICAgXCIq0KLRiyDQv9C40YLQsNC70YHRjyDRgdC10LPQvtC00L3Rjy4qXFxuXFxuXCIgK1xyXG4gICAgICAgIFwi0JXRgdC70Lgg0Y3RgtC+INC90LUg0YLQstC+0LUg0LTQtdC50YHRgtCy0LjQtSwg0YLQvtCz0LTQsCwg0LLQvtC30LzQvtC20L3Qviwg0LrRgtC+LdGC0L4g0L/QvtC70YzQt9C+0LLQsNC70YHRjyDRgtCy0L7QtdC5INC60LDRgNGC0L7QuSDQv9C40YLQsNC90LjRjy5cIiArXHJcbiAgICAgICAgXCLQoNCw0YHRgdC60LDQttC4INC+0LEg0Y3RgtC+0Lwg0LrQu9Cw0YHRgdC90L7QvNGDINGA0YPQutC+0LLQvtC00LjRgtC10LvRjiwg0Lgg0LzRiyDQv9C+0L/RgNC+0LHRg9C10Lwg0L/RgNC10LTQvtGC0LLRgNCw0YLQuNGC0Ywg0Y3RgtC+LlwiLFxyXG4gICAgXSxcclxuICAgIGlfZG9udF91bmRlcnN0YW5kOiBbXHJcbiAgICAgICAgXCLQrdC80LwsINC60LDQttC10YLRgdGPLCDRjyDQvdC1INC/0L7QvdC40LzQsNGOINGC0LXQsdGPLiDQndC1INC30LDQsdGL0LLQsNC5OiDRjyDQstGB0LXQs9C+INC70LjRiNGMINCx0L7Rgi5cIixcclxuICAgICAgICBcItCY0LfQstC40L3QuCwg0Y8g0L3QtSDQv9C+0L3Rj9C7INGC0LXQsdGPLiDQryDRg9C80LXRjiDQstGL0L/QvtC70L3Rj9GC0Ywg0YLQvtC70YzQutC+INC60L7QvNCw0L3QtNGLLlwiLFxyXG4gICAgICAgIFwi0Jog0YHQvtC20LDQu9C10L3QuNGOLCDRjyDRg9C80LXRjiDQv9C+0L3QuNC80LDRgtGMINGC0L7Qu9GM0LrQviDQutC+0LzQsNC90LTRiy5cIlxyXG4gICAgXSxcclxuICAgIGlfZG9udF91bmRlcnN0YW5kX21lZGlhOiBbXHJcbiAgICAgICAgXCLQmiDRgdC+0LbQsNC70LXQvdC40Y4sINGPINC90LUg0YPQvNC10Y4g0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGMINGC0LDQutC40LUg0YHQvtC+0LHRidC10L3QuNGPLlwiXHJcbiAgICBdLFxyXG4gICAgeW91X2hhdmVfYmVlbl91bmxpbmtlZDogW1xyXG4gICAgICAgIFwi0JrRgtC+LdGC0L4g0L/RgNC40LLRj9C30LDQuyDRgtCy0L7QuSDQsNC60LrQsNGD0L3RgiDQuiDRgdC10LHQtSDRgSDQv9C+0LzQvtGJ0YzRjiDQv9GA0LjQs9C70LDRgdC40YLQtdC70YzQvdC+0LPQviDQutC+0LTQsC4gXCIgK1xyXG4gICAgICAgIFwi0KLQtdC/0LXRgNGMINGPINC90LUg0YHQvNC+0LPRgyDQstGL0L/QvtC70L3Rj9GC0Ywg0YLQstC+0Lgg0LrQvtC80LDQvdC00YsuINCV0YHQu9C4INGN0YLQviDRgdC00LXQu9Cw0Lsg0L3QtSDRgtGLLCDRgdC+0L7QsdGJ0Lgg0L7RgiDRjdGC0L7QvCDQutC70LDRgdGB0L3QvtC80YMg0YDRg9C60L7QstC+0LTQuNGC0LXQu9GOLlwiXHJcbiAgICBdLFxyXG4gICAgaGVscDogW1xyXG4gICAgICAgIFwie3snaGVsbG9fbWVzc2FnZSd8cmVuZGVyfX1cXG5cIiArXHJcbiAgICAgICAgXCJpb3NmdmduZW9nbnZvXCJcclxuICAgIF1cclxufVxyXG5cclxuaW1wb3J0IG51bmp1Y2tzIGZyb20gXCJudW5qdWNrc1wiXHJcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC9pc1BsYWluT2JqZWN0JztcclxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2lzQXJyYXknXHJcbmltcG9ydCByYW5kb20gZnJvbSAnbG9kYXNoL3JhbmRvbSdcclxuaW1wb3J0IG1lcmdlIGZyb20gXCJsb2Rhc2gvbWVyZ2VcIjtcclxuXHJcbmxldCBlbnYgPSBuZXcgbnVuanVja3MuRW52aXJvbm1lbnQoKTtcclxuXHJcbmVudi5hZGRGaWx0ZXIoJ3JlbmRlcicsIGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gZ2V0TWVzc2FnZSh0aGlzLmVudi5nZXRHbG9iYWwoJ21lc3NlbmdlcicpLCBuYW1lLCBkYXRhKVxyXG59KVxyXG5lbnYuYWRkRmlsdGVyKFwiY2FwaXRhbGl6ZV9maXJzdFwiLCBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgdGV4dCA9IHRleHQuc3BsaXQoXCJcIik7XHJcbiAgICB0ZXh0WzBdID0gdGV4dFswXS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIHRleHQuam9pbihcIlwiKTtcclxufSlcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXNzYWdlKG1lc3NlbmdlciwgdGV4dF9tZXNzYWdlX2lkLCBkYXRhKSB7XHJcbiAgICBsZXQgdGV4dCA9IG1lc3NhZ2VzW3RleHRfbWVzc2FnZV9pZF07XHJcbiAgICBpZiAoIXRleHQpIHRocm93IEVycm9yKFwi0KjQsNCx0LvQvtC9INGB0L7QvtCx0YnQtdC90LjRjyDQvdC1INC90LDQudC00LXQvSBcIiArIHRleHRfbWVzc2FnZV9pZCk7XHJcbiAgICBpZiAoaXNQbGFpbk9iamVjdCh0ZXh0KSkge1xyXG4gICAgICAgIGlmIChtZXNzZW5nZXIpXHJcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0W21lc3Nlbmdlcl07XHJcbiAgICAgICAgZWxzZSB0ZXh0ID0gdGV4dC52aztcclxuICAgIH1cclxuICAgIGlmIChpc0FycmF5KHRleHQpKSB7XHJcbiAgICAgICAgbGV0IGVsID0gcmFuZG9tKDAsIHRleHQubGVuZ3RoIC0gMSwgZmFsc2UpO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0W2VsXTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbnYucmVuZGVyU3RyaW5nKHRleHQsIGRhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcGlsZUZ1bmN0aW9uKG1lc3Nlbmdlcikge1xyXG4gICAgZW52LmFkZEdsb2JhbCgnbWVzc2VuZ2VyJywgbWVzc2VuZ2VyKVxyXG4gICAgcmV0dXJuICh0ZXh0X21lc3NhZ2VfaWQsIGRhdGEpID0+IHtcclxuICAgICAgICByZXR1cm4gZ2V0TWVzc2FnZShtZXNzZW5nZXIsIHRleHRfbWVzc2FnZV9pZCwgZGF0YSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0dWRlbnQoY3R4KSB7XHJcbiAgICBpZiAoIWN0eC5zZXNzaW9uLnN0dWRlbnRfaWQpIHJldHVybiBudWxsO1xyXG4gICAgbGV0IHN0dWRlbnQgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdzdHVkZW50cycpLmRvYyhjdHguc2Vzc2lvbi5zdHVkZW50X2lkKS5nZXQoKTtcclxuICAgIGlmICghc3R1ZGVudC5leGlzdHMpIHJldHVybiBudWxsO1xyXG4gICAgLy9jb25zb2xlLmxvZyhzdHVkZW50KTtcclxuICAgIHJldHVybiBzdHVkZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R1ZGVudE1lbnUoY3R4KSB7XHJcbiAgICBsZXQgbWVudSA9IGN0eC5zdGF0ZS5zZXR0aW5ncy5tZW51W2N0eC5zdGF0ZS5zdHVkZW50LmVhdGluZ190eXBlXTtcclxuICAgIGlmICghbWVudSkgbWVudSA9IGdldE1lc3NhZ2UobnVsbCwgXCJub19tZW51XCIpO1xyXG4gICAgcmV0dXJuIG1lbnU7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kU3R1ZGVudChpbnZpdGF0aW9uX2NvZGUpIHtcclxuICAgIGxldCBzdHVkZW50ID0gYXdhaXQgZGIuY29sbGVjdGlvbignc3R1ZGVudHMnKS53aGVyZSgnaW52aXRhdGlvbl9jb2RlJywgJz09JywgaW52aXRhdGlvbl9jb2RlKS5saW1pdCgxKS5nZXQoKTtcclxuICAgIGlmIChzdHVkZW50LmVtcHR5KSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBzdHVkZW50LmRvY3NbMF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRfZGJfZGF0YShlbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBfaWQ6IGVsLmlkLFxyXG4gICAgICAgIC4uLmVsLmRhdGEoKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGlua1RlbGVncmFtU3R1ZGVudFRvU2Vzc2lvbihjdHgsIGNoYXRfaWQsIHN0dWRlbnQpIHtcclxuICAgIGN0eC5zZXNzaW9uLnN0dWRlbnRfaWQgPSBzdHVkZW50LmlkO1xyXG4gICAgYXdhaXQgbm90aWZ5X2Fib3V0X3VubGluayhzdHVkZW50KTtcclxuICAgIGF3YWl0IHN0dWRlbnQucmVmLnVwZGF0ZSh7XHJcbiAgICAgICAgdXNlcl9pZDogY2hhdF9pZCxcclxuICAgICAgICBib3RfdHlwZTogJ3RnJyxcclxuICAgICAgICBsYXN0X21lc3NhZ2VfaWQ6IG51bGwsXHJcbiAgICAgICAgbGFzdF9zdGlja2VyX21lc3NhZ2VfaWQ6IG51bGxcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGlua1ZrU3R1ZGVudFRvU2Vzc2lvbihjdHgsIGNoYXRfaWQsIHN0dWRlbnQpIHtcclxuICAgIGN0eC5zZXNzaW9uLnN0dWRlbnRfaWQgPSBzdHVkZW50LmlkO1xyXG4gICAgYXdhaXQgbm90aWZ5X2Fib3V0X3VubGluayhzdHVkZW50KTtcclxuICAgIGF3YWl0IHN0dWRlbnQucmVmLnVwZGF0ZSh7XHJcbiAgICAgICAgdXNlcl9pZDogY2hhdF9pZCxcclxuICAgICAgICBib3RfdHlwZTogJ3ZrJyxcclxuICAgICAgICBsYXN0X21lc3NhZ2VfaWQ6IG51bGwsXHJcbiAgICAgICAgbGFzdF9zdGlja2VyX21lc3NhZ2VfaWQ6IG51bGwsXHJcbiAgICAgICAgLy9UT0RPIHVzZV9vbGRfY2xpZW50OiB0cnVlXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVubGlua1N0dWRlbnRJblNlc3Npb24oY3R4LCBzdHVkZW50KSB7XHJcbiAgICBjdHguc2Vzc2lvbi5zdHVkZW50X2lkID0gdW5kZWZpbmVkO1xyXG4gICAgYXdhaXQgdW5saW5rU3R1ZGVudChzdHVkZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVubGlua1N0dWRlbnQoc3R1ZGVudCkge1xyXG5cclxuICAgIGF3YWl0IHN0dWRlbnQucmVmLnVwZGF0ZSh7XHJcbiAgICAgICAgdXNlcl9pZDogbnVsbCxcclxuICAgICAgICBib3RfdHlwZTogbnVsbCxcclxuICAgICAgICBsYXN0X21lc3NhZ2VfaWQ6IG51bGwsXHJcbiAgICAgICAgbGFzdF9zdGlja2VyX21lc3NhZ2VfaWQ6IG51bGwsXHJcbiAgICAgICAgLy9UT0RPIHVzZV9vbGRfY2xpZW50OiB0cnVlXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hTdHVkZW50KGN0eCwgY2hlY2tfbGluaykge1xyXG4gICAgbGV0IHN0dWRlbnQgPSBhd2FpdCBnZXRTdHVkZW50KGN0eCk7XHJcbiAgICBpZiAoIXN0dWRlbnQpIHJldHVybiBudWxsO1xyXG4gICAgaWYgKCFjaGVja19saW5rKHN0dWRlbnQuZGF0YSgpLCBjdHgpKSB7XHJcbiAgICAgICAgY3R4LnNlc3Npb24gPSB7fTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGN0eC5zdGF0ZS5zdHVkZW50UmVmID0gc3R1ZGVudDtcclxuICAgIGN0eC5zdGF0ZS5zdHVkZW50ID0gc3R1ZGVudC5kYXRhKCk7XHJcbiAgICBjdHguc3RhdGUuc3R1ZGVudC5faWQgPSBzdHVkZW50LmlkO1xyXG4gICAgY3R4LnN0YXRlLnN0dWRlbnQudXBkYXRlID0gYXN5bmMgKGVscykgPT4ge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBzdHVkZW50LnJlZi51cGRhdGUoZWxzKTtcclxuICAgICAgICBjdHguc3RhdGUuc3R1ZGVudCA9IG1lcmdlKGN0eC5zdGF0ZS5zdHVkZW50LCBlbHMpO1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoU2V0dGluZ3MoY3R4KSB7XHJcbiAgICBsZXQgc2V0dGluZ3MgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwic3lzdGVtXCIpLmRvYyhcInNldHRpbmdzXCIpLmdldCgpO1xyXG4gICAgY3R4LnN0YXRlLnNldHRpbmdzUmVmID0gc2V0dGluZ3M7XHJcbiAgICBjdHguc3RhdGUuc2V0dGluZ3MgPSBzZXR0aW5ncy5kYXRhKCk7XHJcbiAgICBjdHguc3RhdGUuc2V0dGluZ3MudXBkYXRlID0gYXN5bmMgKGVscykgPT4ge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBzZXR0aW5ncy5yZWYudXBkYXRlKGVscyk7XHJcbiAgICAgICAgY3R4LnN0YXRlLnNldHRpbmdzID0gbWVyZ2UoY3R4LnN0YXRlLnNldHRpbmdzLCBlbHMpO1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5ncygpIHtcclxuICAgIGxldCBzZXR0aW5ncyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJzeXN0ZW1cIikuZG9jKFwic2V0dGluZ3NcIikuZ2V0KCk7XHJcbiAgICBpZiAoIXNldHRpbmdzLmV4aXN0cykge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgbGV0IGRhdGEgPSBzZXR0aW5ncy5kYXRhKCk7XHJcbiAgICBkYXRhLnJhdyA9IHNldHRpbmdzO1xyXG4gICAgZGF0YS51cGRhdGUgPSBhc3luYyAoZWxzKSA9PiB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHNldHRpbmdzLnJlZi51cGRhdGUoZWxzKTtcclxuICAgICAgICBtZXJnZSh0aGlzLCBlbHMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbmltcG9ydCB0ZyBmcm9tICcuL3RnX2luc3RhbmNlJztcclxuaW1wb3J0IHZrIGZyb20gJy4vdmtfaW5zdGFuY2UnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG5vdGlmeV9hYm91dF91bmxpbmsoc3QpIHtcclxuICAgIGxldCBzdHVkZW50ID0gc3QuZGF0YSgpO1xyXG4gICAgaWYgKHN0dWRlbnQuYm90X3R5cGUgPT09IFwidGdcIikge1xyXG4gICAgICAgIGF3YWl0IHRnLnRlbGVncmFtLnNlbmRNZXNzYWdlKHN0dWRlbnQudXNlcl9pZCwgZ2V0TWVzc2FnZSgndGcnLCBcInlvdV9oYXZlX2JlZW5fdW5saW5rZWRcIikpO1xyXG4gICAgfSBlbHNlIGlmIChzdHVkZW50LmJvdF90eXBlID09PSBcInZrXCIpIHtcclxuICAgICAgICBhd2FpdCB2ay5hcGkubWVzc2FnZXMuc2VuZCh7XHJcbiAgICAgICAgICAgIHVzZXJfaWQ6IHN0dWRlbnQudXNlcl9pZCxcclxuICAgICAgICAgICAgbWVzc2FnZTogZ2V0TWVzc2FnZSgndmsnLCBcInlvdV9oYXZlX2JlZW5fdW5saW5rZWRcIilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcclxuLy8gcHJvY2Vzcy5lbnYuYm90YXBpID0gJzU4NzI5NzkxMjpBQUVnSVkwMUVqWkowLWprVmFwZTByd0NiWGZMbDUyMW1jRSc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmxldCBhcHAgPSBuZXcgZXhwcmVzcygpO1xyXG5pbXBvcnQgKiBhcyBmdW5jIGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCAqIGFzIGNtZCBmcm9tIFwiLi9jb21tYW5kc1wiXHJcbmltcG9ydCAqIGFzIHZrIGZyb20gJy4vdmtfYm90JztcclxuXHJcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5cclxuYXBwLmFsbCgnL3dlYmhvb2snLCAocmVxLHJlcyk9PntcclxuICAgIGZ1bmMubWFpbkJvdChyZXEsIHJlcyk7XHJcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJva1wiKTtcclxufSk7XHJcblxyXG5hcHAuYWxsKCcvd2ViaG9va192aycsIChyZXEsIHJlcyk9PntcclxuICAgIGNvbnNvbGUubG9nKHJlcS51cmwpO1xyXG4gICAgcmVxLm1ldGhvZCA9IFwiUE9TVFwiO1xyXG4gICAgdmsudmtfYm90KHJlcSwgcmVzLCBmdW5jdGlvbigpe2NvbnNvbGUubG9nKGFyZ3VtZW50cyl9KTtcclxufSk7XHJcblxyXG5hcHAuYWxsKCcvY29tbWFuZCcsIGNtZC5jb21tYW5kc0JvdCk7XHJcbi8vIGFwcC51c2UoY21kLmNvbW1hbmRzKTtcclxuXHJcbmFwcC5saXN0ZW4oNTAwMCk7IiwiaW1wb3J0IFN0YWdlIGZyb20gJ3RlbGVncmFmL3N0YWdlJztcclxuaW1wb3J0IEV4dHJhIGZyb20gJ3RlbGVncmFmL2V4dHJhJztcclxuaW1wb3J0IE1hcmt1cCBmcm9tICd0ZWxlZ3JhZi9tYXJrdXAnO1xyXG5jb25zdCB7bGVhdmUsIGVudGVyfSA9IFN0YWdlO1xyXG5pbXBvcnQgc3RhbmRhcmRfdXNlIGZyb20gXCIuL3N0YW5kYXJkX3VzZVwiO1xyXG5pbXBvcnQge2RiLCBnZXRTdHVkZW50LCBnZXRDb21waWxlRnVuY3Rpb24sIGdldFN0dWRlbnRNZW51fSBmcm9tIFwiLi9jb21tb25cIlxyXG5pbXBvcnQgYm90IGZyb20gJy4vdGdfaW5zdGFuY2UnO1xyXG5pbXBvcnQge3dyYXAgYXMgYX0gZnJvbSBcIi4vYXN5bmNfdG9fbWlkZGxld2FyZS50c1wiXHJcbmltcG9ydCB7RGF0ZVRpbWV9IGZyb20gJ2x1eG9uJztcclxuYm90LmNhdGNoKGFzeW5jIChlKT0+e1xyXG4gICAgY29uc29sZS5sb2coZS50b1N0cmluZygpKTtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbn0pO1xyXG5jb25zdCByZW5kZXIgPSBnZXRDb21waWxlRnVuY3Rpb24oXCJ0Z1wiKTtcclxuXHJcbnN0YW5kYXJkX3VzZShib3QpO1xyXG5cclxubGV0IHF1ZXN0aW9uX2tleWJvYXJkID0gKHllc19hbnN3ZXIpPT5FeHRyYS5tYXJrZG93bigpLm1hcmt1cCgoZSk9PmUuaW5saW5lS2V5Ym9hcmQoW1xyXG4gICAgZS5jYWxsYmFja0J1dHRvbigoeWVzX2Fuc3dlcj9cIuKchSBcIjpcIlwiKStcItCU0LBcIiwgeWVzX2Fuc3dlcj9cIm5vbmVcIjpcInNlbGVjdGVkX3llc1wiKSxcclxuICAgIGUuY2FsbGJhY2tCdXR0b24oKCF5ZXNfYW5zd2VyP1wi4pyFIFwiOlwiXCIpK1wi0J3QtdGCXCIsICF5ZXNfYW5zd2VyP1wibm9uZVwiOlwic2VsZWN0ZWRfbm9cIilcclxuXSkpO1xyXG5cclxubGV0IGNoZWNrX2xhdGVfc3RhdGUgPSBhc3luYyAoY3R4KT0+e1xyXG4gICAgaWYoIWN0eC5zdGF0ZS5zZXR0aW5ncy5pc19wb2xsX2FjdGl2ZSkge1xyXG4gICAgICAgIGlmIChjdHguc3RhdGUuc3R1ZGVudC5hbnN3ZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGN0eC5yZXBseVdpdGhNYXJrZG93bihyZW5kZXIoXCJzb3JyeV95b3VfcmVfbGF0ZVwiLCB7bm90aWZpZWQ6IGN0eC5zdGF0ZS5zdHVkZW50LnNlbmRfcXVlc3Rpb25zfSksXHJcbiAgICAgICAgICAgICAgICBFeHRyYS5tYXJrdXAoTWFya3VwLmlubGluZUtleWJvYXJkKFtcclxuICAgICAgICAgICAgICAgICAgICBNYXJrdXAuY2FsbGJhY2tCdXR0b24ocmVuZGVyKCdpX3dpbGxfZWF0X2FueXdheV9idXR0b24nKSwgXCJpX3dhbnRfZWF0XCIpXHJcbiAgICAgICAgICAgICAgICBdKSkpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBjdHgucmVwbHlXaXRoTWFya2Rvd24ocmVuZGVyKCdzb3JyeV90aW1lb3V0JyksXHJcbiAgICAgICAgICAgICAgICAoIWN0eC5zdGF0ZS5zdHVkZW50LmFuc3dlcj9FeHRyYS5tYXJrdXAoTWFya3VwLmlubGluZUtleWJvYXJkKFtcclxuICAgICAgICAgICAgICAgICAgICBNYXJrdXAuY2FsbGJhY2tCdXR0b24ocmVuZGVyKCdpX3dpbGxfZWF0X2FueXdheV9idXR0b24nKSwgXCJpX3dhbnRfZWF0XCIpXHJcbiAgICAgICAgICAgICAgICBdKSk6dW5kZWZpbmVkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuYm90LmNvbW1hbmQoJ3N0YXJ0JywgYShhc3luYyAoY3R4KT0+e1xyXG4gICAgbGV0IHN0dWRlbnQgPSBhd2FpdCBnZXRTdHVkZW50KGN0eCk7XHJcbiAgICBpZihzdHVkZW50PT09bnVsbClcclxuICAgICAgICBhd2FpdCBjdHgucmVwbHlXaXRoTWFya2Rvd24oXCLQn9GA0LjQstC10YIsINC+0YLQv9GA0LDQstGMINGB0LLQvtC5INC60L7QtCDQv9GA0LjQs9C70LDRiNC10L3QuNGPLCDRh9GC0L7QsdGLINGPINC30L3QsNC7LCDQutGC0L4g0YLRiy5cIik7XHJcbiAgICBsZXQgc3RfZGF0YSA9IHN0dWRlbnQuZGF0YSgpOyAvL1RPRE8g0JLRi9C00LXQu9C40YLRjCDRjdGC0L4g0LIg0L7RgtC00LXQu9GM0L3Ri9C5IG1pZGRsZXdhcmVcclxuICAgIGF3YWl0IGN0eC5yZXBseShcItCf0YDQuNCy0LXRgiwgXCIrc3RfZGF0YS5uYW1lLmZpcnN0X25hbWUrXCIsINGPINCx0YPQtNGDINC/0YDQuNGB0YvQu9Cw0YLRjCDRgtC10LHQtSDRgdC+0L7QsdGJ0LXQvdC40Y8g0YEg0LLQvtC/0YDQvtGB0L7QvCxcIiArXHJcbiAgICAgICAgXCIg0LHRg9C00LXRiNGMINC70Lgg0YLRiyDQutGD0YjQsNGC0YwsINC60LDQttC00YvQuSDQtNC10L3RjC4g0JXRgdC70Lgg0YMg0YLQtdCx0Y8g0LLQvtC30L3QuNC60L3Rg9GCINGB0LvQvtC20L3QvtGB0YLQuCwg0L/QvtC00L7QudGC0Lgg0Log0YHQstC+0LXQvNGDINC60LvQsNGB0YHQvdC+0LzRgyDRgNGD0LrQvtCy0L7QtNC40YLQtdC70Y4uXCIpO1xyXG59KSk7XHJcbmJvdC5hY3Rpb24oJ2lfZGlkX25vdF9lYXQnLCBhKGFzeW5jKGN0eCk9PntcclxuICAgIGF3YWl0IGN0eC5lZGl0TWVzc2FnZVRleHQocmVuZGVyKFwiYnV0X2lfZGlkX25vdF9lYXRfdG9kYXlcIiksIEV4dHJhLm1hcmtkb3duKCkpXHJcbn0pKTtcclxuYm90LmFjdGlvbihcImlfd2FudF9lYXRcIiwgYShhc3luYyAoY3R4KT0+e1xyXG4gICAgYXdhaXQgY3R4LnN0YXRlLnN0dWRlbnQudXBkYXRlKHtcclxuICAgICAgICBsYXRlX2RheV9zdGFtcDogY3R4LnN0YXRlLmxvY2FsX2RheV9zdGFtcFxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBjdHguZWRpdE1lc3NhZ2VUZXh0KHJlbmRlcihcImlfd2lsbF9lYXRfYW55d2F5X3RleHRcIiksIEV4dHJhLm1hcmtkb3duKCkpO1xyXG59KSk7XHJcbmJvdC5hY3Rpb24oL15zZWxlY3RlZF8oeWVzfG5vKSQvLCBhKGFzeW5jIChjdHgpPT57XHJcbiAgICBpZihjdHguY2FsbGJhY2tRdWVyeS5tZXNzYWdlLm1lc3NhZ2VfaWQgIT09IGN0eC5zdGF0ZS5zdHVkZW50Lmxhc3RfbWVzc2FnZV9pZCl7XHJcbiAgICAgICAgcmV0dXJuIGN0eC5lZGl0TWVzc2FnZVRleHQoJ9Ch0L7QvtCx0YnQtdC90LjQtSDQsdC+0LvRjNGI0LUg0L3QtSDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3Qvi4nKTtcclxuICAgIH1cclxuICAgIGlmKCFjdHguc3RhdGUuc2V0dGluZ3MuaXNfcG9sbF9hY3RpdmUpe1xyXG4gICAgICAgIGlmKGN0eC5zdGF0ZS5zdHVkZW50LmFuc3dlciA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGF3YWl0IGN0eC5lZGl0TWVzc2FnZVRleHQocmVuZGVyKFwic29ycnlfeW91X3JlX2xhdGVcIiksIEV4dHJhLm1hcmt1cCgoZSkgPT4gZS5pbmxpbmVLZXlib2FyZChbXHJcbiAgICAgICAgICAgICAgICBlLmNhbGxiYWNrQnV0dG9uKHJlbmRlcihcImlfd2lsbF9lYXRfYW55d2F5X2J1dHRvblwiKSwgXCJpX3dhbnRfZWF0XCIpXHJcbiAgICAgICAgICAgIF0pKS5tYXJrZG93bigpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBjdHguZWRpdE1lc3NhZ2VUZXh0KHJlbmRlcihcInN0b3BwZWRfcG9sbF9xdWVzdGlvblwiLCB7d2lsbF9lYXQ6IGN0eC5zdGF0ZS5zdHVkZW50LmFuc3dlciwgbWVudTogZ2V0U3R1ZGVudE1lbnUoY3R4KX0pKTtcclxuICAgIH1cclxuICAgIGxldCB5ZXNfYW5zd2VyID0gY3R4Lm1hdGNoWzFdPT09XCJ5ZXNcIjtcclxuICAgIGF3YWl0IGN0eC5zdGF0ZS5zdHVkZW50LnVwZGF0ZSh7XHJcbiAgICAgICAgYW5zd2VyOiB5ZXNfYW5zd2VyXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IGN0eC5lZGl0TWVzc2FnZVRleHQocmVuZGVyKFwiZWRpdGVkX3F1ZXN0aW9uXCIsIHt3aWxsX2VhdDogeWVzX2Fuc3dlciwgbWVudTogZ2V0U3R1ZGVudE1lbnUoY3R4KX0pLFxyXG4gICAgICAgIHF1ZXN0aW9uX2tleWJvYXJkKHllc19hbnN3ZXIpKTtcclxuICAgIGF3YWl0IGN0eC5hbnN3ZXJDYlF1ZXJ5KFwiXCIsIGZhbHNlKVxyXG59KSk7XHJcbmJvdC5oZWxwKGEoKGN0eCk9PntcclxuICAgIHJldHVybiBjdHgucmVwbHlXaXRoTWFya2Rvd24oaGVsbG9fbWVzc2FnZStcIlxcblxcblwiK2NvbW1hbmRfbGlzdCk7XHJcbn0pKTtcclxuYm90LmNvbW1hbmQoJ3NldHRpbmcnLCBlbnRlcignc2V0dGluZ3MnKSk7XHJcbmJvdC5hY3Rpb24oXCJub25lXCIsIGEoYXN5bmMgKGN0eCk9PntcclxuICAgIGF3YWl0IGN0eC5hbnN3ZXJDYlF1ZXJ5KFwiXCIsIGZhbHNlKTtcclxufSkpO1xyXG5ib3Qub24oJ2NhbGxiYWNrX3F1ZXJ5JywgYSgoY3R4KT0+e1xyXG4gICAgcmV0dXJuIGN0eC5hbnN3ZXJDYlF1ZXJ5KFwi0K8g0L3QtSDQt9C90LDRjiwg0YfRgtC+INC00LXQu9Cw0YLRjCDRgSDRjdGC0L7QuSDQutC90L7Qv9C60L7QuVwiKTtcclxufSkpO1xyXG5ib3Qub24oXCJlZGl0ZWRfbWVzc2FnZVwiLCBhKChjdHgpPT57XHJcbiAgICByZXR1cm4gY3R4LnJlcGx5KFwi0JjQt9Cy0LjQvdC4LCDRjyDQvdC1INGD0LzQtdGOINC+0LHRgNCw0LHQsNGC0YvQstCw0YLRjCDQvtGC0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90L3Ri9C1INGB0L7QvtCx0YnQtdC90LjRj1wiKTtcclxufSkpO1xyXG5ib3QuaGVhcnMoL14oPzrQlNCwKT8oPzosICk/KD860YHQtdCz0L7QtNC90Y8gKT8oPzrQryApPyg/OtGF0L7Rh9GDIHzQsdGD0LTRgyApPyg/OtGB0LXQs9C+0LTQvdGPICk/KD860Y8gKT8oKD860LrRg9GI0LDRgtGMfNC60YPRiNCw0Y4pfCg/OtC/0LjRgtCw0YLRjNGB0Y980L/QuNGC0LDRjtGB0YwpfCg/OtC10YHRgtGMfNC10LwpKSg/OiDRgdC10LPQvtC00L3Rjyk/JC9pLFxyXG4gICAgYShhc3luYyAoY3R4KT0+e1xyXG4gICAgICAgIGxldCBpc19kYXlzX3NhbWUgPSBjdHguc3RhdGUuc2V0dGluZ3MuZGF5X3N0YW1wID09PSBjdHguc3RhdGUubG9jYWxfZGF5X3N0YW1wO1xyXG4gICAgICAgIGlmKGlzX2RheXNfc2FtZSAmJiBhd2FpdCBjaGVja19sYXRlX3N0YXRlKGN0eCkpIHJldHVybjtcclxuICAgICAgICBpZihjdHguc3RhdGUuc3R1ZGVudC5hbnN3ZXIgPT09IHRydWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gY3R4LnJlcGx5V2l0aE1hcmtkb3duKHJlbmRlcihcInlvdV9hbHJlYWR5X3dpbGxfZWF0X3RvZGF5XCIpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBhd2FpdCBjdHguc3RhdGUuc3R1ZGVudC51cGRhdGUoe1xyXG4gICAgICAgICAgICBhbnN3ZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGFuc3dlcl9kYXlfc3RhbXA6IGN0eC5zdGF0ZS5sb2NhbF9kYXlfc3RhbXBcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihjdHguc3RhdGUuc3R1ZGVudC5tZXNzYWdlX3NlbmRfZGF5X3N0YW1wID09PSBjdHguc3RhdGUubG9jYWxfZGF5X3N0YW1wKVxyXG4gICAgICAgICAgICBhd2FpdCBib3QudGVsZWdyYW0uZWRpdE1lc3NhZ2VUZXh0KGN0eC5zdGF0ZS5zdHVkZW50LnVzZXJfaWQsIGN0eC5zdGF0ZS5zdHVkZW50Lmxhc3RfbWVzc2FnZV9pZCwgbnVsbCxcclxuICAgICAgICAgICAgICAgIHJlbmRlcihcImVkaXRlZF9xdWVzdGlvblwiLCB7bWVudTogZ2V0U3R1ZGVudE1lbnUoY3R4KSwgd2lsbF9lYXQ6IHRydWV9KSwgcXVlc3Rpb25fa2V5Ym9hcmQodHJ1ZSkpO1xyXG4gICAgICAgIGF3YWl0IGN0eC5yZXBseVdpdGhNYXJrZG93bihyZW5kZXIoXCJva195b3Vfd2lsbF9lYXRfdG9kYXlcIitcclxuICAgICAgICAgICAgKCFpc19kYXlzX3NhbWU/XCJfYnV0X3BvbGxfaXNudF9hY3RpdmVcIjonJykpKTtcclxuICAgIH0pKTtcclxuYm90LmhlYXJzKC9eKD860J3QtdGCKT8oPzosICk/KD86KD88IdC90LUgKdGB0LXQs9C+0LTQvdGPICk/KD860K8gKT8o0L3QtSApKD860YXQvtGH0YMgfNCx0YPQtNGDICk/KD86KD88IdC90LUgKdGB0LXQs9C+0LTQvdGPICk/KD860Y8gKT8oKD860LrRg9GI0LDRgtGMfNC60YPRiNCw0Y4pfCg/OtC/0LjRgtCw0YLRjNGB0Y980L/QuNGC0LDRjtGB0YwpfCg/OtC10YHRgtGMfNC10LwpKSg/OiDRgdC10LPQvtC00L3Rjyk/JC9pLFxyXG4gICAgYShhc3luYyAoY3R4KT0+e1xyXG4gICAgICAgIGxldCBpc19kYXlzX3NhbWUgPSBjdHguc3RhdGUuc2V0dGluZ3MuZGF5X3N0YW1wID09PSBjdHguc3RhdGUubG9jYWxfZGF5X3N0YW1wO1xyXG4gICAgICAgIGlmKGlzX2RheXNfc2FtZSAmJiBhd2FpdCBjaGVja19sYXRlX3N0YXRlKGN0eCkpIHJldHVybjtcclxuICAgICAgICBpZihjdHguc3RhdGUuc3R1ZGVudC5hbnN3ZXIgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGN0eC5yZXBseVdpdGhNYXJrZG93bihyZW5kZXIoXCJ5b3VfYWxyZWFkeV93aWxsX25vdF9lYXRfdG9kYXlcIikpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IGN0eC5zdGF0ZS5zdHVkZW50LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIGFuc3dlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGFuc3dlcl9kYXlfc3RhbXA6IGN0eC5zdGF0ZS5sb2NhbF9kYXlfc3RhbXBcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihjdHguc3RhdGUuc3R1ZGVudC5tZXNzYWdlX3NlbmRfZGF5X3N0YW1wID09PSBjdHguc3RhdGUubG9jYWxfZGF5X3N0YW1wKVxyXG4gICAgICAgICAgICBhd2FpdCBib3QudGVsZWdyYW0uZWRpdE1lc3NhZ2VUZXh0KGN0eC5zdGF0ZS5zdHVkZW50LnVzZXJfaWQsIGN0eC5zdGF0ZS5zdHVkZW50Lmxhc3RfbWVzc2FnZV9pZCwgbnVsbCxcclxuICAgICAgICAgICAgICAgIHJlbmRlcihcImVkaXRlZF9xdWVzdGlvblwiLCB7bWVudTogZ2V0U3R1ZGVudE1lbnUoY3R4KSwgd2lsbF9lYXQ6IGZhbHNlfSksIHF1ZXN0aW9uX2tleWJvYXJkKGZhbHNlKSk7XHJcbiAgICAgICAgYXdhaXQgY3R4LnJlcGx5V2l0aE1hcmtkb3duKHJlbmRlcihcIm9rX3lvdV93aWxsX25vdF9lYXRfdG9kYXlcIitcclxuICAgICAgICAgICAgKCFpc19kYXlzX3NhbWU/XCJfYnV0X3BvbGxfaXNudF9hY3RpdmVcIjonJykpKTtcclxuICAgIH0pKTtcclxuXHJcbmJvdC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnT29vcHMnLCBlcnIpXHJcbn0pO1xyXG5cclxuYm90Lm9uKCd0ZXh0JywgYSgoY3R4KSA9PiB7XHJcbiAgICByZXR1cm4gY3R4LnJlcGx5KHJlbmRlcignaV9kb250X3VuZGVyc3RhbmQnKSk7XHJcbiAgICAvL3JldHVybiBjdHgucmVwbHkoYCR7Y3R4Lm1lc3NhZ2UuZnJvbS51c2VybmFtZX06ICR7Y3R4Lm1lc3NhZ2UudGV4dH1gKVxyXG59KSk7XHJcbmJvdC5vbihcIm1lc3NhZ2VcIiwgYSgoY3R4KT0+e1xyXG4gICAgcmV0dXJuIGN0eC5yZXBseShyZW5kZXIoXCJpX2RvbnRfdW5kZXJzdGFuZF9tZWRpYVwiKSk7XHJcbn0pKTtcclxuLyoqXHJcbiAqIEhUVFAgQ2xvdWQgRnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXEgQ2xvdWQgRnVuY3Rpb24gcmVxdWVzdCBjb250ZXh0LlxyXG4gKiAgICAgICAgICAgICAgICAgICAgIE1vcmUgaW5mbzogaHR0cHM6Ly9leHByZXNzanMuY29tL2VuL2FwaS5odG1sI3JlcVxyXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzIENsb3VkIEZ1bmN0aW9uIHJlc3BvbnNlIGNvbnRleHQuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgTW9yZSBpbmZvOiBodHRwczovL2V4cHJlc3Nqcy5jb20vZW4vYXBpLmh0bWwjcmVzXHJcbiAqL1xyXG5leHBvcnQgbGV0IG1haW5Cb3QgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGxldCByID0gRGF0ZVRpbWUubG9jYWwoKTtcclxuICAgIGNvbnNvbGUubG9nKCdzdGFydGVkJyk7XHJcbiAgICBhd2FpdCBib3QuaGFuZGxlVXBkYXRlKHJlcS5ib2R5LCByZXMpO1xyXG4gICAgY29uc29sZS5sb2coXCJlbmRlZFwiLHItRGF0ZVRpbWUubG9jYWwoKSk7XHJcbn07IiwiaW1wb3J0IFNjZW5lIGZyb20gJ3RlbGVncmFmL3NjZW5lcy9iYXNlJztcclxuaW1wb3J0IFN0YWdlIGZyb20gJ3RlbGVncmFmL3N0YWdlJ1xyXG5pbXBvcnQgTWFya3VwIGZyb20gJ3RlbGVncmFmL21hcmt1cCc7XHJcbmltcG9ydCBzdGFuZGFyZF91c2UgZnJvbSBcIi4uL3N0YW5kYXJkX3VzZVwiO1xyXG5jb25zdCBzZXR0aW5nc1NjZW5lID0gbmV3IFNjZW5lKCdzZXR0aW5ncycpXHJcbmNvbnN0IHtsZWF2ZSwgZW50ZXJ9ID0gU3RhZ2VcclxuLy8gc3RhbmRhcmRfdXNlKHNldHRpbmdzU2NlbmUsIHRydWUpO1xyXG5sZXQgc2V0dGluZ19rZXlib2FyZCA9IChjdHgpPT4gTWFya3VwLmtleWJvYXJkKFtcclxuICAgICghY3R4LnN0YXRlLnN0dWRlbnQuc2VuZF9zdGlja2Vycz9cItCfXCI6XCLQndC1INC/XCIpK1wi0YDQuNGB0YvQu9Cw0Lkg0LzQvdC1INGB0YLQuNC60LXRgNGLXCIsXHJcbiAgICAoIWN0eC5zdGF0ZS5zdHVkZW50LnNlbmRfcXVlc3Rpb25zP1wi0KVcIjpcItCd0LUg0YVcIikrXCLQvtGH0YMg0L/QvtC70YPRh9Cw0YLRjCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPXCIsXHJcbiAgICBcItCX0LDQutGA0YvRgtGMXCJcclxuXSkub25lVGltZSh0cnVlKS5yZXNpemUoKS5leHRyYSgpO1xyXG5zZXR0aW5nc1NjZW5lLmVudGVyKChjdHgpID0+IGN0eC5yZXBseShcItCn0YLQviDQttC1INGC0Ysg0LbQtdC70LDQtdGI0Ywg0YHQtNC10LvQsNGC0Yw/XCIsIHNldHRpbmdfa2V5Ym9hcmQoY3R4KSkpO1xyXG5zZXR0aW5nc1NjZW5lLmxlYXZlKChjdHgpID0+IGN0eC5yZXBseSgn0J3QsNGB0YLRgNC+0LnQutC4INC30LDQutGA0YvRgtGLJywgTWFya3VwLnJlbW92ZUtleWJvYXJkKCkuZXh0cmEoKSkpXHJcbnNldHRpbmdzU2NlbmUuY29tbWFuZCgnYmFjaycsIGxlYXZlKCkpO1xyXG5zZXR0aW5nc1NjZW5lLmhlYXJzKFwi0JfQsNC60YDRi9GC0YxcIiwgbGVhdmUoKSk7XHJcbnNldHRpbmdzU2NlbmUuaGVhcnMoXCLQn9GA0LjRgdGL0LvQsNC5INC80L3QtSDRgdGC0LjQutC10YDRi1wiLCBhc3luYyAoY3R4KT0+e1xyXG4gICAgYXdhaXQgY3R4LnN0YXRlLnN0dWRlbnQudXBkYXRlKHtcclxuICAgICAgICBzZW5kX3N0aWNrZXJzOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIGN0eC5yZXBseShcItCl0L7RgNC+0YjQviwg0YLQtdC/0LXRgNGMINGPINCx0YPQtNGDINC/0YDQuNGB0YvQu9Cw0YLRjCDRgtC10LHQtSDRgdGC0LjQutC10YDRiy5cXG7QnNC+0LbQtdGCINGH0YLQvi3QvdC40LHRg9C00Ywg0LXRidC1P1wiLCBzZXR0aW5nX2tleWJvYXJkKGN0eCkpO1xyXG59KTtcclxuc2V0dGluZ3NTY2VuZS5oZWFycyhcItCd0LUg0L/RgNC40YHRi9C70LDQuSDQvNC90LUg0YHRgtC40LrQtdGA0YtcIiwgYXN5bmMgKGN0eCk9PntcclxuICAgIGF3YWl0IGN0eC5zdGF0ZS5zdHVkZW50LnVwZGF0ZSh7XHJcbiAgICAgICAgc2VuZF9zdGlja2VyczogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2coc2V0dGluZ19rZXlib2FyZChjdHgpKTtcclxuICAgIGNvbnNvbGUubG9nKGF3YWl0IGN0eC5yZXBseShcItCl0L7RgNC+0YjQviwg0YLQtdC/0LXRgNGMINGPINC90LUg0LHRg9C00YMg0L/RgNC40YHRi9C70LDRgtGMINGC0LXQsdC1INGB0YLQuNC60LXRgNGLLlxcbtCc0L7QttC10YIg0YfRgtC+LdC90LjQsdGD0LTRjCDQtdGJ0LU/XCIsIHNldHRpbmdfa2V5Ym9hcmQoY3R4KSkpO1xyXG59KTtcclxuc2V0dGluZ3NTY2VuZS5oZWFycyhcItCd0LUg0YXQvtGH0YMg0L/QvtC70YPRh9Cw0YLRjCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPXCIsIGFzeW5jIChjdHgpPT57XHJcbiAgICBhd2FpdCBjdHguc3RhdGUuc3R1ZGVudC51cGRhdGUoe1xyXG4gICAgICAgIHNlbmRfcXVlc3Rpb25zOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBjdHgucmVwbHlXaXRoTWFya2Rvd24oXCLQpdC+0YDQvtGI0L4sINGC0LXQv9C10YDRjCDRgtC10LHQtSDQv9GA0LjQtNC10YLRgdGPICrRgdCw0LzQvtGB0YLQvtGP0YLQtdC70YzQvdC+KiDRgdC+0L7QsdGJ0LDRgtGMLCDQutC+0LPQtNCwINGC0Ysg0YXQvtGH0LXRiNGMINC60YPRiNCw0YLRjC4gXCIgK1xyXG4gICAgICAgIFwiXFxu0JTQu9GPINGN0YLQvtCz0L4g0L7RgtC/0YDQsNCy0Ywg0LzQvdC1INGB0L7QvtCx0YnQtdC90LjQtSBcXFwiKtCvINCx0YPQtNGDINC60YPRiNCw0YLRjCpcXFwiLlxcbtCc0L7QttC10YIg0YfRgtC+LdC90LjQsdGD0LTRjCDQtdGJ0LU/XCIsIHNldHRpbmdfa2V5Ym9hcmQoY3R4KSk7XHJcbn0pO1xyXG5zZXR0aW5nc1NjZW5lLmhlYXJzKFwi0KXQvtGH0YMg0L/QvtC70YPRh9Cw0YLRjCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPXCIsIGFzeW5jIChjdHgpPT57XHJcbiAgICBhd2FpdCBjdHguc3RhdGUuc3R1ZGVudC51cGRhdGUoe1xyXG4gICAgICAgIHNlbmRfcXVlc3Rpb25zOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIGN0eC5yZXBseShcItCl0L7RgNC+0YjQviwg0YLQtdC/0LXRgNGMINC60LDQttC00YvQuSDQsdGD0LTQvdC40Lkg0LTQtdC90Ywg0Y8g0YLQtdCx0LUg0LHRg9C00YMg0L/RgNC40YHRi9C70LDRgtGMINGB0L7QvtCx0YnQtdC90LjQtSDRgSDQstC+0L/RgNC+0YHQvtC8LlxcbtCc0L7QttC10YIg0YfRgtC+LdC90LjQsdGD0LTRjCDQtdGJ0LU/XCIsIHNldHRpbmdfa2V5Ym9hcmQoY3R4KSk7XHJcbn0pO1xyXG5zZXR0aW5nc1NjZW5lLm9uKCdtZXNzYWdlJywgKGN0eCkgPT4gY3R4LnJlcGx5KCdPbmx5IHRleHQgbWVzc2FnZXMgcGxlYXNlJykpXHJcbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzU2NlbmU7IiwiaW1wb3J0IFN0YWdlIGZyb20gJ3RlbGVncmFmL3N0YWdlJztcclxuaW1wb3J0IHNldHRpbmdzU2NlbmUgZnJvbSBcIi4vc2NlbmVzL3NldHRpbmdTY2VuZVwiO1xyXG5jb25zdCBzdGFnZSA9IG5ldyBTdGFnZShbc2V0dGluZ3NTY2VuZV0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdGFnZTsiLCJpbXBvcnQgc2Vzc2lvbiBmcm9tIFwiLi90ZWxlZ3JhZi1zZXNzaW9uLWZpcmVzdG9yZVwiO1xyXG5pbXBvcnQgY29tbWFuZFBhcnRzIGZyb20gXCJ0ZWxlZ3JhZi1jb21tYW5kLXBhcnRzXCI7XHJcbmltcG9ydCBtZXJnZSBmcm9tIFwibG9kYXNoL21lcmdlXCI7XHJcbmltcG9ydCB7ZGIsIGhlbGxvX21lc3NhZ2UsIGNvbW1hbmRfbGlzdH0gZnJvbSBcIi4vY29tbW9uXCI7XHJcbmltcG9ydCBFeHRyYSBmcm9tICd0ZWxlZ3JhZi9leHRyYSc7XHJcbmltcG9ydCBNYXJrdXAgZnJvbSAndGVsZWdyYWYvbWFya3VwJ1xyXG5pbXBvcnQgdGVsZWdyYWYgZnJvbSAndGVsZWdyYWYnXHJcbmltcG9ydCBzdGFnZSBmcm9tIFwiLi9zdGFnZVwiO1xyXG5pbXBvcnQge2dldERheVN0YW1wQnlEYXRlVGltZX0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHtEYXRlVGltZX0gZnJvbSAnbHV4b24nXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3RlbGVncmFmfSBib3RcclxuICogQHBhcmFtIHtib29sfSBpc19zY2VuZVxyXG4gKi9cclxuaW1wb3J0IHtnZXRTdHVkZW50LCBmaW5kU3R1ZGVudCwgbGlua1RlbGVncmFtU3R1ZGVudFRvU2Vzc2lvbiwgcmVmcmVzaFN0dWRlbnQsIHJlZnJlc2hTZXR0aW5nc30gZnJvbSAnLi9jb21tb24nXHJcbmltcG9ydCB7d3JhcCBhcyBhfSBmcm9tIFwiLi9hc3luY190b19taWRkbGV3YXJlLnRzXCJcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYm90LCBpc19zY2VuZSA9IGZhbHNlKXtcclxuICAgIGJvdC51c2Uoc2Vzc2lvbih7c3RvcmU6IGRifSkpXHJcbiAgICBib3QudXNlKGNvbW1hbmRQYXJ0cygpKTtcclxuICAgIGJvdC51c2UoYShhc3luYyAoY3R4KSA9PiB7XHJcbiAgICAgICAgY3R4LnN0YXRlLnJlZnJlc2hTdHVkZW50ID0gcmVmcmVzaFN0dWRlbnQ7XHJcbiAgICAgICAgbGV0IHN0dWRlbnQgPSBhd2FpdCBjdHguc3RhdGUucmVmcmVzaFN0dWRlbnQoY3R4LCAocyxjdHgpPT4ocy5ib3RfdHlwZT09PSd0ZycgJiYgKCFjdHguZnJvbSB8fCBzLnVzZXJfaWQgPT09IGN0eC5mcm9tLmlkKSkpO1xyXG4gICAgICAgIGN0eC5zdGF0ZS5yZWZyZXNoU2V0dGluZ3MgPSByZWZyZXNoU2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gYXdhaXQgY3R4LnN0YXRlLnJlZnJlc2hTZXR0aW5ncyhjdHgpO1xyXG4gICAgICAgIGN0eC5zdGF0ZS5sb2NhbF9kYXlfc3RhbXAgPSBnZXREYXlTdGFtcEJ5RGF0ZVRpbWUoRGF0ZVRpbWUubG9jYWwoKSk7XHJcbiAgICAgICAgaWYgKHN0dWRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdHguY2FsbGJhY2tRdWVyeSkge1xyXG4gICAgICAgICAgICBpZiAoY3R4LmNhbGxiYWNrUXVlcnkuZGF0YSA9PT0gXCJoZWxwX3dpdGhfaW52aXRhdGlvbl9jb2RlXCIpIHJldHVybiBuZXh0KCk7XHJcbiAgICAgICAgICAgIGF3YWl0IGN0eC5hbnN3ZXJDYlF1ZXJ5KCfQlNC70Y8g0L3QsNGH0LDQu9CwINC90YPQttC90L4g0L7RgtC/0YDQsNCy0LjRgtGMINGB0LLQvtC5INC60L7QtCDQv9GA0LjQs9C70LDRiNC10L3QuNGPJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy9yZXR1cm4gbmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3R4LnVwZGF0ZVR5cGUgPT09IFwiZWRpdGVkX21lc3NhZ2VcIikgcmV0dXJuO1xyXG4gICAgICAgIGxldCBleHRyYV9pbmZvID0gRXh0cmEubWFya3VwKChlKSA9PiBlLmlubGluZUtleWJvYXJkKFtcclxuICAgICAgICAgICAgZS5jYWxsYmFja0J1dHRvbign0KMg0LzQtdC90Y8g0L3QtdGCINC60L7QtNCwINC/0YDQuNCz0LvQsNGI0LXQvdC40Y8nLCAnaGVscF93aXRoX2ludml0YXRpb25fY29kZScpXHJcbiAgICAgICAgXSkpO1xyXG4gICAgICAgIGlmIChjdHgubWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAoY3R4LnN0YXRlLmNvbW1hbmQgJiYgY3R4LnN0YXRlLmNvbW1hbmQuY29tbWFuZCA9PT0gXCJzdGFydFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3R4LnN0YXRlLmNvbW1hbmQuYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdCA9IGF3YWl0IGZpbmRTdHVkZW50KGN0eC5zdGF0ZS5jb21tYW5kLnNwbGl0QXJnc1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGN0eC5yZXBseVdpdGhNYXJrZG93bihoZWxsb19tZXNzYWdlICsgXCJcXG5cXG4q0KHRgtGA0LDQvdC90L4sINGPINC90LUg0YHQvNC+0LMg0L3QsNC50YLQuCDRgtCy0L7QuSDQutC+0LQg0L/RgNC40LPQu9Cw0YjQtdC90LjRjy5cXG7QntCx0YDQsNGC0LjRgdGMINC6INGB0LLQvtC10LzRgyDQutC70LDRgdGB0L3QvtC80YMg0YDRg9C60L7QstC+0LTQuNGC0LXQu9GOLipcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBsaW5rVGVsZWdyYW1TdHVkZW50VG9TZXNzaW9uKGN0eCwgY3R4Lm1lc3NhZ2UuY2hhdC5pZCwgc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHVkZW50ID0gc3QuZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGN0eC5yZXBseVdpdGhNYXJrZG93bihoZWxsb19tZXNzYWdlICsgXCJcXG5cXG4q0JLRgdC1INCz0L7RgtC+0LLQviDQtNC70Y8g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8uKlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIq0KLQstC+0LUg0LjQvNGPOiogXCIgKyBzdHVkZW50Lm5hbWUubGFzdF9uYW1lICsgJyAnICsgc3R1ZGVudC5uYW1lLmZpcnN0X25hbWUgKyBcIlxcblxcblwiICsgY29tbWFuZF9saXN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBjdHgucmVwbHlXaXRoTWFya2Rvd24oaGVsbG9fbWVzc2FnZSArIFwiXFxuXFxuKtCe0YLQv9GA0LDQstGMINGB0LLQvtC5INC60L7QtCDQv9GA0LjQs9C70LDRiNC10L3QuNGPLCDRh9GC0L7QsdGLINGPINC30L3QsNC7LCDQutGC0L4g0LbQtSDRgtGLINGC0LDQutC+0LkuKlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWN0eC5zdGF0ZS5jb21tYW5kICYmIGN0eC5tZXNzYWdlLnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdCA9IGF3YWl0IGZpbmRTdHVkZW50KGN0eC5tZXNzYWdlLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY3R4LnJlcGx5V2l0aE1hcmtkb3duKFwiKtCd0LUg0LzQvtCz0YMg0L3QsNC50YLQuCDRgtCw0LrQvtC5INC60L7QtCDQv9GA0LjQs9C70LDRiNC10L3QuNGPLi4uKlxcblxcbtCf0YDQvtCy0LXRgNGMINC10LPQviDQvdCwINC+0YjQuNCx0LrQuCBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwi0LjQu9C4INC+0LHRgNCw0YLQuNGB0Ywg0Log0YHQstC+0LXQvNGDINC60LvQsNGB0YHQvdC+0LzRgyDRgNGD0LrQvtCy0L7QtNC40YLQtdC70Y4uXCIsIGV4dHJhX2luZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGF3YWl0IGxpbmtUZWxlZ3JhbVN0dWRlbnRUb1Nlc3Npb24oY3R4LCBjdHgubWVzc2FnZS5jaGF0LmlkLCBzdCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3R1ZGVudCA9IHN0LmRhdGEoKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IGN0eC5yZXBseVdpdGhNYXJrZG93bihcItCe0YLQu9C40YfQvdC+ISDwn6WzXFxu0KLQtdC/0LXRgNGMINGPINC30L3QsNGOLCDRh9GC0L4g0YLRiyDigJQgXCIgKyBzdHVkZW50Lm5hbWUubGFzdF9uYW1lICsgJyAnICsgc3R1ZGVudC5uYW1lLmZpcnN0X25hbWUgKyAnLlxcbicgK1xyXG4gICAgICAgICAgICAgICAgICAgICfQktGB0LUg0LPQvtGC0L7QstC+LCDQvdC1INC/0YDQvtC/0YPRgdC60LDQuSDQvNC+0Lgg0YHQvtC+0LHRidC10L3QuNGPLicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IGN0eC5yZXBseVdpdGhNYXJrZG93bihcItCf0YDQtdC20LTQtSDRh9C10Lwg0LLRi9C/0L7Qu9C90Y/RgtGMINC60L7QvNCw0L3QtNGLLCDQvNC90LUg0L3Rg9C20L3QviDQt9C90LDRgtGMLCDQutGC0L4g0YLRiy4gXCIgK1xyXG4gICAgICAgICAgICBcItCU0LvRjyDRjdGC0L7Qs9C+INC+0YLQv9GA0LDQstGMINC80L3QtSDRgdCy0L7QuSDQutC+0LQg0L/RgNC40LPQu9Cw0YjQtdC90LjRjy5cIiwgZXh0cmFfaW5mbyk7XHJcbiAgICAgICAgLy9uZXh0KCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYm90LmFjdGlvbignaGVscF93aXRoX2ludml0YXRpb25fY29kZScsIGEoKGN0eCkgPT4ge1xyXG4gICAgICAgIGN0eC5lZGl0TWVzc2FnZVJlcGx5TWFya3VwKE1hcmt1cC5pbmxpbmVLZXlib2FyZChcclxuICAgICAgICAgICAgW11cclxuICAgICAgICApKTtcclxuICAgICAgICBjdHgucmVwbHlXaXRoTWFya2Rvd24oXCLQmtC+0LQg0L/RgNC40LPQu9Cw0YjQtdC90LjRjyDQvNC+0LbQvdC+INGD0LfQvdCw0YLRjCDRgyDRgdCy0L7QtdCz0L4g0LrQu9Cw0YHRgdC90L7Qs9C+INGA0YPQutC+0LLQvtC00LjRgtC10LvRjy4gXCIgK1xyXG4gICAgICAgICAgICBcItCe0L0g0LLRi9Cz0LvRj9C00LjRgiDQutCw0Log0LTQstCwINCw0L3Qs9C70LjQudGB0LrQuNGFINGB0LvQvtCy0LAg0Lgg0YfQuNGB0LvQvi4g0J7QvdC4INGA0LDQt9C00LXQu9C10L3RiyDRgSDQv9C+0LzQvtGJ0YzRjiDQtNC10YTQuNGB0LAuXFxu0J3QsNC/0YDQuNC80LXRgCwg0LLQvtGCINC60LDQuiDQvtC9INC80L7QttC10YIg0LLRi9Cz0LvRj9C00LXRgtGMOiB0ZXN0LWNvZGUtNzJcIik7XHJcbiAgICB9KSlcclxuXHJcblxyXG5cclxuXHJcbiAgICBpZighaXNfc2NlbmUpIGJvdC51c2Uoc3RhZ2UubWlkZGxld2FyZSgpKTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRzKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgcHJvcGVydHk6ICdzZXNzaW9uJyxcclxuICAgICAgICBzdG9yZTogbnVsbCxcclxuICAgICAgICBnZXRTZXNzaW9uS2V5OiAoY3R4KSA9PiBjdHguZnJvbSAmJiBjdHguY2hhdCAmJiBgJHtjdHguZnJvbS5pZH06JHtjdHguY2hhdC5pZH1gXHJcbiAgICB9LCBvcHRzKVxyXG4gICAgaWYgKCFvcHRpb25zLnN0b3JlKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCLQkdCw0LfQsCDQvdC1INGD0LrQsNC30LDQvdCwXCIpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHRsTXMgPSBvcHRpb25zLnR0bCAmJiBvcHRpb25zLnR0bCAqIDEwMDBcclxuXHJcbiAgICByZXR1cm4gKGN0eCwgbmV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IG9wdGlvbnMuZ2V0U2Vzc2lvbktleShjdHgpXHJcbiAgICAgICAgaWYgKCFrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5leHQoY3R4KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAgIGxldCBkb2NSZWYgPSBvcHRpb25zLnN0b3JlLmNvbGxlY3Rpb24oJ3Nlc3Npb25zJykuZG9jKGtleSk7XHJcbiAgICAgICAgcmV0dXJuIGRvY1JlZi5nZXQoKVxyXG4gICAgICAgICAgICAudGhlbigoZG9jKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2Vzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRvYy5leGlzdHMgfHwgKGRvYy5kYXRhKCkuZXhwaXJlcyAhPSBudWxsICYmIGRvYy5kYXRhKCkuZXhwaXJlcyA+PSBub3cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbiA9IHt9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24gPSBkb2MuZGF0YSgpLnNlc3Npb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBvcHRpb25zLnByb3BlcnR5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uID0gT2JqZWN0LmFzc2lnbih7fSwgbmV3VmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KGN0eCkudGhlbigoKSA9PiBvcHRpb25zLnN0b3JlLmNvbGxlY3Rpb24oJ3Nlc3Npb25zJykuZG9jKGtleSkuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyZXM6IHR0bE1zID8gbm93ICsgdHRsTXMgOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdGVsZWdyYWYgZnJvbSBcInRlbGVncmFmXCI7XHJcblxyXG5sZXQgYm90ID0gbmV3IHRlbGVncmFmKHByb2Nlc3MuZW52LmJvdGFwaSwge1xyXG4gICAgdGVsZWdyYW06IHtcclxuICAgICAgICB3ZWJob29rUmVwbHk6IGZhbHNlXHJcbiAgICB9LFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgYm90OyIsImltcG9ydCB7RGF0ZVRpbWV9IGZyb20gXCJsdXhvblwiO1xyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHllYXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXlcclxuICogQHJldHVybnMge251bWJlcn0gZGF5c3RhbXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlTdGFtcCh5ZWFyLCBtb250aCwgZGF5KSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChEYXRlVGltZS5sb2NhbCgpLnNldCh7eWVhciwgbW9udGgsIGRheX0pLnN0YXJ0T2YoJ2RheScpLnRvU2Vjb25kcygpIC8gKDYwICogNjAgKiAyNCkpO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtEYXRlVGltZX0gdGltZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERheVN0YW1wQnlEYXRlVGltZSh0aW1lKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh0aW1lLnN0YXJ0T2YoJ2RheScpLnRvU2Vjb25kcygpIC8gKDYwICogNjAgKiAyNCkpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBkdXJhdGlvblxyXG4gKiBAcGFyYW0gc3RhcnRfZnJvbVxyXG4gKiBAcmV0dXJucyB7RGF0ZVRpbWV9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZUJ5RHVyYXRpb24oZHVyYXRpb24sIHN0YXJ0X2Zyb20sKXtcclxuICAgIHN0YXJ0X2Zyb20gPSBzdGFydF9mcm9tIHx8IERhdGVUaW1lLmxvY2FsKCkuc3RhcnRPZignZGF5Jyk7XHJcbiAgICByZXR1cm4gc3RhcnRfZnJvbS5wbHVzKGR1cmF0aW9uKTtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBkMVxyXG4gKiBAcGFyYW0gZDJcclxuICogQHBhcmFtIHN0YXJ0X2Zyb21cclxuICogQHJldHVybnMge0ludGVydmFsfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEludGVydmFsQnlEdXJhdGlvbnMoZDEsZDIsc3RhcnRfZnJvbSl7XHJcbiAgICBzdGFydF9mcm9tID0gc3RhcnRfZnJvbSB8fCBEYXRlVGltZS5sb2NhbCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgcmV0dXJuIEludGVydmFsLmZyb21EYXRlVGltZXMoc3RhcnRfZnJvbS5wbHVzKGQxKSwgc3RhcnRfZnJvbS5wbHVzKGQyKSk7XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaXJlc3RvcmVTdG9yYWdle1xyXG4gICAgY29uc3RydWN0b3Iob3B0cyl7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ3Nlc3Npb25fdmsnLFxyXG4gICAgICAgICAgICBzdG9yZTogbnVsbFxyXG4gICAgICAgIH0sIG9wdHMpXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLnN0b3JlKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwi0JHQsNC30LAg0L3QtSDRg9C60LDQt9Cw0L3QsFwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JlID0gb3B0aW9ucy5zdG9yZTtcclxuICAgICAgICB0aGlzLnByb3BlcnR5ID0gb3B0aW9ucy5wcm9wZXJ0eTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXQoa2V5KXtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5zdG9yZS5jb2xsZWN0aW9uKHRoaXMucHJvcGVydHkpLmRvYyhrZXkpLmdldCgpO1xyXG4gICAgICAgIGlmICghcmVzLmV4aXN0cykgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gcmVzLmRhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzZXQoa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgZGVsZXRlIHZhbHVlWyckZm9yY2VVcGRhdGUnXTtcclxuICAgICAgICBhd2FpdCB0aGlzLnN0b3JlLmNvbGxlY3Rpb24odGhpcy5wcm9wZXJ0eSkuZG9jKGtleSkuc2V0KHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkZWxldGUoa2V5KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5jb2xsZWN0aW9uKHRoaXMucHJvcGVydHkpLmRvYyhrZXkpLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXHJcbiAgICBhc3luYyB0b3VjaCgpe1xyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7VkssIEtleWJvYXJkLCBBUElFcnJvcn0gZnJvbSAndmstaW8nO1xyXG5cclxuaW1wb3J0IHsgU2Vzc2lvbk1hbmFnZXIgfSBmcm9tICdAdmstaW8vc2Vzc2lvbic7XHJcbmltcG9ydCBGaXJlc3RvcmVTdG9yYWdlIGZyb20gXCIuL3ZrLWlvLXNlc3Npb24tc3RvcmFnZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgY29tbWFuZF9saXN0LFxyXG4gICAgZGIsXHJcbiAgICBnZXRDb21waWxlRnVuY3Rpb24sIGdldFN0dWRlbnRNZW51LFxyXG4gICAgaGVsbG9fbWVzc2FnZSxcclxuICAgIGxpbmtUZWxlZ3JhbVN0dWRlbnRUb1Nlc3Npb24sXHJcbiAgICBsaW5rVmtTdHVkZW50VG9TZXNzaW9uLCBtZXNzYWdlcywgdW5saW5rU3R1ZGVudEluU2Vzc2lvbixcclxuICAgIHJlZnJlc2hTdHVkZW50LCByZWZyZXNoU2V0dGluZ3NcclxufSBmcm9tIFwiLi9jb21tb25cIjtcclxuaW1wb3J0IFNjZW5lTWFuYWdlciwge1N0ZXBTY2VuZX0gZnJvbSBcIkB2ay1pby9zY2VuZXNcIjtcclxuaW1wb3J0IG1lcmdlIGZyb20gXCJsb2Rhc2gvbWVyZ2VcIjtcclxuaW1wb3J0IHtnZXREYXlTdGFtcEJ5RGF0ZVRpbWV9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7RGF0ZVRpbWV9IGZyb20gXCJsdXhvblwiO1xyXG5pbXBvcnQge2dldFN0dWRlbnQsIGZpbmRTdHVkZW50fSBmcm9tIFwiLi9jb21tb25cIjtcclxuaW1wb3J0IHZrIGZyb20gXCIuL3ZrX2luc3RhbmNlXCI7XHJcbmNvbnN0IGhlYXJDb21tYW5kID0gKG5hbWUsIGNvbmRpdGlvbnMsIGhhbmRsZSkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBoYW5kbGUgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBoYW5kbGUgPSBjb25kaXRpb25zO1xyXG4gICAgICAgIGNvbmRpdGlvbnMgPSBbYC8ke25hbWV9YF07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbmRpdGlvbnMpKSB7XHJcbiAgICAgICAgY29uZGl0aW9ucyA9IFtjb25kaXRpb25zXTtcclxuICAgIH1cclxuXHJcbiAgICBib3QuaGVhcihcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICh0ZXh0LCB7IHN0YXRlIH0pID0+IChcclxuICAgICAgICAgICAgICAgIHN0YXRlLmNvbW1hbmQgPT09IG5hbWVcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgLi4uY29uZGl0aW9uc1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgaGFuZGxlXHJcbiAgICApO1xyXG59O1xyXG5cclxubGV0IHN0b3JhZ2UgPSBuZXcgRmlyZXN0b3JlU3RvcmFnZSh7XHJcbiAgICBzdG9yZTogZGJcclxufSk7XHJcblxyXG5sZXQgc2Vzc2lvbl9tYW5hZ2VyID0gbmV3IFNlc3Npb25NYW5hZ2VyKHtcclxuICAgIHN0b3JhZ2UsXHJcbiAgICBnZXRTdG9yYWdlS2V5KGNvbnRleHQpIHtcclxuICAgICAgICBsZXQgaWQgPSBjb250ZXh0LnNlbmRlcklkIHx8IGNvbnRleHQudXNlcklkO1xyXG4gICAgICAgIHJldHVybiBTdHJpbmcoaWQpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNvbnN0IHNjZW5lTWFuYWdlciA9IG5ldyBTY2VuZU1hbmFnZXIoKTtcclxuXHJcbmNvbnN0IHJlbmRlciA9IGdldENvbXBpbGVGdW5jdGlvbigndmsnKTtcclxuXHJcbnNjZW5lTWFuYWdlci5hZGRTY2VuZShuZXcgU3RlcFNjZW5lKFwic2V0dGluZ3NcIiwgW1xyXG4gICAgYXN5bmMgKGNvbnRleHQpID0+IHtcclxuICAgICAgICBsZXQga2V5Ym9hcmQgPSAoKT0+S2V5Ym9hcmQuYnVpbGRlcigpLnRleHRCdXR0b24oe1xyXG4gICAgICAgICAgICBsYWJlbDogcmVuZGVyKFwic2VuZF9xdWVzdGlvbnNfYnV0dG9uXCIsIHtzZW5kOiAhY29udGV4dC5zdGF0ZS5zdHVkZW50LnNlbmRfcXVlc3Rpb25zfSksXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IChjb250ZXh0LnN0YXRlLnN0dWRlbnQuc2VuZF9xdWVzdGlvbnM/XCJkb250X1wiOlwiXCIpK1wic2VuZF9xdWVzdGlvbnNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29sb3I6IEtleWJvYXJkLlBSSU1BUllfQ09MT1JcclxuICAgICAgICB9KS5yb3coKS50ZXh0QnV0dG9uKHtcclxuICAgICAgICAgICAgbGFiZWw6IFwi0JfQsNC60YDRi9GC0Ywg0L3QsNGB0YLRgNC+0LnQutC4XCIsXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdjYW5jZWxfYWN0aW9uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoY29udGV4dC5zY2VuZS5zdGVwLmZpcnN0VGltZSl7XHJcbiAgICAgICAgICAgIGNvbnRleHQuc2VuZChyZW5kZXIoXCJzZXR0aW5nc19maXJzdF9tZXNzYWdlXCIpLCB7a2V5Ym9hcmQ6IGtleWJvYXJkKCl9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2goY29udGV4dC5zdGF0ZS5jb21tYW5kKXtcclxuICAgICAgICAgICAgY2FzZSBcImRvbnRfc2VuZF9xdWVzdGlvbnNcIjpcclxuICAgICAgICAgICAgICAgIGF3YWl0IGNvbnRleHQuc3RhdGUuc3R1ZGVudC51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRfcXVlc3Rpb25zOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNlbmQocmVuZGVyKFwiZG9udF9zZW5kX3F1ZXN0aW9uc19hbnN3ZXJcIiksIHtrZXlib2FyZDoga2V5Ym9hcmQoKX0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzZW5kX3F1ZXN0aW9uc1wiOlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgY29udGV4dC5zdGF0ZS5zdHVkZW50LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZF9xdWVzdGlvbnM6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zZW5kKHJlbmRlcihcInNlbmRfcXVlc3Rpb25zX2Fuc3dlclwiKSwge2tleWJvYXJkOiBrZXlib2FyZCgpfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNhbmNlbF9hY3Rpb25cIjpcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc2VuZChyZW5kZXIoJ3NldHRpbmdzX2Nsb3NlZCcpLCB7a2V5Ym9hcmQ6IEtleWJvYXJkLmJ1aWxkZXIoKX0pO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgY29udGV4dC5zY2VuZS5sZWF2ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNlbmQocmVuZGVyKFwic2V0dGluZ3NfZmlyc3RfbWVzc2FnZVwiKSwge2tleWJvYXJkOiBrZXlib2FyZCgpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dKSk7XHJcbmxldCBib3QgPSB2ay51cGRhdGVzO1xyXG5ib3QudXNlKGFzeW5jIChjb250ZXh0LCBuZXh0KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IG5leHQoKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignSGFuZGxlIHdlYmhvb2sgdXBkYXRlIGVycm9yOiAnLCBlcnJvcik7XHJcbiAgICB9XHJcbn0pO1xyXG5ib3QudXNlKGFzeW5jIChjb250ZXh0LCBuZXh0KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IG5leHQoKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gYWNjZXNzIGluIHRoZSBjaGF0IChodHRwczovL3ZrLmNvbS9kZXYvbWVzc2FnZXMuZ2V0Q29udmVyc2F0aW9uc0J5SWQpXHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQVBJRXJyb3IgJiYgZXJyb3IuY29kZSA9PT0gOTE3KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLQndC10YIg0YDQsNC30YDQtdGI0LXQvdC40Y8g0L3QsCDQvtGC0L/RgNCw0LLQutGDINGB0L7QvtCx0YnQtdC90LjQuVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNvbnRleHQuaXMoJ21lc3NhZ2UnKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbn0pO1xyXG5ib3QudXNlKHNlc3Npb25fbWFuYWdlci5taWRkbGV3YXJlKTtcclxuYm90LnVzZSgoY29udGV4dCwgbmV4dCkgPT4ge1xyXG4gICAgaWYoIWNvbnRleHQuaXMoJ21lc3NhZ2UnKSkgcmV0dXJuIG5leHQoKTtcclxuICAgIGNvbnN0IHsgbWVzc2FnZVBheWxvYWQgfSA9IGNvbnRleHQ7XHJcblxyXG4gICAgY29udGV4dC5zdGF0ZS5jb21tYW5kID0gbWVzc2FnZVBheWxvYWQgJiYgbWVzc2FnZVBheWxvYWQuY29tbWFuZFxyXG4gICAgICAgID8gbWVzc2FnZVBheWxvYWQuY29tbWFuZFxyXG4gICAgICAgIDogbnVsbDtcclxuXHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59KTtcclxuYm90LnVzZShhc3luYyAoY3R4LCBuZXh0KT0+e1xyXG4gICAgaWYoIWN0eC5pcygnbWVzc2FnZScpKSByZXR1cm4gbmV4dCgpO1xyXG4gICAgY3R4LnN0YXRlLnJlZnJlc2hTdHVkZW50ID0gcmVmcmVzaFN0dWRlbnQ7XHJcbiAgICBsZXQgc3R1ZGVudCA9IGF3YWl0IGN0eC5zdGF0ZS5yZWZyZXNoU3R1ZGVudChjdHgsIChzLCBjdHgpPT4ocy5ib3RfdHlwZT09PSd2aycgJiYgY3R4LnNlbmRlcklkID09PSBzLnVzZXJfaWQpKTtcclxuICAgIGN0eC5zdGF0ZS5yZWZyZXNoU2V0dGluZ3MgPSByZWZyZXNoU2V0dGluZ3M7XHJcbiAgICBsZXQgc2V0dGluZ3MgPSBhd2FpdCBjdHguc3RhdGUucmVmcmVzaFNldHRpbmdzKGN0eCk7XHJcbiAgICBjdHguc3RhdGUubG9jYWxfZGF5X3N0YW1wID0gZ2V0RGF5U3RhbXBCeURhdGVUaW1lKERhdGVUaW1lLmxvY2FsKCkpO1xyXG4gICAgaWYgKHN0dWRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbmV4dCgpO1xyXG4gICAgfVxyXG4gICAgaWYoY3R4Lmhhc1RleHQpe1xyXG4gICAgICAgIGlmIChjdHguc3RhdGUuY29tbWFuZCkge1xyXG4gICAgICAgICAgICBpZiAoY3R4LnN0YXRlLmNvbW1hbmQgPT09IFwic3RhcnRcIikge1xyXG4gICAgICAgICAgICAgICAgY3R4LnNlbmQocmVuZGVyKCdzdGFydF9ib3Rfd2l0aG91dF9jb2RlJykpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGN0eC5zdGF0ZS5jb21tYW5kID09PSBcImhlbHBfd2l0aF9pbnZpdGF0aW9uX2NvZGVcIil7XHJcbiAgICAgICAgICAgICAgICBjdHguc2VuZChyZW5kZXIoJ2hlbHBfd2l0aF9pbnZpdGF0aW9uX2NvZGUnKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0ID0gYXdhaXQgZmluZFN0dWRlbnQoY3R4LnRleHQpO1xyXG4gICAgICAgIGlmIChzdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjdHguc2VuZChyZW5kZXIoJ2NvZGVfbm90X2ZvdW5kJyksIHtcclxuICAgICAgICAgICAgICAgIGtleWJvYXJkOiBLZXlib2FyZC5idWlsZGVyKCkudGV4dEJ1dHRvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHJlbmRlcignaGVscF93aXRoX2ludml0YXRpb25fY29kZV9idXR0b25fbGFiZWwnKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdoZWxwX3dpdGhfaW52aXRhdGlvbl9jb2RlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IEtleWJvYXJkLlNFQ09OREFSWV9DT0xPUlxyXG4gICAgICAgICAgICAgICAgfSkuaW5saW5lKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgbGlua1ZrU3R1ZGVudFRvU2Vzc2lvbihjdHgsIGN0eC5zZW5kZXJJZCwgc3QpO1xyXG4gICAgICAgIGxldCBzdHVkZW50ID0gc3QuZGF0YSgpO1xyXG4gICAgICAgIGN0eC5zZW5kKHJlbmRlcignc3VjY2Vzc19jb2RlJywge1xyXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiBzdHVkZW50Lm5hbWUuZmlyc3RfbmFtZSxcclxuICAgICAgICAgICAgbGFzdF9uYW1lOiBzdHVkZW50Lm5hbWUubGFzdF9uYW1lXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxufSlcclxuYm90Lm9uKFwibWVzc2FnZV91bnN1YnNjcmliZVwiLCBhc3luYyAoY3R4KT0+e1xyXG4gICAgbGV0IHIgPSBhd2FpdCByZWZyZXNoU3R1ZGVudChjdHgpO1xyXG4gICAgaWYoIXIpIHJldHVybjtcclxuICAgIGF3YWl0IHVubGlua1N0dWRlbnRJblNlc3Npb24oY3R4LCBjdHguc3RhdGUuc3R1ZGVudFJlZik7XHJcbiAgICBjdHguc2Vzc2lvbiA9IHt9O1xyXG59KTtcclxuYm90Lm9uKFwibWVzc2FnZV9zdWJzY3JpYmVcIiwgYXN5bmMoY3R4KT0+e1xyXG4gICAgcmV0dXJuIHZrLmFwaS5tZXNzYWdlcy5zZW5kKHtcclxuICAgICAgICB1c2VyX2lkOiBjdHgudXNlcklkLFxyXG4gICAgICAgIG1lc3NhZ2U6IHJlbmRlcignc3RhcnRfYm90X3dpdGhvdXRfY29kZScpXHJcbiAgICB9KTtcclxufSlcclxuYm90LnVzZShzY2VuZU1hbmFnZXIubWlkZGxld2FyZSk7XHJcbmJvdC51c2UoKGNvbnRleHQsIG5leHQpID0+IHtcclxuICAgIGlmICghY29udGV4dC5zY2VuZS5jdXJyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zdCBjYW5jZWwgPSAgY29udGV4dC5tZXNzYWdlUGF5bG9hZCAmJiBjb250ZXh0Lm1lc3NhZ2VQYXlsb2FkLmNvbW1hbmQgPT09ICdjYW5jZWwnO1xyXG4gICAgY29uc3QgY2FuY2VsID0gY29udGV4dC5oYXNUZXh0ICYmIGNvbnRleHQudGV4dCA9PT0gJy9jYW5jZWwnO1xyXG4gICAgaWYgKGNhbmNlbCkge1xyXG4gICAgICAgIGNvbnRleHQuc2VuZChcItCf0YDQuNC90YPQtNC40YLQtdC70YzQvdCw0Y8g0L7RgtC80LXQvdCwLlwiKVxyXG4gICAgICAgIHJldHVybiBjb250ZXh0LnNjZW5lLmxlYXZlKHtcclxuICAgICAgICAgICAgY2FuY2VsZWQ6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29udGV4dC5zY2VuZS5yZWVudGVyKCk7XHJcbn0pO1xyXG5cclxuYm90LmhlYXIoXCLQndCw0YHRgtGA0L7QudC60LhcIiwgKGNvbnRleHQpPT57XHJcbiAgICBjb250ZXh0LnNjZW5lLmVudGVyKCdzZXR0aW5ncycpO1xyXG59KTtcclxuYm90LmhlYXIoJ3NlbmQnLCBhc3luYyAoY29udGV4dCkgPT4ge1xyXG4gICAgbGV0IG1lc3NhZ2UgPSBhd2FpdCB2ay5hcGkubWVzc2FnZXMuc2VuZCh7XHJcbiAgICAgICAgdXNlcl9pZDogY29udGV4dC5zdGF0ZS5zdHVkZW50LnVzZXJfaWQsXHJcbiAgICAgICAgbWVzc2FnZTogcmVuZGVyKCdxdWVzdGlvbicsIHttZW51OiBnZXRTdHVkZW50TWVudShjb250ZXh0KX0pLFxyXG4gICAgICAgIGtleWJvYXJkOiBLZXlib2FyZC5idWlsZGVyKCkudGV4dEJ1dHRvbih7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcItCU0LBcIixcclxuICAgICAgICAgICAgY29sb3I6IEtleWJvYXJkLlBPU0lUSVZFX0NPTE9SLFxyXG4gICAgICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnc2VsZWN0ZWRfeWVzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGV4dEJ1dHRvbih7XHJcbiAgICAgICAgICAgIGxhYmVsOlwi0J3QtdGCXCIsXHJcbiAgICAgICAgICAgICBjb2xvcjogS2V5Ym9hcmQuTkVHQVRJVkVfQ09MT1IsXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwic2VsZWN0ZWRfbm9cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkub25lVGltZSgpXHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuICAgIGF3YWl0IGNvbnRleHQuc3RhdGUuc3R1ZGVudC51cGRhdGUoe1xyXG4gICAgICAgIGxhc3RfbWVzc2FnZV9pZDogbWVzc2FnZSxcclxuICAgICAgICBhbnN3ZXI6IG51bGwsXHJcbiAgICAgICAgYW5zd2VyX2RheV9zdGFtcDogY29udGV4dC5zdGF0ZS5sb2NhbF9kYXlfc3RhbXBcclxuICAgIH0pXHJcbn0pO1xyXG5ib3QuaGVhcihbXHJcbiAgICAvXig/OtCU0LApPyg/OiwgKT8oPzrRgdC10LPQvtC00L3RjyApPyg/OtCvICk/KD860YXQvtGH0YMgfNCx0YPQtNGDICk/KD860YHQtdCz0L7QtNC90Y8gKT8oPzrRjyApPygoPzrQutGD0YjQsNGC0Yx80LrRg9GI0LDRjil8KD860L/QuNGC0LDRgtGM0YHRj3zQv9C40YLQsNGO0YHRjCl8KD860LXRgdGC0Yx80LXQvCkpKD86INGB0LXQs9C+0LTQvdGPKT8kL2ksXHJcbiAgICAodGV4dCwge3N0YXRlfSk9PihzdGF0ZS5jb21tYW5kPT09J3NlbGVjdGVkX3llcycpXHJcbl0sIGFzeW5jIGNvbnRleHQgPT4ge1xyXG4gICAgbGV0IHVwZGF0ZSA9IGFzeW5jKCk9PntcclxuICAgICAgICBpZihjb250ZXh0LnN0YXRlLnN0dWRlbnQuYW5zd2VyID09PSB0cnVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGNvbnRleHQuc2VuZChyZW5kZXIoXCJ5b3VfYWxyZWFkeV93aWxsX2VhdF90b2RheVwiKSwge1xyXG4gICAgICAgICAgICAgICAga2V5Ym9hcmQ6IEtleWJvYXJkLmJ1aWxkZXIoKS50ZXh0QnV0dG9uKHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogcmVuZGVyKFwiaV9kb250X3dhbnRfZWF0X2J1dHRvblwiKSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogS2V5Ym9hcmQuTkVHQVRJVkVfQ09MT1JcclxuICAgICAgICAgICAgICAgIH0pLm9uZVRpbWUoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb250ZXh0LnN0YXRlLnN0dWRlbnQubWVzc2FnZV9zZW5kX2RheV9zdGFtcCA9PT0gY29udGV4dC5zdGF0ZS5sb2NhbF9kYXlfc3RhbXApXHJcbiAgICAgICAgICAgIGF3YWl0IHZrLmFwaS5tZXNzYWdlcy5lZGl0KHtcclxuICAgICAgICAgICAgICAgIHBlZXJfaWQ6IGNvbnRleHQuc3RhdGUuc3R1ZGVudC51c2VyX2lkLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZV9pZDogY29udGV4dC5zdGF0ZS5zdHVkZW50Lmxhc3RfbWVzc2FnZV9pZCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlbmRlcihcImVkaXRlZF9xdWVzdGlvblwiLCB7bWVudTogZ2V0U3R1ZGVudE1lbnUoY29udGV4dCksIHdpbGxfZWF0OiB0cnVlfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IGNvbnRleHQuc3RhdGUuc3R1ZGVudC51cGRhdGUoe1xyXG4gICAgICAgICAgICBhbnN3ZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGFuc3dlcl9kYXlfc3RhbXA6IGNvbnRleHQuc3RhdGUubG9jYWxfZGF5X3N0YW1wXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgY29udGV4dC5zZW5kKHJlbmRlcihcIm9rX3lvdV93aWxsX2VhdF90b2RheVwiK1xyXG4gICAgICAgICAgICAoY29udGV4dC5zdGF0ZS5zdHVkZW50LmFuc3dlcl9kYXlfc3RhbXAgIT09IGNvbnRleHQuc3RhdGUuc2V0dGluZ3MuZGF5X3N0YW1wP1wiX2J1dF9wb2xsX2lzbnRfYWN0aXZlXCI6JycpKSwge1xyXG4gICAgICAgICAgICBrZXlib2FyZDogS2V5Ym9hcmQuYnVpbGRlcigpLnRleHRCdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHJlbmRlcihcImlfZG9udF93YW50X2VhdF9idXR0b25cIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogS2V5Ym9hcmQuTkVHQVRJVkVfQ09MT1JcclxuICAgICAgICAgICAgfSkub25lVGltZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog0KHQuNGC0YPQsNGG0LjQuDpcclxuICAgICAqINCj0YfQtdC90LjQuiDQvdC1INC+0YLQstC10YLQuNC7LCDQutC+0LPQtNCwINC+0L/RgNC+0YEg0YPQttC1INCx0YvQuyDRgdC10LPQvtC00L3Rj1xyXG4gICAgICog0KPRh9C10L3QuNC6INC90LUg0L7RgtCy0LXRgtC40LssINC60L7Qs9C00LAg0L7Qv9GA0L7RgSDQsdGL0Lsg0LLRh9C10YDQsFxyXG4gICAgICog0KPRh9C10L3QuNC6INC+0YLQstC10YLQuNC7LCDQutC+0LPQtNCwINC+0L/RgNC+0YEg0LHRi9C7INCy0YfQtdGA0LBcclxuICAgICAqINCj0YfQtdC90LjQuiDQvtGC0LLQtdGC0LjQuywg0LrQvtCz0LTQsCDQvtC/0YDQvtGBINC90LUg0LHRi9C7INC30LDQstC10YDRiNC10L0g0LLRh9C10YDQsFxyXG4gICAgICovXHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog0L7RgtCy0LXRgiwg0LTQtdC90Ywg0L7RgtCy0LXRgtCwLCDRgdGC0LDRgtGD0YEg0L7Qv9GA0L7RgdCwLCDQtNC10L3RjCDQt9Cw0L/Rg9GB0LrQsCAtINC00LXQudGB0YLQstC40LVcclxuICAgICAqIG51bGwgMSBmYWxzZSAwIC0gclxyXG4gICAgICogbnVsbCAxIHRydWUgMSAtIHJcclxuICAgICAqIG51bGwgMSBmYWxzZSAxIC0gbGF0ZVxyXG4gICAgICogbnVsbCAxIHRydWUgMCAtIHJcclxuICAgICAqIHRydWUgMSB0cnVlIDEgLSByXHJcbiAgICAgKiBmYWxzZSAxIGZhbHNlIDEgLSBsYXRlXHJcbiAgICAgKiBmYWxzZSAyIGZhbHNlIDEgLSByXHJcbiAgICAgKi9cclxuICAgIGlmKGNvbnRleHQuc3RhdGUuc2V0dGluZ3MuZGF5X3N0YW1wID09PSBjb250ZXh0LnN0YXRlLmxvY2FsX2RheV9zdGFtcCl7XHJcbiAgICAgICAgaWYoIWNvbnRleHQuc3RhdGUuc2V0dGluZ3MuaXNfcG9sbF9hY3RpdmUpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuc3RhdGUuc3R1ZGVudC5hbnN3ZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBjb250ZXh0LnNlbmQocmVuZGVyKFwic29ycnlfeW91X3JlX2xhdGVcIiwge25vdGlmaWVkOiBjb250ZXh0LnN0YXRlLnN0dWRlbnQuc2VuZF9xdWVzdGlvbnN9KSx7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5Ym9hcmQ6IEtleWJvYXJkLmJ1aWxkZXIoKS50ZXh0QnV0dG9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHJlbmRlcihcImlfd2lsbF9lYXRfYW55d2F5X2J1dHRvblwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJpX3dpbGxfZWF0X2FueXdheVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5vbmVUaW1lKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBjb250ZXh0LnNlbmQocmVuZGVyKCdzb3JyeV90aW1lb3V0JykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXdhaXQgdXBkYXRlKCk7XHJcbn0pO1xyXG5ib3QuaGVhcihbXHJcbiAgICAvXig/OtCd0LXRgik/KD86LCApPyg/Oig/PCHQvdC1ICnRgdC10LPQvtC00L3RjyApPyg/OtCvICk/KNC90LUgKSg/OtGF0L7Rh9GDIHzQsdGD0LTRgyApPyg/Oig/PCHQvdC1ICnRgdC10LPQvtC00L3RjyApPyg/OtGPICk/KCg/OtC60YPRiNCw0YLRjHzQutGD0YjQsNGOKXwoPzrQv9C40YLQsNGC0YzRgdGPfNC/0LjRgtCw0Y7RgdGMKXwoPzrQtdGB0YLRjHzQtdC8KSkoPzog0YHQtdCz0L7QtNC90Y8pPyQvaSxcclxuICAgICh0ZXh0LCB7c3RhdGV9KT0+KHN0YXRlLmNvbW1hbmQ9PT0nc2VsZWN0ZWRfbm8nKVxyXG5dLCBhc3luYyBjb250ZXh0ID0+IHtcclxuICAgIGxldCB1cGRhdGUgPSBhc3luYygpPT57XHJcbiAgICAgICAgaWYoY29udGV4dC5zdGF0ZS5zdHVkZW50LmFuc3dlciA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgY29udGV4dC5zZW5kKHJlbmRlcihcInlvdV9hbHJlYWR5X3dpbGxfbm90X2VhdF90b2RheVwiKSwge1xyXG4gICAgICAgICAgICAgICAga2V5Ym9hcmQ6IEtleWJvYXJkLmJ1aWxkZXIoKS50ZXh0QnV0dG9uKHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogcmVuZGVyKFwiaV93YW50X2VhdF9idXR0b25cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IEtleWJvYXJkLlBPU0lUSVZFX0NPTE9SXHJcbiAgICAgICAgICAgICAgICB9KS5vbmVUaW1lKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY29udGV4dC5zdGF0ZS5zdHVkZW50Lm1lc3NhZ2Vfc2VuZF9kYXlfc3RhbXAgPT09IGNvbnRleHQuc3RhdGUubG9jYWxfZGF5X3N0YW1wKVxyXG4gICAgICAgICAgICBhd2FpdCB2ay5hcGkubWVzc2FnZXMuZWRpdCh7XHJcbiAgICAgICAgICAgICAgICBwZWVyX2lkOiBjb250ZXh0LnN0YXRlLnN0dWRlbnQudXNlcl9pZCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VfaWQ6IGNvbnRleHQuc3RhdGUuc3R1ZGVudC5sYXN0X21lc3NhZ2VfaWQsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiByZW5kZXIoXCJlZGl0ZWRfcXVlc3Rpb25cIiwge21lbnU6IGdldFN0dWRlbnRNZW51KGNvbnRleHQpLCB3aWxsX2VhdDogZmFsc2V9KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgY29udGV4dC5zdGF0ZS5zdHVkZW50LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIGFuc3dlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGFuc3dlcl9kYXlfc3RhbXA6IGNvbnRleHQuc3RhdGUubG9jYWxfZGF5X3N0YW1wXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgY29udGV4dC5zZW5kKHJlbmRlcihcIm9rX3lvdV93aWxsX25vdF9lYXRfdG9kYXlcIitcclxuICAgICAgICAgICAgKGNvbnRleHQuc3RhdGUuc3R1ZGVudC5hbnN3ZXJfZGF5X3N0YW1wICE9PSBjb250ZXh0LnN0YXRlLnNldHRpbmdzLmRheV9zdGFtcD9cIl9idXRfcG9sbF9pc250X2FjdGl2ZVwiOicnKSksIHtcclxuICAgICAgICAgICAga2V5Ym9hcmQ6IEtleWJvYXJkLmJ1aWxkZXIoKS50ZXh0QnV0dG9uKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiByZW5kZXIoXCJpX3dhbnRfZWF0X2J1dHRvblwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBLZXlib2FyZC5QT1NJVElWRV9DT0xPUlxyXG4gICAgICAgICAgICB9KS5vbmVUaW1lKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgaWYoY29udGV4dC5zdGF0ZS5zZXR0aW5ncy5kYXlfc3RhbXAgPT09IGNvbnRleHQuc3RhdGUubG9jYWxfZGF5X3N0YW1wKXtcclxuICAgICAgICBpZighY29udGV4dC5zdGF0ZS5zZXR0aW5ncy5pc19wb2xsX2FjdGl2ZSkge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5zdGF0ZS5zdHVkZW50LmFuc3dlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGNvbnRleHQuc2VuZChyZW5kZXIoXCJzb3JyeV95b3VfcmVfbGF0ZVwiLCB7bm90aWZpZWQ6IGNvbnRleHQuc3RhdGUuc3R1ZGVudC5zZW5kX3F1ZXN0aW9uc30pKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgY29udGV4dC5zZW5kKHJlbmRlcignc29ycnlfdGltZW91dCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGF3YWl0IHVwZGF0ZSgpO1xyXG59KTtcclxuYm90LmhlYXIoJ2xhdGUnLCAoY29udGV4dCkgPT4ge1xyXG4gICAgY29udGV4dC5zZW5kKHJlbmRlcigneW91X2RpZF9ub3RfcmVjb3JkX3lvdXJzZWxmJywge25vdGlmaWVkOiBjb250ZXh0LnN0YXRlLnN0dWRlbnQuc2VuZF9xdWVzdGlvbnN9KSlcclxufSlcclxuaGVhckNvbW1hbmQoXCJpX3dpbGxfZWF0X2FueXdheVwiLCBhc3luYyAoY29udGV4dCk9PntcclxuICAgIGF3YWl0IGNvbnRleHQuc3RhdGUuc3R1ZGVudC51cGRhdGUoe1xyXG4gICAgICAgIGxhdGVfZGF5X3N0YW1wOiBjb250ZXh0LnN0YXRlLmxvY2FsX2RheV9zdGFtcFxyXG4gICAgfSlcclxuICAgIGF3YWl0IGNvbnRleHQuc2VuZChyZW5kZXIoJ2lfd2lsbF9lYXRfYW55d2F5X3RleHQnKSk7XHJcbn0pXHJcblxyXG5ib3Quc2V0SGVhckZhbGxiYWNrSGFuZGxlcihhc3luYyAoY29udGV4dCk9PntcclxuICAgIGF3YWl0IGNvbnRleHQuc2VuZChyZW5kZXIoXCJpX2RvbnRfdW5kZXJzdGFuZFwiKSk7XHJcbn0pXHJcbi8vXHJcblxyXG5leHBvcnQgbGV0IHZrX2JvdCA9ICB2ay51cGRhdGVzLmdldFdlYmhvb2tDYWxsYmFjaygpOyIsImltcG9ydCB7Vkt9IGZyb20gXCJ2ay1pb1wiO1xyXG5cclxuY29uc3QgdmsgPSBuZXcgVksoe1xyXG4gICAgd2ViaG9va0NvbmZpcm1hdGlvbjogXCI4NTgwMzljMVwiLFxyXG4gICAgd2ViaG9va1NlY3JldDogXCJubm5cIixcclxuICAgIHRva2VuOiBcIjE3ZTQzOWRiNDU1ZDM2YzY1ZTk1MTM0YzBlMTQ5OThjYjYxMWJlNTVmMmExMTMyMjVkMmQ3MTExNDQyMzdhZjM0MWQ3Njk2ODY0MzI2NGE5YmRlNGJcIlxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgdms7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGdvb2dsZS1jbG91ZC9maXJlc3RvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHZrLWlvL3NjZW5lc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAdmstaW8vc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaC9pc0FycmF5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaC9pc1BsYWluT2JqZWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaC9tZXJnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2gvcmFuZG9tXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImx1eG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vZG9mdW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibnVuanVja3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGVsZWdyYWZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGVsZWdyYWYtY29tbWFuZC1wYXJ0c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0ZWxlZ3JhZi9jb3JlL25ldHdvcmsvZXJyb3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGVsZWdyYWYvZXh0cmFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGVsZWdyYWYvbWFya3VwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRlbGVncmFmL3NjZW5lcy9iYXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRlbGVncmFmL3N0YWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInZrLWlvXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=