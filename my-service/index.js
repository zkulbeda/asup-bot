'use strict';

let tg_bot = require('../main.js');
let vk_bot = require('../vk_bot.js');
let commands = require('../commands.js');

module.exports.tg_bot = tg_bot.mainBot;
module.exports.vk_bot = vk_bot.vk_bot;
module.exports.commands = commands.commandsBot;
