'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroceryItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item,{foreignKey: {
        
        name: 'intItemId',
      }
    })
      this.belongsTo(models.Grocery,{foreignKey: {
        
        name: 'intGroceryId',
      }
    })
    }
  };
  GroceryItem.init({
    intGroceryItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
    intGroceryId: DataTypes.INTEGER,
    intItemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroceryItem',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TGroceryItems',
  });
  return GroceryItem;
};