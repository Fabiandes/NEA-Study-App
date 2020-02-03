const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT;

const app = express();
app.use(require('express-status-monitor')());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//========ROUTES========


app.listen(PORT,()=>{
    console.log("Backend listening on port " + PORT)
})