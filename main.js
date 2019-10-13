let telegraf = require('telegraf')
const session = require('./telegraf-session-firestore')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const { leave, enter } = Stage
const TelegrafInlineMenu = require('telegraf-inline-menu')
const admin = require('firebase-admin');
const firestore = require("@google-cloud/firestore");

let db = new firestore({
	// projectId: "telegrambot-255720",
	keyFilename: './telegrambot-255720-fc32c10a28bc.json'
});
db.collection('asf').doc('dfg').set({sdv:12,fe:true}).catch((e)=>{throw e;});

const menu = new TelegrafInlineMenu('Main Menu')

menu.urlButton('EdJoPaTo.de', 'https://edjopato.de')

let mainMenuToggle = false
menu.toggle('toggle me', 'a', {
  setFunc: (_ctx, newVal) => {
    mainMenuToggle = newVal
  },
  isSetFunc: () => mainMenuToggle
})

menu.simpleButton('click me', 'c', {
  doFunc: async ctx => ctx.answerCbQuery('you clicked me!'),
  hide: () => mainMenuToggle
})

menu.simpleButton('click me harder', 'd', {
  doFunc: async ctx => ctx.answerCbQuery('you can do better!'),
  joinLastRow: true,
  hide: () => mainMenuToggle
})

let selectedKey = 'b'
menu.select('s', ['A', 'B', 'C'], {
  setFunc: async (ctx, key) => {
    selectedKey = key
    await ctx.answerCbQuery(`you selected ${key}`)
  },
  isSetFunc: (_ctx, key) => key === selectedKey
})

const foodMenu = new TelegrafInlineMenu('People like food. What do they like?')

const people = {Mark: {}, Paul: {}}
const food = ['bread', 'cake', 'bananas']

function personButtonText(_ctx, key) {
  const entry = people[key]
  if (entry && entry.food) {
    return `${key} (${entry.food})`
  }

  return key
}

function foodSelectText(ctx) {
  const person = ctx.match[1]
  const hisChoice = people[person].food
  if (!hisChoice) {
    return `${person} is still unsure what to eat.`
  }

  return `${person} likes ${hisChoice} currently.`
}

const foodSelectSubmenu = new TelegrafInlineMenu(foodSelectText)
  .toggle('Prefer Tee', 't', {
    setFunc: (ctx, choice) => {
      const person = ctx.match[1]
      people[person].tee = choice
    },
    isSetFunc: ctx => {
      const person = ctx.match[1]
      return people[person].tee === true
    }
  })
  .select('f', food, {
    setFunc: (ctx, key) => {
      const person = ctx.match[1]
      people[person].food = key
    },
    isSetFunc: (ctx, key) => {
      const person = ctx.match[1]
      return people[person].food === key
    }
  })

foodMenu.selectSubmenu('p', () => Object.keys(people), foodSelectSubmenu, {
  textFunc: personButtonText,
  columns: 2
})

foodMenu.question('Add person', 'add', {
  questionText: 'Who likes food too?',
  setFunc: (_ctx, key) => {
    people[key] = {}
  }
})

menu.submenu('Food menu', 'food', foodMenu, {
  hide: () => mainMenuToggle
})

let isAndroid = true
menu.submenu('Photo Menu', 'photo', new TelegrafInlineMenu('', {
  photo: () => isAndroid ? 'https://telegram.org/img/SiteAndroid.jpg' : 'https://telegram.org/img/SiteiOs.jpg'
}))
  .setCommand('photo')
  .simpleButton('Just a button', 'a', {
    doFunc: async ctx => ctx.answerCbQuery('Just a callback query answer')
  })
  .select('img', ['iOS', 'Android'], {
    isSetFunc: (_ctx, key) => key === 'Android' ? isAndroid : !isAndroid,
    setFunc: (_ctx, key) => {
      isAndroid = key === 'Android'
    }
  })

menu.setCommand('m')

// Greeter scene
const greeterScene = new Scene('greeter')
greeterScene.enter((ctx) => ctx.reply('Hi'))
greeterScene.leave((ctx) => ctx.reply('Bye'))
greeterScene.hears('hi', enter('echo'))
greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`', Extra.markup((m) =>
    m.inlineKeyboard([
      m.callbackButton('Coke', 'Coke'),
      m.callbackButton('Pepsi', 'Pepsi')
    ]))))
greeterScene.on('callback_query', (ctx)=>{
	console.log(ctx)
	ctx.answerCbQuery("CALLBACK: "+ctx.update.callback_query.data, true)
});

// Echo scene
const echoScene = new Scene('echo')
echoScene.enter((ctx) => ctx.reply('echo scene'))
echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
echoScene.command('back', leave())
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

// Create scene manager
const stage = new Stage([greeterScene,echoScene])
stage.command('cancel', leave())

// Scene registration

let bot = new telegraf(process.env.botapi,{
  telegram: { 
    webhookReply: true
  },
});

bot.use(telegraf.log())

bot.use(session({store: db}))
bot.use(stage.middleware())
bot.use(menu.init({backButtonText: 'Назад'}))
// bot.on('message', (ctx) => {
//   console.log(ctx)
// })
// bot.hears('hi', ctx => ctx.reply('Hey there!'))

bot.catch((err) => {
  console.log('Ooops', err)
})
bot.command('greeter', (ctx) => ctx.scene.enter('greeter'))
bot.command('echo', enter('echo'))
bot.command('fater', (ctx) => ctx.reply('sdfgvsfdg\nawsgfd\n'))
bot.on('text', (ctx) => {
  return ctx.reply(`${ctx.message.from.username}: ${ctx.message.text}`)
})

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.mainBot = (req, res) => {
  bot.handleUpdate(req.body, res);
};