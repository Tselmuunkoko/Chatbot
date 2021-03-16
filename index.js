
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
const { botRun } = require('./bot');


require("dotenv").config();

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.set('verify_token', (process.env.VERIFY_TOKEN || 'TEST'));
app.set('page_access_token', (process.env.PAGE_ACCESS_TOKEN || 'NULL'));
app.get('/', function (req, res) {
        res.send('It Works! Follow FB Instructions to activate.');
});

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === app.get('verify_token')) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token');
    }
});



app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        console.log(sender);
        if (event.message) {
            if(event.message.text &&(!event.message.quick_reply)){
                console.log(event.message.text);
                receiverFunction(event.message.text);  // text message & quick reply
            }
            else if(event.message.quick_reply){
                console.log(event.message.quick_reply.payload);
                receiverFunction(event.message.quick_reply.payload);
            }
            
        }
        else if(event.postback){
            console.log(event.postback);
            receiverFunction(event.postback.payload); //postback
        }
    }
    res.sendStatus(200);
});
async function receiverFunction(text){ // text[] // attachment[] // type 
    var resultMessage =  await botRun(text);
    console.log(resultMessage);
    // getStartButtonSet();
    // oneTimePersistant(sender);
    sendTextMessage(sender,resultMessage);
}
function sendTextMessage(sender, messageData) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:app.get('page_access_token')},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}
function oneTimePersistant(sender){
    request({
        url: 'https://graph.facebook.com/v10.0/me/custom_user_settings',
        qs: {access_token:app.get('page_access_token')},
        method: 'POST',
        json: {
            psid: sender,
            persistent_menu: [  
                  {
                      "locale": "default",
                      "composer_input_disabled": false,
                      "call_to_actions": [
                          {
                              "type": "postback",
                              "title": "Talk to an agent",
                              "payload": "CARE_HELP"
                          },
                          {
                              "type": "postback",
                              "title": "Outfit suggestions",
                              "payload": "CURATION"
                          },
                          {
                              "type": "web_url",
                              "title": "Shop now",
                              "url": "https://www.originalcoastclothing.com/",
                              "webview_height_ratio": "full"
                          }
                      ]
                  }
              ]
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}
function getStartButtonSet(){
    request({
        url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
        qs: {access_token:app.get('page_access_token')},
        method: 'POST',
        json: {
            "get_started": {"payload": "welcome text"}
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});