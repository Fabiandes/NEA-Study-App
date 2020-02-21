//========REQUIREMENTS========
const express = require('express');
const app = express().Router();
const axios = require('axios');

const authURI = process.env.authURI || 'http://localhost:5000/api/v1/auth/'
const ResourceManager = require('../src/resource_controller');

//========ENVIROMENT-VARIABLES========
const PORT = process.env.PORT || 6000;

//========ROUTES========

app.post('/note',(req,res)=>{
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

module.exports = {app}

