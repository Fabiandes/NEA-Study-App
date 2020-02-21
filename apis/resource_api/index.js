//========REQUIREMENTS========
const express = require('express');
const app = express();

const ResourceManager = require('./src/controller');

//========ENVIROMENT-VARIABLES========
const PORT = process.env.PORT || 6000;

//========ROUTES========
app.get('/:username/:filetype/:filename',(req,res)=>{
    //Get the JSON file
    const directory = `${req.params.username}/${req.params.filetype}/${req.params.filename}`
    console.log("Getting file from: " + directory);
    
    //ResourceFetcher.getFile(req.params.username,req.params.filetype,req.params.filename);
})

app.post('/note',(req,res)=>{
    //We need the user name to update who actually has access to this note.
    const username = req.cookies.username;
    //Call the user service to update the user.
    const title = req.body.title;
    const body = req.body.body
    ResourceManager.StoreNote(title, body)
})

app.listen(PORT,()=>{
    console.log("Resource API listening on port " + PORT);
})

