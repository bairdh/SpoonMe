const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// using async to send multiple queries to the database
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log(`In sendRecipe POST`);
    let recipe = req.body.recipe;
        const sendRecipe = await pool.connect();
        try{
            await sendRecipe.query('BEGIN');
            let query = `INSERT INTO recipe("name", "image", user_id) VALUES($1, $2, $3) RETURNING "id";`;
            const values = [recipe.title, recipe.image, req.user.id];
            // sending Recipe POST
            const recipeResult = await sendRecipe.query(query,values);
            // GETTING Recipe id
            const recipeId = recipeResult.rows[0].id;
            await Promise.all(recipe.extendedIngredients.map(item => {
                let subQuery = `INSERT INTO ingredient("ingredient", "recipe_id") VALUES($1, $2);`;
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


router.get('/', rejectUnauthenticated, (req,res) => {
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
        // console.log(results.rows);
        res.send(results.rows)
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});

router.get(`/search/:search`, rejectUnauthenticated, (req,res) =>{
    console.log(`In GET search`);
    let userId = req.user.id;
    let search = req.params.search;
    let query = `
    SELECT r.id, r.name, r.image, r.notes, array_agg(DISTINCT(i.ingredient)) AS ingredients, array_agg(DISTINCT(d.direction)) AS directions
    FROM direction AS d
    JOIN recipe AS r
    ON d.recipe_id = r.id
    JOIN ingredient AS i
    ON r.id = i.recipe_id
    WHERE r.user_id = $1
    AND r.name ILIKE $2
    GROUP BY r.id;`;
    
    pool.query(query, [userId, `%${search}%`]).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

router.get('/:id', rejectUnauthenticated, (req, res) =>{
    console.log('In get One Recipe!')

    let query = `
    SELECT r.id, r.name, r.image, r.notes, json_agg(DISTINCT jsonb_build_object('id', i.id, 'ingredient', i.ingredient)) AS ingredients, json_agg(DISTINCT jsonb_build_object('id', d.id, 'direction', d.direction)) AS directions
    FROM ingredient AS i
    JOIN recipe AS r
    ON i.recipe_id = r.id
    JOIN direction AS d
    ON r.id = d.recipe_id
    WHERE r.id = $1
    GROUP BY r.id;`

    let id = req.params.id;

    pool.query(query, [id]).then(result => {
        // console.log(result.rows);
        // console.log(JSON.stringify(result.rows));
        
        res.send(result.rows)
    }).catch(err=>{
        console.log(err);
        res.sendStatus(500);
    })
})

router.post('/create', rejectUnauthenticated, async (req, res) => {
    console.log(`In create Recipe`);
    
    let recipe = req.body;
    const createRecipe = await pool.connect();
    try{
        await createRecipe.query('BEGIN');
        let query = `
        INSERT INTO recipe("name", "image", "notes", "user_id")
        VALUES ($1, $2, $3, $4) RETURNING "id";`;
        const result = await createRecipe.query(query, [recipe.name, recipe.image, recipe.notes, req.user.id]);
        const newRecipeId = result.rows[0].id;
        console.log(result.rows[0]);
        
        await Promise.all(recipe.ingredients.map(item => {
            let = subQuery = `INSERT INTO ingredient("ingredient", "recipe_id") VALUES($1, $2);`;
            createRecipe.query(subQuery, [item, newRecipeId]);
        }))
        await Promise.all(recipe.directions.map((step, i) => {
            let subQuery = `INSERT INTO direction("step", "direction", "recipe_id") VALUES($1, $2, $3);`
            createRecipe.query(subQuery, [(i + 1), step, newRecipeId]);
        }))
        await createRecipe.query('COMMIT');
        res.sendStatus(200);
    }catch(err){
        await createRecipe.query('ROLLBACK');
        throw err;
    }finally{
        createRecipe.release();
    }
})

router.put(`/deleteItem/:item/:id`, rejectUnauthenticated, (req, res) => {
    let id = req.params.id;
    let item = req.params.item;
    let query;
    console.log(`In delete Ingredients!`, item);

    if(item === 'ingredient'){
        query = `
        DELETE FROM ingredient
        WHERE "id" = $1
        RETURNING recipe_id;`;
    }
    else if (item === 'direction'){
        query = `
        DELETE FROM direction
        WHERE "id" = $1
        RETURNING recipe_id;`;
    }

    pool.query(query, [id]).then(result =>{
        res.send(result.rows[0]);
        console.log(result.rows[0]);
        
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    }) 
})

router.post('/addItem', rejectUnauthenticated, (req, res) =>{
    console.log(`In Add Item:`, req.body);
    
    let item = req.body.item;
    let recipeId = req.body.recipe;
    let query;
    let values = [];

    if(item === "ingredient"){
        query = `
        INSERT INTO ingredient("ingredient", "recipe_id")
        VALUES($1, $2)
        RETURNING recipe_id;`;

        values = [req.body.ingredient, recipeId];
    }
    else if (item === "direction"){
        query = `
        INSERT INTO direction("step", "direction", "recipe_id")
        VALUES($1, $2, $3)
        RETURNING recipe_id;`;

        values= [req.body.step, req.body.direction, recipeId];
    }
    pool.query(query, values).then(result => {
        console.log(`returning ID:`, result.rows[0].recipe_id);
        res.send(result.rows[0]);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

router.put('/edit', rejectUnauthenticated, (req, res) =>{
    console.log(`In Edit`);
    let id = req.body.id
    let type = req.body.type;
    let change = req.body.change
    let query;
    let values = [change, id];

    if(type === "ingredient"){
        query = `
        UPDATE "ingredient"
        SET ingredient = $1
        WHERE "id" = $2
        RETURNING recipe_id;`;
    }else if(type === "direction"){
        query = `
        UPDATE "direction"
        SET direction = $1
        WHERE "id" = $2
        RETURNING recipe_id;`;
    }else if(type === "notes"){
        query = `
        UPDATE "recipe"
        SET notes = $1
        WHERE "id" = $2
        RETURNING id AS recipe_id;`;
    }

    pool.query(query, values).then(result =>{        
        res.send(result.rows[0]);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

router.delete(`/deleteRecipe/:id`, rejectUnauthenticated, (req,res) => {
    let id = req.params.id;
    let query = `
    DELETE FROM recipe
    WHERE id = $1;`

    pool.query(query, [id]).then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;
