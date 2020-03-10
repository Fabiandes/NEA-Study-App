//========REQUIREMENTS========
const express = require('express');
const app = express.Router();
const axios = require('axios');

const authURI = process.env.authURI || 'http://localhost:5000/api/v1/auth/'
const ResourceManager = require('../src/resource_controller');

//========ENVIROMENT-VARIABLES========
const PORT = process.env.PORT || 6000;

//========ROUTES========

//Create subject
app.post('/subject',(req,res)=>{
    try {
        const username = req.body.username;
        const subject_name = req.body.subject_name;
        console.log(`Creating note for ${username} called ${subject_name}`)
        ResourceManager.CreateSubject(username, subject_name);
        res.status(200);
    } catch (err) {
        res.statusMessage = 'Server Error.';
        res.status(500);
    }
    res.send()
})
//Create Topic
app.post('/topic',(req,res)=>{
    
})
//Create note
app.post('/note',async(req,res)=>{
    //We need the user name to update who actually has access to this note.
    const token = req.cookies.token;
    //Check to see if cookie is tampered with.
    const response = await axios.post(authURI + 'verify', {
        token
    })
    if(!response.data.result){
        //Needs to login as token is wrong
    }else{
        //Call the user service to update the user.
        const title = req.body.title;
        const body = req.body.body
        ResourceManager.StoreNote(title, body)
    }
})
//Add questions to note
app.post('/question',(req,res)=>{
    
})
//Create flashcards
app.post('/flashcard',(req,res)=>{
    
})

//Get subjects
//Get topics
//Get notes
//Get questiond
//Get flashcards


module.exports = {app}

