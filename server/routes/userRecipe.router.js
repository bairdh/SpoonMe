const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// using async to send multiple queries to the database
router.post('/', async (req, res) => {
    console.log(`In sendRecipe POST`);
    let recipe = req.body.recipe;
        const sendRecipe = await pool.connect();
        try{
            await sendRecipe.query('BEGIN');
            let query = `INSERT INTO recipe("name", "image")` + `VALUES($1, $2) RETURNING "id";`;
            const values = [recipe.title, recipe.image];
            // sending Recipe POST
            const recipeResult = await sendRecipe.query(query,values);
            // GETTING Recipe id
            const recipeId = recipeResult.rows[0].id;
            await Promise.all(recipe.extendedIngredients.map(item => {
                let = subQuery = `INSERT INTO ingredient("ingredient", "recipe_id") VALUES($1, $2);`;
                const result = sendRecipe.query(subQuery, [item.original, recipeId]);
            }));
            await Promise.all(recipe.analyzedInstructions[0].steps.map(item => {
                let subQuery = `INSERT INTO direction("step", "direction", "recipe_id") VALUES($1, $2, $3)`
                const result = sendRecipe.query(subQuery, [item.number, item.step, recipeId]);
            }))
            await sendRecipe.query('COMMIT');
            res.sendStatus(200);
        } catch(err){
            console.log(`ROLLBACK:`, err);
            await sendRecipe.query("ROLLBACK");
            throw err;
        } finally{
            sendRecipe.release();
        }
})


module.exports = router;