const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SubjectSchema = require('./subject').SubjectSchema;

let userSchema = new Schema({
    username:{
        type:String,
        maxlength:30,
        minlength:3,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        maxlength:30, 
        minlength:1,
        required:true,
    },
    lastName:{
        type:String,
        maxlength:30,
        minlength:1,
        required:true,
    },
    email:{
        type:String,
        maxlength:100,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        maxlength:20,
    },
    hash:{
        type:String,
        required:true,
    },
    roles:{
        type:Array,
        default:[]
    },
    subjects:{
        maxlength:200,
        default:[],
        type:[SubjectSchema]
    },
    joinDate:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model('User', userSchema);

module.exports = {User};