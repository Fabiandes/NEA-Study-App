const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
   title:{
       type: String,
       required:true,
       maxlength: 50
   },
   body:{
       type: String,
       required:true
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