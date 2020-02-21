const mongoose = require('mongoose');
const USERNAME = process.env.db_username || 'test-user';
const PASSWORD = process.env.db_password || 'dW1JJglBFeca4R3T'
const DB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@studyapp-kyldd.mongodb.net/test?retryWrites=true&w=majority`;

const Schema = mongoose.Schema;
const dbConnection = mongoose.createConnection(DB_URI,{ useNewUrlParser: true });

let CardSchema = new Schema({
    question:{
        type:String,
        maxlength: 50
    },
    answer:{
        type:String,
        maxlength: 100
    }
 })

let FlashcardSchema = new Schema({
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
   }

})

const Flashcard = dbConnection.model('Flashcard', FlashcardSchema);

module.exports = {Flashcard, CardSchema};