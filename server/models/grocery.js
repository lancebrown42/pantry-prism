'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grocery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Item,{
        through: 'GroceryItem',
        foreignKey:{
          name: 'intGroceryId'
        }
      })
      this.hasMany(models.GroceryItem,{
        foreignKey:{
          name: 'intGroceryId'
        }
      })
      this.belongsTo(models.User,{
        through: 'UserGrocery',
        foreignKey:{
          name: 'intGroceryId'
        }
      })
    }
  };
  Grocery.init({
    intGroceryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
    strStatus: DataTypes.STRING,
    dtmDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Grocery',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TGrocery',
  });
  return Grocery;
};