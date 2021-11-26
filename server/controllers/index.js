// const Item = require('../model/Item');
const { User,Item } = require('../models');
const http = require('http');
var request = require('request');
const env = require('../env.json');


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
            'url': 'https://api.spoonacular.com/food/products/search?query=' + req.params.name + '&number=' + req.params.numberOfResults + '&apiKey=' + env.spoonacular['api-key'],
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
module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    getItemsByUser,
    getUserByCreds,
    getItemByUPC,
    getItemByName,
    getAllItems,
}