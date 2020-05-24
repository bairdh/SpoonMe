const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

router.get('/random', (req,res) => {
    //Only sending 1 random result at a time 
    console.log(`Got to the router!`);
    
    axios.get('https://api.spoonacular.com/recipes/random?number=12&apiKey=' + process.env.SPOON_API)
    .then( result => {
        // console.log(`ingredints:`, result.data.recipes.extendedIngredients);
        // console.log(`data.recipes:`, result.data);
        res.send(result.data)
    }).catch(err =>{
        console.log(err);
        res.sendStatus(500);
    })
})

router.get('/:search', (req,res) => {
    let search = req.params.search;
    console.log(search);
    
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=1&sort=random&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true&apiKey=${process.env.SPOON_API}`)
    .then(result => {
        console.log(`DATA:`, result.data);
        console.log(`analyzedInstructions:`, result.data.results[0].analyzedInstructions);
        // console.log(`steps:`, result.data.results[0].analyzedInstructions[0].steps);
        res.send(result.data)
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})







module.exports = router;