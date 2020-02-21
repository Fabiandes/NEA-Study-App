const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CardSchema = new Schema({
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

let CardSetSchema = new Schema({
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
       type:Number,
       default:-1
   }

})

const Flashcard = mongoose.model('Flashcard', FlashcardSchema);
const Card = mongoose.model('Card', CardSchema)

module.exports = {Flashcard, Card};