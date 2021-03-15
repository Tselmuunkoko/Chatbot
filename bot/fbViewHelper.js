class FbViewHelper{
    // 1 hooson angi
    emptyRooms(rooms){
      var it = 0;
      var elements=[];
        for (var i=0; i<rooms.length; i++){ 
          it++;
          if(it>10) break;
          var instance = rooms[i];
          elements.push({
            "title":instance.department.value+" "+instance.label1.value,
            "subtitle":instance.termType.value,
            "buttons":[
              {
                "type":"postback",
                "title":"Дэлгэрэнгүй",
                "payload":instance.department.value+"-"+instance.label1.value+" өрөөний дэлгэрэнгүй" 
              }
            ]
          });
      }
      var  messageData = {
          "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":elements
          }
        },
        "quick_replies":[
          {
            "content_type":"text",
            "title":"Дараагийнх",
            "payload":"<POSTBACK_PAYLOAD>"
          }
        ]
      }
      return messageData;
    }
    // 2 hicheeliin uruu
    lessonRooms(rooms){
      return this.emptyRooms(rooms);
    }
    //3 gej hen be?
    sendListofFacultyMembers(members){
      var it  = 0;
      var elements= [];
      for (var i=0; i<members.length; i++){
        var instance = members[i];       
        if (instance.email === undefined)      
            continue; 
        it++;
        if(it>10) break;
        elements.push({
            "title":instance.familyName.value+" "+instance.givenName.value,
            "subtitle":instance.department.value,
            "buttons":[
              {
                "type":"postback",
                "title":"Хичээлүүд",
                "payload":instance.email.value+"-н энэ улиралд орж буй хичээлүүд?"
              },
              {
                "type":"postback",
                "title":"Дэлгэрэнгүй",
                "payload": instance.email.value+" гэж хэн бэ?"
              }
            ]
        });
    }
        var messageData ={
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"generic",
              "elements":elements
            }
          }
        }
        return messageData;
    }
    // 4  gej hen be email
    sendDetailsOfFacultyMember(member){
      var roominfo;
      if (!(member.room1 === undefined)) {
        var tokens = member.room1.value.split("/");
        roominfo = "*Өрөө*: "+decodeURIComponent(tokens[4])+"\n";
      }
      var messageData = {
        "text": "*"+member.familyName.value+" "+member.givenName.value+"*\n"+
                "*Албан тушаал*: "+member.job.value+" \n"+
                "*Нэгж*: "+member.department.value+" \n"+
                "*Мэйл*: "+ member.email.value+"\n"+
                "*Өрөө*: "+(!(member.room1 === undefined)?
                decodeURIComponent(member.room1.value.split("/")):
                "мэдээлэл байхгүй"),
        "quick_replies":[
          {
            "content_type":"text",
            "title":"Судалгааны чиглэл",
            "payload":"<POSTBACK_PAYLOAD>"
          },{
            "content_type":"text",
            "title":"Ажиллаж буй төслүүд",
            "payload":"<POSTBACK_PAYLOAD>"
          }
        ]
      }
      return messageData;
    }
    // 5 gej ymar hicheel we
    courseList(courses){
      var it = 0;
      var elements=[];
        for (var i=0; i<courses.length; i++){ 
          it++;
          if(it>10) break;
          var instance = courses[i];
          elements.push({
            "title":instance.courseName.value,
            "subtitle":instance.depLabel.value +"  "+ instance.courseCredit.value + " Багц цаг",
            "buttons":[
              {
                "type":"postback",
                "title":"Дэлгэрэнгүй",
                "payload": instance.courseName.value +" хичээлийн дэлгэрэнгүй мэдээлэл?"
              }
            ]
          });
      }
      var  messageData = {
          "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":elements
          }
        },
        "quick_replies":[
          {
            "content_type":"text",
            "title":"Дараагийнх",
            "payload":"<POSTBACK_PAYLOAD>"
          }
        ]
      }
      return messageData;
    }
    //6 hicheeliin tsagiin huwaari
    scheduleList(lessons){
      var tempArray = [];
      for(var i=0; i<lessons.length; i++){
          var temp = lessons[i];    
          if(temp.type.value=="Даваа"){
              tempArray.push(1);
          }
          if(temp.type.value=="Мягмар"){
              tempArray.push(2);
          }
          if(temp.type.value=="Лхагва"){
              tempArray.push(3);
          }
          if(temp.type.value=="Пүрэв"){
              tempArray.push(4);
          }
          if(temp.type.value=="Баасан"){
              tempArray.push(5);
          }
          if(temp.type.value=="Бямба"){
              tempArray.push(6);
          }
          if(temp.type.value=="Ням"){
              tempArray.push(7);
          }
      }
      
      let bubbleSort = (inputArr,body) => {
          let len = inputArr.length;
          for (let i = 0; i < len; i++) {
              for (let j = 0; j < len; j++) {
                  if (inputArr[j] > inputArr[j + 1]) {
                      let tmp = inputArr[j];
                      let nicetemp = body[j];
                      inputArr[j] = inputArr[j + 1];
                      body[j]=body[j+1];
                      inputArr[j + 1] = tmp;
                      body[j+1]=nicetemp;

                  }
              }
          }
          return body;
      };
      
      bubbleSort(tempArray,lessons);

      var it = 0;
      var elements=[];
        for (var i=0; i<rooms.length; i++){ 
          it++;
          if(it>10) break;
          var instance = rooms[i];
          elements.push({
            "title":instance.department.value+" "+instance.label1.value,
            "subtitle":instance.termType.value,
            "buttons":[
              {
                "type":"postback",
                "title":"Дэлгэрэнгүй",
                "payload":instance.department.value+"-"+instance.label1.value+" өрөөний дэлгэрэнгүй" 
              }
            ]
          });
      }
      var  messageData = {
        "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":elements
            }
          },
          "quick_replies":[
            {
              "content_type":"text",
              "title":"Дараагийнх",
              "payload":"<POSTBACK_PAYLOAD>"
            }
          ]
        }
    return messageData;

    }
    //7 uruunii delgerengui
    //8 hicheeliig hen zaadag we
    //9 ene uliral orj bui hicheeluud
    //10 tusul
    //11 sudalgaa
    //12 tusliin delgerengui
}
module.exports.FbViewHelper = FbViewHelper;