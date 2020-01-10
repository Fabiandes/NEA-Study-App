require('dotenv').config()
const axios = require('axios');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');
//const saltRounds = 10;

const createUserObject = async(user)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("B4c0/\/", salt, function(err, hash) {
            if(!err){
                const userObject = {
                    username: user.username,
                    hash, 
                    email: user.email,
                    phone: user.phone,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                return userObject;
            }
        });
    });
    return;
    //hash = await bcrypt.hash(user.password, saltRounds)
    // const userObject = {
    //     username: user.username,
    //     hash, 
    //     email: user.email,
    //     phone: user.phone,
    //     firstName: user.firstName,
    //     lastName: user.lastName
    // }
}

const login = async(user)=>{
    try {
         //Query DB
        const response = await axios.get(process.env.user_db_url,{params:{username:user.username}});
        if(response.status === 200){
            const data = {
                username: response.username,
                roles: response.roles
            }
            if(response.hash === user.password){
                const token = await jwt.sign(data, process.env.token_key,{expiresIn: '2 days'});
                return token;
            }  
        } 
        return;
    } catch (err) {
        console.log(err);
    }
}

const register = async(user)=>{
    try {
        //Query DB
        const userObject = createUserObject(user);
        const response = await axios.post(process.env.user_db_url + '/user', userObject);
        console.log(response)
        if(response.status === 200){
            return userObject;
        }
    } catch (err) {
       console.log(err);
    }
}

module.exports = {register,login};