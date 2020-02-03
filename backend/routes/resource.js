const express = require('express');
const router = express.Router();

//Get cue cards
router.get('/cards',(req,res)=>{
    //Get the user id from cookies/local data
    //Make a request to the storage server with the user name and cue card param
})
//Get notes
router.get('/notes',(req,res)=>{
    //Get the user id from cookies/local data
    //Make a request to the storage server with the user name and notes param
})
//Create cue cards
router.post('/cards',(req,res)=>{
    //Get the user id from cookies/local data
    //Make a request to the storage server to either read or create a folder with the userid, then create a sub folder called cards inwhich a json file will be stored with the cards.
})
//Create notes
router.get('/notes',(req,res)=>{
    //Get the user id from cookies/local data
    //Make a request to the storage server  to either read or create a folder with the userid, then create a sub folder called notes inwhich a json file will be stored with the cards.
})

module.exports = {router}