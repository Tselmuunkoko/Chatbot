const { QuestionUnderstanding } = require('./bot/questionUnderstand');
const { FbViewHelper } = require('./bot/fbViewHelper');
const { GraphdbHelper } = require('./bot/GraphdbHelper');
const questionHelper = new QuestionUnderstanding();
const viewHelper = new FbViewHelper();
const dbHelper = new GraphdbHelper();
    async function botRun(textMessage){
        var questionType = questionHelper.getTypeOfQuestion(textMessage);
        var questionAttributes = questionHelper.extractAttributes(questionType, textMessage);
    
        if (questionType == 911){
            messageData = {
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
            messageData = {
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
            messageData = {
                text:"Асуултыг ойлгосонгүй!"
            }
            return messageData;
        }
        else {
            var queryResults = await dbHelper.responseBack(questionType, questionAttributes);
            console.log(queryResults);
            var results = queryResults.results.bindings;
            console.log(questionType);
            if(questionType == 1){
                return viewHelper.emptyRooms(results);
            }
            else if(questionType == 2){
                return viewHelper.lessonRooms(results);
            }
            else if(questionType == 3){   
                return viewHelper.sendListofFacultyMembers(results);
            }
            else if(questionType == 4){
                return viewHelper.sendDetailsOfFacultyMember(results[0]);
            }
            else if(questionType == 5){
                return viewHelper.courseList(results);
            }
            else if(questionType == 6){
                // await context.sendActivity(viewHelper.createSchedule(results));
            }
            else if(questionType == 7){
                return viewHelper.roomDetails(results[0]);
            }  
            else if(questionType == 8){
                return viewHelper.courseDetails(results[0]);
            }
            else if(questionType == 9){
                return viewHelper.sendListofFacultyMembers(results);
            }
            else if(questionType == 10){
                return viewHelper.courseList(results);
            } 
            else if(questionType == 11){
                return viewHelper.projectList(results);
            } 
            else if(questionType == 12){
                // await context.sendActivity(viewHelper.createProfileHeroCardForFacultyMember(results[0]));
            }
            else if(questionType == 13){
                return viewHelper.projectDetails(results[0]);
            }
        }
    }
module.exports.botRun = botRun;