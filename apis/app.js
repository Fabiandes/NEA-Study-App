const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || 6000;

const app = express();
app.use(require('express-status-monitor')());
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