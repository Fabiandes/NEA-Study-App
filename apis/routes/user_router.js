const controller = require('../src/user_controller');

const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5050;

app.use(require('express-status-monitor')());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Get a user
//Add username from query
app.get('/:username',async(req,res)=>{
    try {
        const user = await controller.getUser(req.params.username);
        if(user === undefined){
            res.statusMessage = 'User not found.';
            res.status(404);
        }else{
            res.json(user);
        }
    } catch (err) {
        console.log("Error:" + err)
        res.statusMessage = 'Server Error.';
        res.status(500);   
    }
    res.send()  
})

//Create a user
app.post('/',async(req,res)=>{
    try {
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
//Get a users subjects

module.exports = {app}
