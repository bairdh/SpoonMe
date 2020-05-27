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
            let query = `INSERT INTO recipe("name", "image", user_id)` + `VALUES($1, $2, $3) RETURNING "id";`;
            const values = [recipe.title, recipe.image, req.user.id];
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
});


router.get('/', (req,res) => {
    console.log(`In GET USER RECIPES! Ive Changed`);
    let userId = req.user.id;
    let query = `
    SELECT r.id, r.name, r.image, r.notes, array_agg(DISTINCT(i.ingredient)) AS ingredients, array_agg(DISTINCT(d.direction)) AS directions
    FROM direction AS d
    JOIN recipe AS r
    ON d.recipe_id = r.id
    JOIN ingredient AS i
    ON r.id = i.recipe_id
    WHERE r.user_id = $1
    GROUP BY r.id;`;

    pool.query(query, [userId]).then(results => {
        console.log(results.rows);
        res.send(results.rows)
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});

module.exports = router;