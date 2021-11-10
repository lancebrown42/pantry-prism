
const {Sequelize, Model, DataTypes} = require('sequelize');

const Item =  {
  intInventoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
// Model attributes are defined here
strSku:{
    type: DataTypes.STRING,    
},
strDescription:{
    type: DataTypes.STRING,
},
qtyQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
strImage:{
    type: DataTypes.STRING,
}
};
module.exports = Item;