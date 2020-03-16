const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CardSetSchema = require('./cardset').CardSetSchema
const NoteSchema = require('./note').NoteSchema

const TopicSchema = new Schema({
    TopicName:{
        maxlength:50,
        minlength:1,
        required:true,
        unique:true,
        type:String
    },
    Notes:[{
        maxlength: 250,
        default: [],
        type: NoteSchema
    }],
    Flashcards:{
        maxlength: 250,
        default:[],
        type:[CardSetSchema]
    },
    LastAccessed:{
        type:Date,
        default:Date.now()
    },
    Created:{
        type:Date,
        default:Date.now()
    }
});

const Topic = mongoose.model('Topic', TopicSchema);
module.exports = {Topic, TopicSchema};