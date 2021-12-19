// const Item = require('../model/Item');
const { User,Item,Recipe,Grocery } = require('../models');
const http = require('http');
var request = require('request');
const env = require('../env.json');
const item = require('../models/item');
const user = require('../models/user');
const recipe = require('../models/recipe');
const { nextTick } = require('process');



const healthPost = async(req, res) =>{
    try{
        return res.status(200).json(req.body);
    }
    catch(error){
        return res.status(500).json({ error: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getUserById = async(req, res)=>{
    try{
        const user = await User.findByPk(req.params.id);
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({ error: error.message })
    }
}
const createGrocery = async (req, res) => {
    var addedItems = [];
    console.log('req.body')
    console.log(req.body)
    try {
        console.log(req.body)
        var body = JSON.stringify(req.body);

            users = JSON.parse(body).user;
            items = JSON.parse(body).items
            console.log(items)
            const usr =await User.findByPk(users.intUserId);
            console.log("usr");
            console.log(usr)

            
            for(itm of items){
                itm = await Item.create(itm);
                groc = await Grocery.create({strStatus:'open'})
                await groc.addItem(itm);
                addedItems.push(await usr.addGrocery(groc));
                // console.log("adding ", itm, " to user ", usr.strFirstName)
                // addedItems.push(await usr.addItems(itm))
            };
        return res.status(201).json(addedItems,);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message, "stack" : error.stack })
    }
}
const getGrocery = async(req, res)=>{
    console.log("Get groc")
    groc = [];
    try{
        const user = await User.findOne({
            where:{
                intUserId: req.params.intUserId,
            },
            include: Grocery
        });
        for(gr of user.Groceries){
            groc.push(await Grocery.findOne({
                where:{
                    intGroceryId: gr.intGroceryId
                },
                include: Item
            }))
        }
        console.log(groc)
        return res.status(200).json(groc)
    }
    catch(error){
        return res.status(500).json({ error: error.message })
    }
}
const getUser = async(intUserId)=>{
    try{
        
        const user = await User.findByPk(intUserId.toString());
        console.log("user in get fx: ", user)
        return JSON.parse(user)
    }
    catch(error){
        console.log(error.message)
        return undefined;
    }
}
const getAllUsers = async(req, res)=>{
    try{
        const user = await User.findAll();
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({ error: error.message })
    }
}
const getItemsByUser = async(req, res)=>{
    try{
        const user = await User.findOne({
            where:{
                intUserId: req.params.id,
            },
            include: Item
        });
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({ error: error.message })
    }
}
const getAllItems = async(req, res)=>{
    try{
        const items = await Item.findAll();
        return res.status(200).json(items)
    }
    catch(error){
        return res.status(500).json({ error: error.message })
    }
}
const updateQty = async(req, res)=>{
    try{
        var item = await Item.update({intQuantity: req.body.item.intQuantity}, {where :{
            intItemId: req.body.item.intItemId
        }});
        var item = await Item.findOne(req.body.item);
        // console.log('break \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n item');
        // console.log(item);
        var t = await User.findOne({where: {
            intUserId: req.body.user.intUserId,
            '$Items.intItemId$': req.body.item.intItemId
        },
        include:[
            {model: Item},
            
            
        ]}).then(tmp=>{
            // console.log('user');
            // console.log(tmp);
            // console.log(tmp.Items)
            
        })

        // console.log('user \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n break');

        var user = await User.findOne({where: {
            intUserId: req.body.user.intUserId,
            '$Items.intItemId$': req.body.item.intItemId
        },
        include:[
            {model: Item},
            
            
        ]}).then(function(usr){
            // console.log(usr)
            return usr.update({Item:{intQuantity: parseInt(req.body.qty)}},{where:{Item:{intItemId: req.body.item.intItemId}}}).then(function(result){
                console.log(JSON.parse(JSON.stringify(result)))
                return result;
            })})
        
        // console.log(req.body.qty);
        // item = await item.update({intQuantity: parseInt(req.body.qty)});
        // console.log(item);
        // user = await user.update(item)
        // console.log(user);
        return res.status(204).json(user)
    }
    catch(error){
        return res.status(500).json({ error: error.message, stack: error.stack })
    }
}
const addItemBatch = async (req, res) => {
    // console.log('req.body')
    // console.log(req.body)
    try {
        // console.log(req.body)
        var body = JSON.stringify(req.body);
        var addedItems = [];
        if(body.includes('intUserId')){
            users = JSON.parse(body).user;
            items = JSON.parse(body).items
            // console.log(items)
            const usr =await User.findByPk(users.intUserId);
            // console.log(usr)

            
                for(itm of items){
                    itm = await Item.create(itm);
                    // console.log("adding ", itm, " to user ", usr.strFirstName)
                    await usr.addItems(itm)
                    addedItems.push(itm)
                };
            
        }else{

            items = JSON.parse(JSON.stringify(req.body))
            
            for(itm of items){
                // console.log("adding ", itm)
                addedItems.push(await Item.create(itm))
            };
        }
        return res.status(201).json(addedItems,);
    } catch (error) {
        return res.status(500).json({ error: error.message, "stack" : error.stack })
    }
}
const getUserByCreds = async(req, res)=>{
    try {
        const user = await User.findOne({where:{
            strEmailAddress: req.params.email,
        }})
        console.log(user.values);
        if(user.dataValues.strPassword === req.params.pass){
            return res.status(200).json(user)

        }else{
            return res.status(403).json({error: 'Invalid email/password combination'});
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const getItemByUPC = async(req, res)=>{
    try {
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/upc/' + req.params.upc,
            headers: {
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'x-rapidapi-key': '815fe80cd9msh2d8fb201641104fp1919d5jsnfd64f7e24419',
              useQueryString: true
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            
            // console.log(response.body);
          });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const getItemByName= async(req, res)=>{
    try {
        var options = {
            'method': 'GET',
            'url': 'https://api.spoonacular.com/food/products?query=' + req.params.name + '&number=' + req.params.numberOfResults + '&apiKey=' + env.spoonacular['api-key'],
            'headers': {
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            
            // console.log(response.body);
          });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const getItemByID= async(req, res)=>{
    try {
        var options = {
            'method': 'GET',
            'url': 'https://api.spoonacular.com/food/products/?query=' + req.params.name + '&number=' + req.params.numberOfResults + '&apiKey=' + env.spoonacular['api-key'],
            'headers': {
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            
            // console.log(response.body);
          });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const getRecipeSuggestions= async(req, res)=>{
    try {
        num = req.body.numberOfResults ? req.body.numberOfResults : 3;
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/autocomplete',
            qs: {query: req.params.name, number: num},
            headers: {
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'x-rapidapi-key': '815fe80cd9msh2d8fb201641104fp1919d5jsnfd64f7e24419',
              useQueryString: true
            }
          };
          
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var obj = JSON.parse(body) //for testing with live data
          //   var obj = JSON.parse(JSON.stringify(test)) //for testing without live data -- remember to comment out api key if using this
            var ret = [];
            // console.log(obj);
            for(fullrecipe of obj){
                // console.log(fullrecipe);
                var rec = Recipe.build({intSpoonacularId: fullrecipe.id, strTitle: fullrecipe.title, jsonRecipeData: {image: "https://spoonacular.com/recipeImages/" + fullrecipe.id + "-636x393." + fullrecipe.imageType}})
                ret.push(rec);
            }
            return res.status(200).json(ret);
          });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const getItemSuggestion= async(req, res)=>{
    try {
        var items = [];
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete',
            qs: {query: req.params.name, number: req.params.numberOfResults, intolerances: req.params.intolerances},
            headers: {
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'x-rapidapi-key': '815fe80cd9msh2d8fb201641104fp1919d5jsnfd64f7e24419',
              useQueryString: true
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            var obj = JSON.parse(response.body)
            // console.log(obj);
            for(spoonItem of obj){
                // console.log("spoonItem:")
                console.log(spoonItem);
                var i = {
                    spoonacularId: spoonItem.id,
                    strDescription: spoonItem.name,
                    strImage: "https://spoonacular.com/cdn/ingredients_250x250/" + spoonItem.image
                }
                // console.log("pushed item:")
                items.push(i);
                // console.log(i)
            }
            // console.log("response bodt");
            // console.log(response.body);
            // console.log("items array:");
            // console.log(items);
            return res.status(200).json(items);
            
          });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const parseIngredients= async(req, res)=>{
    try {
        console.log(req.body)
        var item = req.body.strDescription;
        const options = {
            method: 'POST',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/parseIngredients',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'x-rapidapi-key': '815fe80cd9msh2d8fb201641104fp1919d5jsnfd64f7e24419',
          useQueryString: true
        },
        form: {'ingredientList': item}
    };
        var items = [];
        // var list = [];
        // for (ing of req.body){
        //     var item = ing.strDescription
        //     list.push(item)
        //     // console.log(list)
        //     const options = {
        //         method: 'POST',
        //         url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/parseIngredients',
        //         headers: {
        //             'content-type': 'application/x-www-form-urlencoded',
        //       'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        //       'x-rapidapi-key': '815fe80cd9msh2d8fb201641104fp1919d5jsnfd64f7e24419',
        //       useQueryString: true
        //     },
        //     form: {'ingredientList': item}
        // };
        
        await request(options, async (error, response, body)=> {
              if (error) throw new Error(error);
              
              console.log(body);
              var spoonItem = JSON.parse(response.body)[0]
            // console.log(obj);
                console.log(spoonItem);
                var i = {
                    spoonacularId: spoonItem.id,
                    strDescription: spoonItem.name,
                    strImage: "https://spoonacular.com/cdn/ingredients_250x250/" + spoonItem.image
                }

                items.push(i);

            
                console.log(i);
                return res.status(200).json(i);
        });
    // }
    console.log('items')
    console.log(items)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const getProductSuggestion= async(req, res)=>{
    try {
        var items = [];
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search',
            qs: {query: req.params.name, number: req.params.numberOfResults},
            headers: {
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'x-rapidapi-key': '815fe80cd9msh2d8fb201641104fp1919d5jsnfd64f7e24419',
              useQueryString: true
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            var obj = JSON.parse(response.body).products
            // console.log(obj);
            for(spoonItem of obj){
                // console.log("spoonItem:")
                // console.log(spoonItem);
                var i = {
                    spoonacularId: spoonItem.id,
                    strDescription: spoonItem.title,
                    strImage: spoonItem.image
                }
                // console.log("pushed item:")
                items.push(i);
                // console.log(i)
            }
            // console.log("response bodt");
            // console.log(response.body);
            // console.log("items array:");
            // console.log(items);
            return res.status(200).json(items);
            
          });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const getRecipeId = async(req, res)=>{
    try {
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'+ req.params.id + '/information',
            headers: {
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'x-rapidapi-key': '815fe80cd9msh2d8fb201641104fp1919d5jsnfd64f7e24419',
              useQueryString: true
            }
          };
          
          request(options, function (error, response, body) {
              if (error) throw new Error(error);
              var rec = Recipe.build({ intSpoonacularId: body.id, strTitle: body.title, jsonRecipeData: JSON.parse(body)})

              return res.status(200).json(rec);
          });
    } catch (error) {
        return res.status(500).json({ error: error.message })``
    }
}
const getRandomRecipes = async(req, res)=>{
    try {
        const tags = req.params.tags ? req.params.tags.replaceAll('%2C', ',') : '';
        const num = req.params.numberOfResults;
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
            qs: { tags: tags, number: num },
            headers: {
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'x-rapidapi-key': '815fe80cd9msh2d8fb201641104fp1919d5jsnfd64f7e24419',
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            var obj = JSON.parse(body).recipes //for testing with live data
            //   var obj = JSON.parse(JSON.stringify(test)) //for testing without live data -- remember to comment out api key if using this
            var ret = [];
            // console.log(obj);
            for (fullrecipe of obj) {
                // console.log(fullrecipe);
                var rec = Recipe.build({ intSpoonacularId: fullrecipe.id, strTitle: fullrecipe.title, jsonRecipeData: { image: "https://spoonacular.com/recipeImages/" + fullrecipe.id + "-636x393." + (fullrecipe.imageType ? fullrecipe.imageType : 'jpg') } })
                ret.push(rec);
            }
            return res.status(200).json(ret);
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getRecipeIngredients = async (req, res) =>{
    // console.log("ENTER RECINGRED");
    try {
        var body = JSON.parse(JSON.stringify(req.body))
        // console.log("BODY");
        // console.log(body);
        
        var ingredients = body.ingredients;
        // console.log("INGREDIENTS")
        // console.log(ingredients);
        var ingredientsString = "";
        var recipes = [];
        var num = body.num ? Number(body.num) : 1;
        var ignore = body.ignore ? Boolean(body.ignore) : false;
        var ranking = body.ranking ? Number(body.ranking) : 2;
        for(ing of ingredients){
            // console.log(ing.strDescription);
            //// console.log("len", ingredientsString.length)
            if(ingredientsString.length > 0){
                // console.log("if", ing)
                ing.strDescription = encodeURIComponent(ing.strDescription)
                ingredientsString =  ingredientsString.concat(',',ing.strDescription);
            }
            else{
                // console.log("else", ing)
                ingredientsString = encodeURIComponent(ing.strDescription);
            }
            // ingredientsString.concat(ing.strDescription)
            // console.log("loopstr ", ingredientsString);

        }
        // console.log(num);
        // console.log("outside str ", ingredientsString);
        
        // console.log("ingStr: ", ingredientsString);
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
            qs: {
              ingredients: ingredientsString,
              number: num,
              ignorePantry: ignore,
              ranking: ranking
            },
            headers: {
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'x-rapidapi-key': '815fe80cd9msh2d8fb201641104fp1919d5jsnfd64f7e24419', //comment this out if testing with static data to reduce quota load
              useQueryString: true
            }
          };
          
          request(options, function (error, response, body) {
              if (error) throw new Error(error);
            //   console.log("spoon body");
            //   console.log(body)
                      var obj = JSON.parse(body) //for testing with live data
                    //   var obj = JSON.parse(JSON.stringify(test)) //for testing without live data -- remember to comment out api key if using this
                      var ret = [];
                      for(fullrecipe of obj){
                        //   console.log("fullrecipe");
                        //   console.log(fullrecipe);
                          var rec = Recipe.build({intSpoonacularId: fullrecipe.id, strTitle: fullrecipe.title, strImage: fullrecipe.image, jsonRecipeData: fullrecipe})
                        //   console.log("rec");
                        //   console.log(rec);
                          var usedIng = fullrecipe.usedIngredients
                          var missedIng = fullrecipe.missedIngredients
                          ret.push({"recipe": rec,"usedIngredients": usedIng,"missedIngredients": missedIng});
                      }
                    //   console.log(ret);
                      return res.status(200).json(ret);
          });

    
        
    } catch (error) {
        return res.status(500).json({error: error.message, stack: error.stack})
    }
}
const json = async(req, res)=>{
    console.log("get json");
    try{
        if (req.params.version){
            return res.status(200).json({version: "1.0.0"});
        }
        else{
            return res.status(200).json({json: "json"});
        }
    }catch(error){
        return res.status(500).json({error: error.message, stack: error.stack})

    }
}

const test = [
    {
        "id": 662665,
        "title": "Swiss Bircher Muesli",
        "image": "https://spoonacular.com/recipeImages/662665-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 2,
        "missedIngredientCount": 2,
        "missedIngredients": [
            {
                "id": 42184,
                "amount": 0.5,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Cereal",
                "name": "muesli",
                "original": "1/2 cup muesli",
                "originalString": "1/2 cup muesli",
                "originalName": "muesli",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/granola.jpg"
            },
            {
                "id": 43261,
                "amount": 3,
                "unit": "tablespoons",
                "unitLong": "tablespoons",
                "unitShort": "Tbsp",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "skim vanilla yoghurt",
                "original": "3 tablespoons of plain or vanilla yoghurt",
                "originalString": "3 tablespoons of plain or vanilla yoghurt",
                "originalName": "plain or vanilla yoghurt",
                "metaInformation": [
                    "plain"
                ],
                "meta": [
                    "plain"
                ],
                "extendedName": "plain skim vanilla yoghurt",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/vanilla-yogurt.png"
            }
        ],
        "usedIngredients": [
            {
                "id": 9003,
                "amount": 1,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "apple",
                "original": "1 Apple",
                "originalString": "1 Apple",
                "originalName": "Apple",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
            },
            {
                "id": 1077,
                "amount": 0.5,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "milk",
                "original": "1/2 cup of Milk",
                "originalString": "1/2 cup of Milk",
                "originalName": "Milk",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/milk.png"
            }
        ],
        "unusedIngredients": [],
        "likes": 1
    }
]


module.exports = {
    createUser,
    healthPost,
    getUserById,
    getAllUsers,
    getItemsByUser,
    getUserByCreds,
    getItemByUPC,
    getItemByName,
    getAllItems,
    getRecipeSuggestions,
    getItemSuggestion,
    getRecipeIngredients,
    addItemBatch,
    getItemByID,
    getRandomRecipes,
    getProductSuggestion,
    createGrocery,
    getGrocery,
    getRecipeId,
    json,
    updateQty,
    parseIngredients,


}