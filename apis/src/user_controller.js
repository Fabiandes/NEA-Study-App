const mongoose = require('mongoose');
const NodeCache = require('node-cache');
const userCache = new NodeCache();
const User = require('../models/user')

//Connect to db
const getUser = async(username)=>{
    const cacheQuery = userCache.get(username)
    if(cacheQuery){
        return cacheQuery
    }else{
        const user = await User.findOne({username:username}).exec()
        if(user){
            userCache.set(username, user);
            return user;
        }
    }
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
    if(!await checkUserExists(user)){
        //Create to DB
        await User.create(user)
        //Add to cache
        userCache.set(user.username, user);
        //Return user
        return user
    }
}

//Create subject
const CreateSubject = (username, name)=>{
    const subject = new Subject({
        SubjectName:name
    })
    //Append this to users subjects
    User.update(
        { username: username }, 
        { $push: { subjects: subject } },
        done
    );
}
module.exports = {getUser,createUser};