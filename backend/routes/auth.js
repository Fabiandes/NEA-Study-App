const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Move logic into service
router.post('/verify',(req,res)=>{
    //return true or false
    let data = ''
    const token = req.body.token;
    jwt.verify(token, process.env.token_key, function(err, decoded) {
        result = true;
        data = decoded;
      });
    
    res.send({result,data});
})

module.exports = {router}