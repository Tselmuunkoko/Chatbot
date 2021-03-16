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
            text:"Help me"
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