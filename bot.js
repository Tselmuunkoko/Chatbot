const { QuestionUnderstanding } = require('./bot/questionUnderstand');
const { FbViewHelper } = require('./bot/fbViewHelper');
const { GraphdbHelper } = require('./bot/GraphdbHelper');
const questionHelper = new QuestionUnderstanding();
const viewHelper = new FbViewHelper();
// const { text } = require('body-parser');
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
            // await context.sendActivity(viewHelper.createEmptyRoom(results));
        }
        else if(questionType == 2){
            // return viewHelper.sendListofFacultyMember();
            // await context.sendActivity(viewHelper.createLessonRoom(results));
        }
        else if(questionType == 3){   
            return viewHelper.sendListofFacultyMembers(results);
            // if (!(queryResults===undefined) || queryResults !='Error'){
            // sendTextMessage(sender,viewHelper.sendListofFacultyMember());
            // }
        }
        else if(questionType == 4){
            // await context.sendActivity(viewHelper.createSuggestedActionsForFacultyMember(results[0]));
        }
        else if(questionType == 5){
            // await context.sendActivity(viewHelper.createListForCourse(results));
        }
        else if(questionType == 6){
            // await context.sendActivity(viewHelper.createSchedule(results));
        }
        else if(questionType == 7){
            // await context.sendActivity(viewHelper.createRoomInfo(results[0]));
        }  
        else if(questionType == 8){
            // await context.sendActivity(viewHelper.createCardCourseInfo(results[0]));
        }
        else if(questionType == 9){
            // await context.sendActivity(viewHelper.createSuggestedActionsForFacultyMembers(results));
        }
        else if(questionType == 10){
            // await context.sendActivity(viewHelper.createListCardForlessonsByMember(results));
        } 
        else if(questionType == 11){
            // await context.sendActivity(viewHelper.createListCardForProjectByName(results));
        } 
        else if(questionType == 12){
            // await context.sendActivity(viewHelper.createProfileHeroCardForFacultyMember(results[0]));
        }
        else if(questionType == 13){
            // await context.sendActivity(viewHelper.createCardProjectInfo(results[0]));
        }
    }
}
module.exports.botRun = botRun;