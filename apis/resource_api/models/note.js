const mongoose = require('mongoose');
const USERNAME = process.env.db_username || 'test-user';
const PASSWORD = process.env.db_password || 'dW1JJglBFeca4R3T'
const DB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@studyapp-kyldd.mongodb.net/test?retryWrites=true&w=majority`;
const Schema = mongoose.Schema;
const dbConnection = mongoose.createConnection(DB_URI,{ useNewUrlParser: true }).catch((err)=>{console.log("Failed to connect to Note DB")})

let NoteSchema = new Schema({
   title:{
       type: String,
       required:true,
       maxlength: 50
   },
   body:{
       type: String
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

const Note = dbConnection.model('Note', NoteSchema);

module.exports = {Note};