'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recipe.init({
    intRecipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    intSpoonacularId: DataTypes.INTEGER,
    jsonRecipeData: DataTypes.TEXT,
    strTitle: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Recipe',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TRecipes',
  });
  return Recipe;
};