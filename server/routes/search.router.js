const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

router.get('/random', (req,res) => {
    //Only sending 1 random result at a time 
    console.log(`Got to the router!`);
    
    axios.get('https://api.spoonacular.com/recipes/random?number=1&apiKey=' + process.env.SPOON_API)
    .then( result => {
        console.log(`data:`, result.data);
        console.log(`data.recipes:`, result.data);
        res.send(result.data)
    }).catch(err =>{
        console.log(err);
        res.sendStatus(500);
    })
})







module.exports = router;