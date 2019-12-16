require('dotenv').config();
const auth = require('./src/autenication').authenicator;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(require('express-status-monitor')());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Start a https server.
//Define Routes.
//Logging
//Monitoring.

app.post('/login',async(req,res)=>{
    const user = {username: req.body.username, password: req.body.password};
    const token = await auth.login(user);
    if(token){
        res.cookie('token',token);
    }else{
        res.statusMessage('Incorrect Credentials.')
        res.status(401);
    }
});

app.listen(process.env.port,()=>{
    console.log('Server is listening on port ' + process.env.port);
});