require('dotenv').config()
const controller = require('./src/controller.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(require('express-status-monitor')());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Get a user
//Add username from query
app.get('/user/:username',async(req,res)=>{
    try {
        const user = await controller.getUser(req.params.username);
        console.log("Time to direct")
        if(user === undefined){
            res.statusMessage = 'User not found.';
            res.status(404);
        }else{
            console.log("user: " + user.username)
            res.json(user);
        }
        console.log("Nothing")
    } catch (err) {
        console.log("Error:" + err)
        res.statusMessage = 'Server Error.';
        res.status(500);   
    }
    res.send()  
})

//Create a user
app.post('/user',async(req,res)=>{
    console.log("Register Request")
    try {
        console.log("Body: " + JSON.stringify(req.body))
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
    res.send()
})

//Remove a user
//Update a user

//Start Server
app.listen(process.env.userPort,()=>{
    console.log('User API starting on port ' + process.env.userPort);
});
