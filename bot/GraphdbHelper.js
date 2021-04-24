const fetch = require('node-fetch');
const util = require('util');
const moment = require('moment-timezone');
const { SparqlQueries } = require('./sparqlQueries');
class GraphdbHelper {
    constructor(){
        this.date = moment().tz('Asia/Ulaanbaatar');
        this.weekday = "Даваа";
        if(this.date.isoWeekday()==1) this.weekday = "Даваа";
        if(this.date.isoWeekday()==2) this.weekday = "Мягмар";
        if(this.date.isoWeekday()==3) this.weekday = "Лхагва";
        if(this.date.isoWeekday()==4) this.weekday = "Пүрэв";
        if(this.date.isoWeekday()==5) this.weekday = "Баасан";
        if(this.date.isoWeekday()==6) this.weekday = "Бямба";
        if(this.date.isoWeekday()==7) this.weekday = "Ням";
    }
    async responseBack(questionType, attributes){
            
            var query = this.getQuery(questionType, attributes);
            const host = 'http://localhost:7200';
            const path = '/repositories/spring2021';
            const params = '?query=';
            const url = host + path + params + query;
            
            if (query == '404') {
                return 'Error';
            }
            
            var res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/sparql-results+json'
                }
            })
            if (!res.ok) {
                throw res;
            }
            var responseBody = await res.json();
            console.log(responseBody);
            
            return responseBody;
    }
    getQuery (questionType, attributes) {
       if(questionType==1){
        return util.format(SparqlQueries.EmptyRoom, 
            encodeURI(attributes),
            encodeURI(this.date.format('HH')+":"+this.date.format('mm')),
            encodeURI(this.date.format('HH')+":"+this.date.format('mm')),
            encodeURI(this.weekday),
            encodeURI(attributes));
        }
        if(questionType == 2){
            console.log(this.date.format('HH')+":"+this.date.format('mm'));
            console.log(this.weekday);
            console.log(attributes);
            return util.format(SparqlQueries.LessonRoom,
                encodeURI(this.date.format('HH')+":"+this.date.format('mm')),
                encodeURI(this.date.format('HH')+":"+this.date.format('mm')),
                encodeURI(this.weekday),
                encodeURI(attributes));
        }
        if (questionType==3){
            return util.format(SparqlQueries.membersByName, encodeURI(attributes));
        }
        if (questionType==4){
            return util.format(SparqlQueries.membersByEmail, encodeURI(attributes));
        }
        if(questionType==5){
  
            return util.format(SparqlQueries.courseInf, encodeURI(attributes));
        }
        if(questionType==6){
            console.log(attributes);
            return util.format(SparqlQueries.CourseScheSeminar,encodeURI(attributes),encodeURI("Лекц"));
        }
        if(questionType==7){
            var arr = attributes.split("-");
            console.log(arr);
            return util.format(SparqlQueries.RoomInfo, encodeURI(arr[1]),encodeURI(arr[0]));
        }
        if (questionType==8){
            return util.format(SparqlQueries.courseInf, encodeURI(attributes));
        }
        if (questionType==9){          
            return util.format(SparqlQueries.courseTeacher, encodeURI(attributes));
        }
        if (questionType==10){
            return util.format(SparqlQueries.lessonsByMember, encodeURI(attributes));
        }
        if (questionType==11){
            console.log(attributes);
            return util.format(SparqlQueries.tusulbyMember, encodeURI(attributes));    
        }
        if (questionType==12){
            return util.format(SparqlQueries.researchbyEmail, encodeURI(attributes));
        }
        if (questionType==13){
            console.log(attributes);
            return util.format(SparqlQueries.tusulbyUri, encodeURI(attributes));
        }
        if (questionType==14){
            return util.format(SparqlQueries.CourseScheSeminar,encodeURI(attributes),encodeURI("Семинар"));
        }
        if (questionType==15){
            return util.format(SparqlQueries.CourseScheSeminar,encodeURI(attributes),encodeURI("Лаборатори"));
        }
        if(questionType==16){
            return util.format(SparqlQueries.memberByResearch,encodeURI(attributes));
        }
        else return '404';
    }
}
module.exports.GraphdbHelper = GraphdbHelper;
