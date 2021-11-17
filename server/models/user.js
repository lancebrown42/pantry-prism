'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    intUserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    strFirstName: DataTypes.STRING,
    strLastName: DataTypes.STRING,
    strAddress: DataTypes.STRING,
    dtmDateOfBirth: DataTypes.DATE,
    strEmailAddress: DataTypes.STRING,
    strGender: DataTypes.STRING,
    strPassword: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'User',
    tableName: 'TUsers',
  });
  return User;
};