const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

let recipe = { "recipes": [{ "vegetarian": true, "vegan": false, "glutenFree": false, "dairyFree": false, "veryHealthy": false, "cheap": false, "veryPopular": false, "sustainable": false, "weightWatcherSmartPoints": 12, "gaps": "no", "lowFodmap": false, "aggregateLikes": 8, "spoonacularScore": 12, "healthScore": 1, "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit", "license": "CC BY 3.0", "sourceName": "Foodista", "pricePerServing": 47.18, "extendedIngredients": [{ "id": 1001, "aisle": "Milk, Eggs, Other Dairy", "image": "butter-sliced.jpg", "consistency": "solid", "name": "butter", "original": "1/2 cup melted butter", "originalString": "1/2 cup melted butter", "originalName": "melted butter", "amount": 0.5, "unit": "cup", "meta": ["melted"], "metaInformation": ["melted"], "measures": { "us": { "amount": 0.5, "unitShort": "cups", "unitLong": "cups" }, "metric": { "amount": 118.294, "unitShort": "ml", "unitLong": "milliliters" } } }, { "id": 1230, "aisle": "Milk, Eggs, Other Dairy", "image": "buttermilk.jpg", "consistency": "solid", "name": "buttermilk", "original": "1 1/4 cup buttermilk", "originalString": "1 1/4 cup buttermilk", "originalName": "buttermilk", "amount": 1.25, "unit": "cup", "meta": [], "metaInformation": [], "measures": { "us": { "amount": 1.25, "unitShort": "cups", "unitLong": "cups" }, "metric": { "amount": 295.735, "unitShort": "ml", "unitLong": "milliliters" } } }, { "id": 1123, "aisle": "Milk, Eggs, Other Dairy", "image": "egg.png", "consistency": "solid", "name": "eggs", "original": "3 eggs", "originalString": "3 eggs", "originalName": "eggs", "amount": 3, "unit": "", "meta": [], "metaInformation": [], "measures": { "us": { "amount": 3, "unitShort": "", "unitLong": "" }, "metric": { "amount": 3, "unitShort": "", "unitLong": "" } } }, { "id": 20081, "aisle": "Baking", "image": "flour.png", "consistency": "solid", "name": "flour", "original": "2 tablespoons flour", "originalString": "2 tablespoons flour", "originalName": "flour", "amount": 2, "unit": "tablespoons", "meta": [], "metaInformation": [], "measures": { "us": { "amount": 2, "unitShort": "Tbsps", "unitLong": "Tbsps" }, "metric": { "amount": 2, "unitShort": "Tbsps", "unitLong": "Tbsps" } } }, { "id": 19335, "aisle": "Baking", "image": "sugar-in-bowl.png", "consistency": "solid", "name": "sugar", "original": "1 cup sugar", "originalString": "1 cup sugar", "originalName": "sugar", "amount": 1, "unit": "cup", "meta": [], "metaInformation": [], "measures": { "us": { "amount": 1, "unitShort": "cup", "unitLong": "cup" }, "metric": { "amount": 236.588, "unitShort": "ml", "unitLong": "milliliters" } } }, { "id": 18334, "aisle": "Refrigerated", "image": "pie-crust.jpg", "consistency": "solid", "name": "unbaked pie shell", "original": "1 unbaked 9-inch pie shell (see below)", "originalString": "1 unbaked 9-inch pie shell (see below)", "originalName": "unbaked 9-inch pie shell (see below)", "amount": 1, "unit": "", "meta": ["(see below)"], "metaInformation": ["(see below)"], "measures": { "us": { "amount": 1, "unitShort": "", "unitLong": "" }, "metric": { "amount": 1, "unitShort": "", "unitLong": "" } } }, { "id": 2050, "aisle": "Baking", "image": "vanilla.jpg", "consistency": "solid", "name": "vanilla extract", "original": "1 teaspoon vanilla extract", "originalString": "1 teaspoon vanilla extract", "originalName": "vanilla extract", "amount": 1, "unit": "teaspoon", "meta": [], "metaInformation": [], "measures": { "us": { "amount": 1, "unitShort": "tsp", "unitLong": "teaspoon" }, "metric": { "amount": 1, "unitShort": "tsp", "unitLong": "teaspoon" } } }], "id": 639578, "title": "Classic Buttermilk Pie", "readyInMinutes": 75, "servings": 10, "sourceUrl": "http://www.foodista.com/recipe/NC36SRQN/classic-buttermilk-pie", "image": "https://spoonacular.com/recipeImages/639578-556x370.jpg", "imageType": "jpg", "summary": "Classic Buttermilk Pie might be just the dessert you are searching for. One serving contains <b>281 calories</b>, <b>4g of protein</b>, and <b>16g of fat</b>. For <b>47 cents per serving</b>, this recipe <b>covers 4%</b> of your daily requirements of vitamins and minerals. This recipe from Foodista has 8 fans. It is a good option if you're following a <b>vegetarian</b> diet. From preparation to the plate, this recipe takes about <b>1 hour and 15 minutes</b>. Head to the store and pick up butter, unbaked 9-inch pie shell, eggs, and a few other things to make it today. All things considered, we decided this recipe <b>deserves a spoonacular score of 16%</b>. This score is not so excellent. Try <a href=\"https://spoonacular.com/recipes/classic-buttermilk-pancakes-618002\">Classic Buttermilk Pancakes</a>, <a href=\"https://spoonacular.com/recipes/-grilled-garlic-buttermilk-chicken-salad-with-buttermilk-tahini-dressing-494057\">[] Grilled Garlic & Buttermilk Chicken Salad with Buttermilk-Tahini Dressing</a>, and <a href=\"https://spoonacular.com/recipes/buttermilk-waffles-with-buttermilk-fried-chicken-tenders-750200\">Buttermilk Waffles with Buttermilk Fried Chicken Tenders</a> for similar recipes.", "cuisines": [], "dishTypes": ["side dish"], "diets": ["lacto ovo vegetarian"], "occasions": [], "winePairing": {}, "instructions": "<ol><li>Preheat oven to 325 degrees.</li><li>Beat eggs slightly and add sugar and flour. Then add melted butter and mix well. Add buttermilk and vanilla and mix.</li><li>Dust the unbaked pie shell with a little bit of flour. Pour batter into shell, and then sprinkle a little more flour on top.</li><li>Bake at 325 degrees until the custard is set, approximately 1 hour.</li></ol>", "analyzedInstructions": [{ "name": "", "steps": [{ "number": 1, "step": "Preheat oven to 325 degrees.Beat eggs slightly and add sugar and flour. Then add melted butter and mix well.", "ingredients": [{ "id": 1001, "name": "butter", "image": "butter-sliced.jpg" }, { "id": 20081, "name": "all purpose flour", "image": "flour.png" }, { "id": 19335, "name": "sugar", "image": "sugar-in-bowl.png" }, { "id": 1123, "name": "egg", "image": "egg.png" }], "equipment": [{ "id": 404784, "name": "oven", "image": "oven.jpg" }] }, { "number": 2, "step": "Add buttermilk and vanilla and mix.Dust the unbaked pie shell with a little bit of flour.", "ingredients": [{ "id": 18334, "name": "unbaked pie crust", "image": "pie-crust.jpg" }, { "id": 1230, "name": "buttermilk", "image": "buttermilk.jpg" }, { "id": 2050, "name": "vanilla", "image": "vanilla.jpg" }, { "id": 20081, "name": "all purpose flour", "image": "flour.png" }], "equipment": [] }, { "number": 3, "step": "Pour batter into shell, and then sprinkle a little more flour on top.", "ingredients": [{ "id": 20081, "name": "all purpose flour", "image": "flour.png" }], "equipment": [] }, { "number": 4, "step": "Bake at 325 degrees until the custard is set, approximately 1 hour.", "ingredients": [], "equipment": [] }] }], "originalId": null, "spoonacularSourceUrl": "https://spoonacular.com/classic-buttermilk-pie-639578" }] };


router.get('/random', (req,res) => {
    //Only sending 1 random result at a time 
    console.log(`Got to the router!`);
    
    axios.get('https://api.spoonacular.com/recipes/random?number=12&apiKey=' + process.env.SPOON_API)
    .then( result => {
        console.log(`data.recipes:`, JSON.stringify(result.data));
        res.send(result.data)
    }).catch(err =>{
        console.log(err);
        res.sendStatus(500);
    })

    // res.send(recipe);
});

router.get('/:search', (req,res) => {
    let search = req.params.search;
    console.log(search);
    
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=12&sort=random&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true&apiKey=${process.env.SPOON_API}`)
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