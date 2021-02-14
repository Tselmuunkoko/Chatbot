
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

// require("dotenv").config();

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
    console.log (req.body);
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        if (event.message && event.message.text) {
            text = event.message.text;
            // Your Logic Replaces the following Line
            if(text.length>10)
                sendTextwidthnicethings(sender, "BIG one: "+ text.substring(0, 200));
            else
                sendTextMessage(sender, "Tselmuunzaya received, echo: "+ text.substring(0, 200));
        }
    }
    res.sendStatus(200);
});

function sendTextwidthnicethings(sender, text) {
    messageData = {
        text:text,
        quick_replies:[
            {
              "content_type":"text",
              "title":"Red",
              "payload":"<POSTBACK_PAYLOAD>",
              "image_url":"http://example.com/img/red.png"
            },{
              "content_type":"text",
              "title":"Green",
              "payload":"<POSTBACK_PAYLOAD>",
              "image_url":"https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/67-512.png"
            }
          ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:app.get('page_access_token')},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}


function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:app.get('page_access_token')},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
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