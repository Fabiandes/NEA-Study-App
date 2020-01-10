const mongoose = require('mongoose');
require('dotenv').config()
const NodeCache = require('node-cache');
const userCache = new NodeCache();

const dbConnection = mongoose.createConnection(process.env.db_uri);
const Schema = mongoose.Schema;
//Todo
let userSchema = new Schema({
    username:{},
    email:{},
    hash:{},
    roles:{}
})

const User = dbConnection.model('User', userSchema);

//Connect to db
const getUser = async(username)=>{
    console.log("Getting user")
    const cacheQuery = userCache.get(username)
    if(cacheQuery){
        return cacheQuery
    }else{
        const user = await User.findOne({username}).exec();
        if(user){
            userCache.set(username, user);
            return user;
        }
    }
    return
}

const createUser = async(user)=>{
    if(await getUser(user.username)){
        console.log("User exists")
        return
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