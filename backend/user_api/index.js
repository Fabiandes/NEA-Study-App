require('dotenv').config()
const controller = require('./src/controller.js');

const express = require('express');
const app = express();

app.use(require('express-status-monitor')());

//Add username from query
app.get('/user',async(req,res)=>{
    controller.getUser();
})

//Start Server
app.listen(process.env.port,()=>{
    console.log('User API starting on port ' + process.env.port);
});
