const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI || 'mongodb+srv://fabiandes:Tablelegs123@studyapp-kyldd.mongodb.net/test?retryWrites=true&w=majority';

const Schema = mongoose.Schema;
const dbConnection = mongoose.createConnection(DB_URI,{ useNewUrlParser: true });
const User = dbConnection.model('User', userSchema);

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
        type:Array
    },
    joinDate:{
        type:Date,
        default:Date.now
    }
})

module.exports = {User};