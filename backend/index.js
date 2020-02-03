const userRoutes = require('./routes/user').router;
const resourceRoutes = require('./routes/resource').router;
const socialRoutes = require('./routes/social').router;

const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(require('express-status-monitor')());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//========ROUTES========
app.use('/api/v1/user/', userRoutes)
app.use('/api/v1/resource/', resourceRoutes)
app.use('/api/v1/social/', socialRoutes)


app.listen(PORT,()=>{
    console.log("Backend listening on port " + PORT)
})