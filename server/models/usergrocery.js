'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGrocery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey: {
        
        name: 'intUserId',
      }
    })
      this.belongsTo(models.Grocery,{foreignKey: {
        
        name: 'intGroceryId',
      }
    })
    }
  };
  UserGrocery.init({
    intUserGroceryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
    intGroceryId: DataTypes.INTEGER,
    intUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserGrocery',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TUserGroceries',
  });
  return UserGrocery;
};