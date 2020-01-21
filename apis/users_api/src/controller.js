const mongoose = require('mongoose');
require('dotenv').config()
const NodeCache = require('node-cache');
const userCache = new NodeCache();

const dbConnection = mongoose.createConnection(process.env.db_uri);
const Schema = mongoose.Schema;
//Todo
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

const User = dbConnection.model('User', userSchema);

//Connect to db
const getUser = async(username)=>{
    console.log("Getting: " + username)
    console.log("Looking in Cache")
    const cacheQuery = userCache.get(username)
    console.log("Not in Cache")
    if(cacheQuery){
        return cacheQuery
    }else{
        console.log("Looking in Db")
        const user = await User.findOne({username:username}).exec()
        console.log("DB search")
        if(user){
            console.log("User Found")
            userCache.set(username, user);
            return user;
        }
    }
    console.log("User not found")
    return
}

const checkUserExists = async(user)=>{
    const exists = await User.findOne({$or: [{username:user.username}, {email:user.email}]}).exec()
    if(exists){
        return true
    }else{
        return false
    }
}

const createUser = async(user)=>{
    if(await checkUserExists(user)){
        console.log("User exists")
    }else{
        console.log("Creating DB entry")
        //Create to DB
        await User.create(user)
        //Add to cache
        console.log("Adding to cache")
        userCache.set(user.username, user);
        //Return user
        return user
    }
}

module.exports = {getUser,createUser};