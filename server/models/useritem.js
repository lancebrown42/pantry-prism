'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserItem.init({
    intUserItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
    intUserId: DataTypes.INTEGER,
    intItemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserItem',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'TUserItems',
  });
  return UserItem;
};