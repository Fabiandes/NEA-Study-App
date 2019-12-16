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

module.exports = {getUser};