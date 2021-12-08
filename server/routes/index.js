var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', controllers.createUser);

router.get('/userId/:id',controllers.getUserById);

router.get('/users', controllers.getAllUsers);

router.get('/userItems/:id',controllers.getItemsByUser);

router.get('/items',controllers.getAllItems);

router.get('/userCreds/:email/:pass', controllers.getUserByCreds);

router.get('/getItemUPC/:upc', controllers.getItemByUPC);

router.get('/getItemName/:name/:numberOfResults', controllers.getItemByName);

router.get('/recipes/autocomplete/:name/:numberOfResults?', controllers.getRecipeSuggestions);

router.get('/getItemSuggest/:name/:numberOfResults?/:intolerances?', controllers.getItemSuggestion);

router.get('/getItemId/:id', controllers.getItemByID);

router.post('/addItemBatch', controllers.addItemBatch);

router.post('/getRecipeByIngredients', controllers.getRecipeIngredients);





module.exports = router;
