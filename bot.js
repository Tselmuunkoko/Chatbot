const { QuestionUnderstanding } = require('./bot/questionUnderstand');
const { FbViewHelper } = require('./bot/fbViewHelper');
const { GraphdbHelper } = require('./bot/GraphdbHelper');
var request = require('request');
const questionHelper = new QuestionUnderstanding();
const viewHelper = new FbViewHelper();
const dbHelper = new GraphdbHelper();

require("dotenv").config();

class Bot{
    constructor(){
        this.state = 0;
        this.lastresult;
        this.range = 0;
        this.prevQuestion;
        this.sender;
    }
    async Run(sender,event){
        this.sender = sender;
        var result;
        if (event.message) {
            if(event.message.text &&(!event.message.quick_reply)){
                console.log(event.message.text);
                result =  await this.botRun(event.message.text);
            }
            else if(event.message.quick_reply){
                console.log(event.message.quick_reply.payload);
                result = await this.botRun(event.message.quick_reply.payload);
            }
            this.sendListMessage(result);
        }
        else if(event.postback){
            console.log(event.postback);
            result = await this.botRun(event.postback.payload); //postback
            this.sendListMessage(result);
        }
    }
    sendListMessage(result){  
        // this.sendImageMessage(sender,'/home/inuyasha/aizawa.jpg'); 
        if(!result.length){
            this.sendTextMessage(this.sender,result);
        }
        for(var i = 0; i<result.length; i++){
            this.sendTextMessage(this.sender,result[i]);
        }
    }
    async botRun(textMessage){
        var questionType = questionHelper.getTypeOfQuestion(textMessage);
        // console.log(questionType);
        var questionAttributes = questionHelper.extractAttributes(questionType, textMessage);
        if (questionType == 911){
           var messageData = {
                text:"Боломжит асуултууд \n"+
                "1.  Одоо 3-р байранд сул өрөө байна уу? \n"+
                '2.  Веб програмчлал хичээл хаана орж байна вэ? \n'+
                '3.  Амарсанаа (багшийн нэр) гэж хэн бэ? \n'+
                '4.  (мэйлээр) гэж хэн бэ? \n'+
                '5.  Амарсанаа-н энэ улиралд орж буй хичээлүүд? \n'+
                '6.  Амарсанаа-н ажиллаж буй төслүүд? \n'+
                '7.  Амарсанаа-н судалгааны чиглэлүүд? \n'+
                '8.  Веб програмчлал гэж ямар хичээл бэ? \n'+
                '9.  Веб програмчлал хичээлийн цагийн хуваарь? \n'+
                '10. Веб програмчлал-н чиглэлээр хэн судалгаа хийдэг вэ? \n'
            }
            return messageData;
        } 
        else if(questionType == 0){
            var  messageData = {
                text:"Сайн байна уу? Би МУИС-ийн нээлттэй өгөгдөл дээр суурьлан доорх асуултуудад хариулт өгж чадна.\n"+
                "1.  Одоо 3-р байранд сул өрөө байна уу? \n"+
                '2.  Веб програмчлал хичээл хаана орж байна вэ? \n'+
                '3.  Амарсанаа (багшийн нэр) гэж хэн бэ? \n'+
                '4.  (мэйлээр) гэж хэн бэ? \n'+
                '5.  Амарсанаа-н энэ улиралд орж буй хичээлүүд? \n'+
                '6.  Амарсанаа-н ажиллаж буй төслүүд? \n'+
                '7.  Амарсанаа-н судалгааны чиглэлүүд? \n'+
                '8.  Веб програмчлал гэж ямар хичээл бэ? \n'+
                '9.  Веб програмчлал хичээлийн цагийн хуваарь? \n'+
                '10. Веб програмчлал-н чиглэлээр хэн судалгаа хийдэг вэ? \n'
            }
            return messageData;
        }
        else if(questionType == -1){
            var messageData = {
                text:"Асуултыг ойлгосонгүй!"
            }
            return messageData;
        }
        else {
            var queryResults;
            var results;
            if(questionType=="prev"){
                questionType = this.prevQuestion;
                results = this.lastresult;
                this.range=+10;
            }
            else{
                queryResults = await dbHelper.responseBack(questionType, questionAttributes);
                results = queryResults.results.bindings;
                console.log(questionType);
                this.range = 0;
                this.lastresult = results;
                this.prevQuestion = questionType;
            }
            if(questionType == 1){
                return viewHelper.emptyRooms(results,this.range);
            }
            else if(questionType == 2){
                return viewHelper.lessonRooms(results,this.range);
            }
            else if(questionType == 3){   
                return viewHelper.sendListofFacultyMembers(results,this.range);
            }
            else if(questionType == 4){
                return viewHelper.sendDetailsOfFacultyMember(results[0]);
            }
            else if(questionType == 5){
                return viewHelper.courseList(results,this.range);
            }
            else if(questionType == 6){ //lecture
                return viewHelper.scheduleList(results,this.range,0);
            }
            else if(questionType == 7){
                return viewHelper.roomDetails(results[0]);
            }  
            else if(questionType == 8){
                return viewHelper.courseDetails(results[0]);
            }
            else if(questionType == 9){
                return viewHelper.sendListofFacultyMembers(results,this.range);
            }
            else if(questionType == 10){
                return viewHelper.courseList(results,this.range);
            } 
            else if(questionType == 11){
                return viewHelper.projectList(results,this.range);
            } 
            else if(questionType == 12){
                // await context.sendActivity(viewHelper.createProfileHeroCardForFacultyMember(results[0]));
            }
            else if(questionType == 13){
                return viewHelper.projectDetails(results[0]);
            }
            else if(questionType == 14){ //lab
                return viewHelper.scheduleList(results,this.range,1);
            }
            else if(questionType == 15){ //seminar
                return viewHelper.scheduleList(results,this.range,2);
            }
        }
    }
    sendTextMessage(sender, messageData) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token:process.env.PAGE_ACCESS_TOKEN},
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
    sendImageMessage(recipientId, file_loc){
        let fs = require('fs');
        var readStream = fs.createReadStream(file_loc);
        var messageData = {
            recipient : {
                id : recipientId
            },
            message : {
                attachment : {
                    type : "image",
                    payload :{}
                }
            },
            filedata:readStream
        }
        this.callSendAPI(messageData);
    }
    
    callSendAPI(messageData) {
        var endpoint = "https://graph.facebook.com/v2.6/me/messages?access_token=" + process.env.PAGE_ACCESS_TOKEN;
        var r = request.post(endpoint, function(err, httpResponse, body) {
            if (err) {return console.error("upload failed >> \n", err)};
            console.log("upload successfull >> \n", body); //facebook always return 'ok' message, so you need to read error in 'body.error' if any
        });
        var form = r.form();
        form.append('recipient', JSON.stringify(messageData.recipient));
        form.append('message', JSON.stringify(messageData.message));
        form.append('filedata', messageData.filedata); //no need to stringify!
    }
    
}
    
module.exports.Bot = Bot;