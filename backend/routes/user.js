const auth = require('../services/auth_service');
const UserService = require('../services/user_service');

const express = require('express');
const router = express.Router();

//Log a user in
router.post('/login',async(req,res)=>{
    const user = {username: req.body.username, password: req.body.password};
    try {
        const token = await auth.login(user);
        if(token){
            res.cookie('token',token);
        }else{
            res.statusMessage = 'Incorrect Credentials.'
            res.status(401);
        } 
    } catch (err) {
        console.log(err)
        res.statusMessage= 'Server Error.'
        res.status(500);
    }
    res.send()
});

//Register a user
router.post('/register', async(req,res)=>{
    const user = {
         username: req.body.username,
         password: req.body.password, 
         email: req.body.email,
         phoneNumber: req.body.phone,
         firstName: req.body.firstName,
         lastName: req.body.lastName
    }
    try {
        const responseStatus = await auth.register(user);
        // switch(responseStatus){
        //     case 200:
        //         console.log("User Created: " + userObject);
        //         res.status(200)
        //         break;
        //     case 409:
        //         res.status(409)
        //         res.statusMessage = "User already exists"
        //     default:
        //         throw new Error("Status: " + responseStatus)
        // }
        if(responseStatus === 200){
            console.log("User Created: " + user);
            res.status(200)
        }else{
            if(responseStatus === 409){
                res.status(409)
                res.statusMessage = "User already exists"
            }else{
                throw new Error("Status: " + responseStatus)
            }
        }
    } catch (err) {
        console.log(err)
        res.statusMessage = 'Server Error.'
        res.status(500);
    }
    res.send()
})

router.get('/dashboard',async(req,res)=>{
    const data = await UserService.GetDashboard();
    res.send(data);
})

module.exports ={router}