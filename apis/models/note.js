const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CardSetSchema = require('./cardset').CardSetSchema

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
   questions:{
        type:CardSetSchema
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

const Note = mongoose.model('Note', NoteSchema);

module.exports = {Note, NoteSchema};