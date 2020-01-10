require('dotenv').config()
const controller = require('./src/controller.js');

const express = require('express');
const app = express();

app.use(require('express-status-monitor')());

//Get a user
//Add username from query
app.get('/user',async(req,res)=>{
    try {
        const user = await controller.getUser();
        if(!user){
            res.statusMessage = 'User not found.';
            res.status(404);
        }else{
            res.json(user);
        }
    } catch (err) {
        res.statusMessage = 'Server Error.';
        res.status(500);        
    }
})

//Create a user
app.post('/user',async(req,res)=>{
    console.log("Register Request")
    try {
        console.log(req)
        const user = await controller.createUser(req.body);
        if(user){
            res.status(200);
        }else{
            res.statusMessage = 'User already exists';
            res.status(409);
        }
    } catch (err) {
        console.log(err)
        res.statusMessage = 'Server Error.';
        res.status(500);
    }
})

//Remove a user
//Update a user

//Start Server
app.listen(process.env.userPort,()=>{
    console.log('User API starting on port ' + process.env.userPort);
});
