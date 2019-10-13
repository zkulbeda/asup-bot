let express = require('express');
let bodyParser = require('body-parser');
process.env.botapi = '587297912:AAEgIY01EjZJ0-jkVape0rwCbXfLl521mcE';
let func = require('./main.js');
let app = new express();

app.use(bodyParser.json());

app.all('/webhook', func.mainBot)

app.listen(5000);

console.log('started')