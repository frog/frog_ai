'use strict';
const DEBUG = false;
const http = require('http');
const config = require('./config');
const SLACK_TOKEN = config.slack_token;
const BOT_TOKEN = config.bot_token;
const AYLIEN_ID = config.aylien_id;
const AYLIEN_KEY = config.aylien_key;
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const slackEvents = createSlackEventAdapter(SLACK_TOKEN);
const IncomingWebhook = require('@slack/client').IncomingWebhook;
const webhookUrl = config.webhook_url;
const webhook = new IncomingWebhook(webhookUrl);
const webhook_dev = new IncomingWebhook(webhookUrl);
const port = 3000;
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/frogai';
const Article = require('./models/article');
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log('connected to mongodb');
});

const interactiveMessages  = require('@slack/interactive-messages');
const slackMessages = interactiveMessages.createMessageAdapter(SLACK_TOKEN);  // Initialize using verification token from environment variables

// init express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let channel = 'C6GN4GYGM';
let channel_dev = 'C70JQSS9E';
let botConnected = false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false  }));
app.use('/slack/events', slackEvents.expressMiddleware());
app.use('/slack/actions', slackMessages.expressMiddleware());

const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
    application_id: AYLIEN_ID,
    application_key: AYLIEN_KEY 
});


let concepts = [];
let message;
let match;
const re = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/ // regex to look for links posted in a message

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
    // check to see if we're listening to the right channel
    if (event.channel === channel || event.channel === channel_dev){
        if (event != undefined && event.text != undefined && event.text.match(re) != undefined){
            let url = event.text.match(re)[0];
            console.log(url);
            sendMessage(url);
        }
    }
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

slackMessages.action('train_me', (payload) => {
    // `payload` is JSON that describes an interaction with a message.
    console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed the ${payload.actions[0].name} button`);

    // The `actions` array contains details about the specific action (button press, menu selection, etc.)
    const action = payload.actions[0];
    // console.log(`The button had name ${action.name} and value ${action.value}`);

    let article = new Article({
        user: payload.user.name,
        user_id: payload.user.id,
        timestamp: Date.now(),
        concepts: [],
        url: action.value
    });

    if (action.value != 'no'){
        textapi.concepts({
            url: action.value 
        }, function(error, response) {
            if (error === null) {
                concepts = [];

                Object.keys(response.concepts).forEach((key)=>{
                    response.concepts[key].surfaceForms.forEach((sf)=>{
                        concepts.push(sf['string']);
                    });
                })

                console.log(concepts)
                article.concepts = concepts;
                saveArticle(article);
            }else {
                console.log(error)
                saveArticle(article);
            }
        });
    }

    // You should return a JSON object which describes a message to replace the original.
    // Note that the payload contains a copy of the original message (`payload.original_message`).
    let replacement = payload.original_message;
    // Typically, you want to acknowledge the action and remove the interactive elements from the message
    replacement.text =`Got it, thanks @${payload.user.name}!`;
    delete replacement.attachments;
    return replacement;
});

function sendMessage(url){
    message = {
        // "text": "Looks like someone sent a link from " + url.split("\/\/")[1].split("\/")[0],
        "text": "Looks like someone sent a link. Would you like @frog_ai's training data to include it?",
        "attachments": [
            {
                "text": url.split("\/\/")[1],
                "fallback": "You are unable to train me",
                "callback_id": "train_me",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "training",
                        "text": "Yes",
                        "type": "button",
                        "value": url
                    },
                    {
                        "name": "training",
                        "text": "No thanks",
                        "type": "button",
                        "value": "no"
                    }
                ]
            }
        ]
    }

    webhook.send(message, (err, header, statusCode, body)=> {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Received', statusCode, 'from Slack');
      }
    });
}

function saveArticle(article){
    article.save((err)=>{
        if(err){
            console.error(err);
        }else {
            console.log('saved new article');
        }
    });
}

// Start the express application
http.createServer(app).listen(port, () => {
    console.log(`server listening on port ${port}`);
});
