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
app.post('/subject',async(req,res)=>{
    try {
        const username = req.body.username.trim();
        const subject_name = req.body.subject_name.trim();
        //Query the database to update the user and return the number of entities that were modified.
        const nModified = await ResourceManager.CreateSubject(username, subject_name);
        //If a user was modified then we know that the user exists and was sucessfully updated. If not 1 then user doesn't exist
        if(nModified == 1){
            res.status(200);
        }else{
            res.statusMessage = "User not found"
            res.status(404)
        }
    } catch (err) {
        res.statusMessage = 'Server Error.';
        res.status(500);
    }
    res.send()
})
//Create Topic
app.post('/topic',async(req,res)=>{
    const username = req.body.username.trim();
    const subjectName = req.body.subject_name.trim();
    const topicName = req.body.topic_name.trim();
    const nModified = await ResourceManager.CreateTopic(username, subjectName, topicName);
    if(nModified == 1){
        res.status(200)
    }else{
        res.status(404)
        res.statusMessage = "User not found"
    }
    res.send()
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

