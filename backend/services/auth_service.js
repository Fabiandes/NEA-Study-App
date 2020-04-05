const axios = require('axios');
var axiosInstance = axios.create({
    validateStatus: function (status) {
        return status >= 200 && status < 300 || (status === 409) || (status === 404);
    },
});
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = process.env.saltRounds || 12;

const createUserObject = async(user)=>{
    hash = await bcrypt.hash(user.password, saltRounds)
    const userObject = {
        username: user.username,
        hash, 
        email: user.email,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName
    }
    return userObject
}

const login = async(user)=>{
    try {
         //Query DB
         const url = 'http://api:6000/user/' + user.username
         console.log("Making request to " + url)
        const response = await axiosInstance.get(url);
        if(response.status === 200){
            const data = {
                username: response.data.username,
                roles: response.data.roles
            }
            if(await bcrypt.compare(user.password,response.data.hash)){
                const token = await jwt.sign(data,process.env.token_key,{expiresIn: '2 days'});
                return token;
            } 
        }
    } catch (err) {
        throw new Error(err)
    }
}

const register = async(user)=>{
    try {
        //Query DB
        const userObject = await createUserObject(user);
        const url = 'http://api:6000/user/'
        console.log("Making a request to " + url + " with data:\n" + JSON.stringify(userObject))
        const response = await axiosInstance.post(url, userObject);
        return response.status
    } catch (err) {
        console.log(err)
    }
}

module.exports = {register,login};