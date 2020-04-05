const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || 6000;
const mongoose = require('mongoose');

const DBUSERNAME = process.env.db_username || 'test-user';
const DBPASSWORD = process.env.password || 'dW1JJglBFeca4R3T';
const DBURI = `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@studyapp-kyldd.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(DBURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connected to DB"))
.catch((err)=>{
    console.log("error connecting to DB")
    console.log(err)
})

const app = express();
var cookieParser = require('cookie-parser')
app.use(cookieParser())
//app.use(require('express-status-monitor')());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//========ROUTES========
const resourceRoutes = require('./routes/resource_router').app;
const userRoutes = require('./routes/user_router').app;

app.use('/api/v1/resource/', resourceRoutes)
app.use('/api/v1/user/', userRoutes)

app.listen(PORT, ()=>{
    console.log("APIs listening on port " + PORT)
})