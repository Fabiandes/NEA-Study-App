const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question:{
        type:String,
        maxlength: 50,
        required: true
    },
    answers:{
        type:[String],
        maxlength: 4,
        required: true
    },
    correctAnswer:{
        type:Number,
        required: true
    }
 })

 const CardSchema = new Schema({
     front:{
        type:String,
        required:true,
        maxlength:75
    },
     back:{
         type:String,
         required:true,
         maxlength:100
     },
     dateCreated:{
        type: Date,
        default:Date.now
    },
    lastRead:{
        type:Date,
        default:Date.now
    }
 })

const CardSetSchema = new Schema({
   title:{
       type: String,
       required:true,
       maxlength: 50
   },
   cards:{
       type: [CardSchema],
       maxlength:150
   },
   dateCreated:{
       type: Date,
       default:Date.now
   },
   lastRead:{
       type:Date,
       default:Date.now
   },
   weaknesses:{
       type:[Number],
       maxlength:20,
       default:[]
   }

})

const CardSet = mongoose.model('CardSet', CardSetSchema);
//const Question = mongoose.model('Question', QuestionSchema)

module.exports = {CardSet, QuestionSchema, CardSetSchema};