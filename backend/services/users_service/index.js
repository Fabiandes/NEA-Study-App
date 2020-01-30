require('dotenv').config();
const auth = require('./src/authenticator');

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

//Log a user in
app.post('/login',async(req,res)=>{
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
app.post('/register', async(req,res)=>{
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

app.listen(process.env.authPort,()=>{
    console.log('Server is listening on port ' + process.env.authPort);
});