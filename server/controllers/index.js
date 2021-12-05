// const Item = require('../model/Item');
const { User,Item } = require('../models');
const http = require('http');
var request = require('request');
const env = require('../env.json');
const item = require('../models/item');
const user = require('../models/user');


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
const addItemBatch = async (req, res) => {
    try {
        console.log(req.body)
        var body = JSON.stringify(req.body);
        var addedItems = [];
        if(body.includes('intUserId')){
            users = JSON.parse(body).user;
            items = JSON.parse(body).items
            console.log(items)
            const usr =await User.findByPk(users.intUserId);
            console.log(usr)

            
                for(itm of items){
                    itm = await Item.create(itm);
                    console.log("adding ", itm, " to user ", usr.strFirstName)
                    addedItems.push(await usr.addItems(itm))
                };
            
        }else{

            items = JSON.parse(JSON.stringify(req.body))
            
            for(itm of items){
                console.log("adding ", itm)
                addedItems.push(await Item.create(itm))
            };
        }
        return res.status(201).json({
            addedItems,
        });
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
        var options = {
            'method': 'GET',
            'url': 'https://api.spoonacular.com/food/products/upc/:upc?apiKey=' + env.spoonacular['api-key'],
            'headers': {
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            
            console.log(response.body);
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
            
            console.log(response.body);
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
            
            console.log(response.body);
          });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const getRecipeSuggestions= async(req, res)=>{
    try {
        var options = {
            'method': 'GET',
            'url': 'https://api.spoonacular.com/recipes/autocomplete?query=' + req.params.name + '&number=' + req.params.numberOfResults + '&apiKey=' + env.spoonacular['api-key'],
            'headers': {
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            
            console.log(response.body);
          });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const getItemSuggestion= async(req, res)=>{
    try {
        var items = [];
        var options = {
            'method': 'GET',
            'url': 'https://api.spoonacular.com/food/ingredients/autocomplete?query=' + req.params.name + '&number=' + req.params.numberOfResults + '&metaInformation=true' + '&apiKey=' + env.spoonacular['api-key'],
            'headers': {
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            var obj = JSON.parse(response.body)
            console.log(obj);
            for(spoonItem of obj){
                console.log("spoonItem:")
                console.log(spoonItem);
                var i = {
                    spoonacularId: spoonItem.id,
                    strDescription: spoonItem.name,
                    strImage: "https://spoonacular.com/cdn/ingredients_250x250/" + spoonItem.image
                }
                console.log("pushed item:")
                items.push(i);
                console.log(i)
            }
            console.log("response bodt");
            console.log(response.body);
            console.log("items array:");
            console.log(items);
            return res.status(200).json(items);
            
          });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    getItemsByUser,
    getUserByCreds,
    getItemByUPC,
    getItemByName,
    getAllItems,
    getRecipeSuggestions,
    getItemSuggestion,
    addItemBatch,
    getItemByID,


}