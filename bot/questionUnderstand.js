class QuestionUnderstanding {
    
    constructor(){
        // this.contextText = contextText;
        // this.queryNumber = getTypeOfQuestion();
    }
    
    /**
     * @param {String} text -- String of question asked by user
     */
    getTypeOfQuestion(text) {
        if(text.search("сул өрөө")!=-1 || text.search("хоосон өрөө")!=-1) return 1;
        if(text.search("хичээл хаана орж байна вэ?")!=-1) return 2;
        if(text.search("гэж хэн бэ?") != -1 && text.search("@") == -1 ) return 3;
        if(text.search("гэж хэн бэ?") != -1 && text.search("@") != -1) return 4;
        if(text.search("гэж ямар хичээл бэ?") != -1) return 5;
        if(text.search("хичээлийн цагийн хуваарь")!=-1) return 6;
        if(text.search("өрөөний дэлгэрэнгүй")!=-1) return 7;
        if(text.search("хичээлийн дэлгэрэнгүй мэдээлэл?") != -1) return 8;
        if(text.search(" хичээлийг хэн заадаг бэ?") != -1) return 9;
        if(text.search("-н энэ улиралд орж буй хичээлүүд?")!= -1) return 10;
        if(text.search("-н ажиллаж буй төслүүд?")!= -1) return 11;
        if(text.search("-н судалгааны чиглэлүүд?")!= -1) return 12;
        if(text.search("төслийн дэлгэрэнгүй мэдээлэл?")!= -1) return 13;
        if(text.search("Тусламж")!=-1) return 911;
        else return -1;
    }
    
    /**
     * @param {String} questionType -- Integer represents question type
     * @param {String} question -- String that is a question asked by user
     */
    extractAttributes(questionType, question){
        if(questionType!=6)
            question = this.normalizeQuestion(question);
        if(questionType==1){
            return this.findForEmptyRoom(question); 
        }
        else if(questionType==2){
            return question.substring(0, question.search("хичээл хаана орж байна бэ?")).trim();  
        } 
        else if(questionType==3){
            return question.substring(0, question.search("гэж хэн бэ?")).trim();    
        } 
        else if(questionType==4){
            return question.substring(0, question.search("гэж хэн бэ?")).trim();    
        }
        else if(questionType==5){
            return question.substring(0, question.search("гэж ямар хичээл бэ?")).trim();
        }
        else if(questionType==6){
            console.log(question);
            return question.substring(0,question.search("хичээлийн цагийн хуваарь")).trim();
        }
        else if(questionType==7){
            return question.substring(0, question.search("өрөөний дэлгэрэнгүй")).trim();
        }
        else if(questionType==8){
            return question.substring(0, question.search("хичээлийн дэлгэрэнгүй мэдээлэл?")).trim();
        }
        else if(questionType==9){
            return question.substring(0, question.search("хичээлийг хэн заадаг бэ?")).trim();
        }
        else if(questionType==10){
            return question.substring(0, question.search("-н энэ улиралд орж буй хичээлүүд?")).trim();
        }
        else if(questionType==11){
            return question.substring(0, question.search("-н ажиллаж буй төслүүд?")).trim();
        }
        else if(questionType==12){
            return question.substring(0, question.search("-н судалгааны чиглэлүүд?")).trim();
        }
        else if(questionType==13){
            return question.substring(0, question.search("төслийн дэлгэрэнгүй мэдээлэл?")).trim();
        }
        return -1;
    }
    
    normalizeQuestion(question){
        var ans = question.replace(/вэ?/g, 'бэ?');
        return ans;
    }
    findForEmptyRoom(question){
        if(this.TimeForEmptyRoom(question)!=-1){
            if(this.findRoomKey(question)!=-1){
                // this.queryNumber = 101;
                return this.findRoomKey(question) + "+" + this.TimeForEmptyRoom(question);  // hicheeliin bair + tsag
            }
            else{
                // this.queryNumber = 102;
                return this.TimeForEmptyRoom(question); // tsag
            }
        }
        else 
            return this.findRoomKey(question); // hicheeliin bair
    }
    TimeForEmptyRoom(question){
        const reg = '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';
        const arr = question.split(" ");
        console.log(arr);
        for (var i in arr) {
            console.log("time------------"+i);
            if (arr[i].search(reg)==0) {
                return arr[i];
            }
        }
        return -1;
    }
    findRoomKey(question){
        if(question.search("номын сан")!=-1){
            return "номын сан";
        }
        if(question.search("1-р байр")!=-1||question.search("төв байр")!=-1){
            return "Хичээлийн төв байр";
        }
        if(question.search("2-р байр")!=-1){
            return "Хичээлийн байр 2";
        }
        if(question.search("3-р байр")!=-1){
            return "Хичээлийн байр 3";
        }
        if(question.search("4-р байр")!=-1){
            return "Хичээлийн байр 4";
        }
        if(question.search("5-р байр")!=-1){
            return "Хичээлийн байр 5";
        }
        if(question.search("завхан")!=-1){
            return "Завхан сургуулийн хичээлийн байр";
        }
        if(question.search("орхон")!=-1){
            return "Орхон сургуулийн хичээлийн байр";
        }
        if(question.search("Цөмийн судалгааны төв")!=-1){
            return "Цөмийн судалгааны төв";
        }
        else return -1;
    }  
}
module.exports.QuestionUnderstanding = QuestionUnderstanding;


