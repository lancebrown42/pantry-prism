'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.GroceryItem,{foreignKey:{
        name:'intItemId'
      }})
      this.belongsToMany(models.Grocery,
        {through: 'GroceryItem',
        foreignKey: {
          name:'intItemId',
        }});
    }
  };
  Item.init({
    intItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
    strSku: DataTypes.STRING,
    strDescription: DataTypes.STRING,
    intQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

    strImage: DataTypes.STRING,
    strExtendedDescription: DataTypes.STRING,
    spoonacularId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TItems',
  });
  return Item;
};