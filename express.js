import express from 'express';
import bodyParser from 'body-parser';
// process.env.botapi = '587297912:AAEgIY01EjZJ0-jkVape0rwCbXfLl521mcE';
import axios from 'axios';
let app = new express();
import * as func from './main';
import * as cmd from "./commands"
import * as vk from './vk_bot';

app.use(bodyParser.json());

app.all('/webhook', (req,res)=>{
    return func.mainBot(req, res);
});

app.all('/webhook_vk', (req, res)=>{
    console.log(req.url);
    req.method = "POST";
    return vk.vk_bot(req, res, function(){console.log(arguments)});
});

app.all('/command', cmd.commandsBot);
// app.use(cmd.commands);

app.listen(5000);