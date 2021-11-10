
const {Sequelize, Model, DataTypes} = require('sequelize');

const UserItem =  {
  intUserInventoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
// Model attributes are defined here
  intUserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  intInventoryId:{
      type: DataTypes.INTEGER,
      allowNull: false,
  },

};
module.exports = UserItem;