
const {Sequelize, Model, DataTypes} = require('sequelize');

const User =  {
  intUserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
// Model attributes are defined here
strFirstName: {
  type: DataTypes.STRING,
  allowNull: false,
},
strLastName: {
  type: DataTypes.STRING,
  allowNull: false,
},
strAddress: {
    type: DataTypes.STRING,
},
dtmDateOfBirth:{
    type: DataTypes.DATE,
    allowNull: false,
},
strEmailAddress:{
    type: DataTypes.STRING,
    allowNull: false,
},
strGender:{
    type: DataTypes.STRING,
    allowNull: false,
},
strPassword:{
    type: DataTypes.STRING,
    allowNull: false,
}
};
module.exports = User;