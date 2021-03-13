class FbViewHelper{
    //gej hen be?
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
            "subtitle":instance.job.value+" , "+instance.department.value,
            "default_action": {
              "type": "web_url",
              "url": "https://www.num.edu.mn/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"postback",
                "title":"Хичээлүүд",
                "payload":instance.email.value+"-н энэ улиралд орж буй хичээлүүд?"
              },{
                "type":"postback",
                "title":"Судалгаа",
                "payload":instance.givenName.value+ "." +instance.department.value+"-н ажиллаж буй төслүүд?" 
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
    
}
module.exports.FbViewHelper = FbViewHelper;