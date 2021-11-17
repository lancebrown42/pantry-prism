// const Item = require('../model/Item');
const { User,Item } = require('../models');
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
        return res.status(200).json({user,})
    }
    catch(error){
        return res.status(500).json({ error: error.message })
    }
}
const getAllUsers = async(req, res)=>{
    try{
        const user = await User.findAll();
        return res.status(200).json({user})
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
        return res.status(200).json({user})
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
module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    getItemsByUser,
    getAllItems,
}