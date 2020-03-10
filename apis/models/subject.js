const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = require('./topic').TopicScehma;

const SubjectSchema = new Schema({
    SubjectName:{
        maxlength:50,
        minlength:1,
        required:true,
        type:String
    },
    Topics:{
        maxlength: 150,
        default:[],
        type:[TopicSchema]
    },
    // Events:{
    //     maxlength:50,
    //     type: []
    // },
    LastAccessed:{
        type:Date,
        default:Date.now()
    },
    Created:{
        type:Date,
        default:Date.now()
    }
});

const Subject = mongoose.model('Subject', SubjectSchema);
module.exports = {Subject, SubjectSchema};