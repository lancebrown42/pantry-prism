
const {Sequelize, Model, DataTypes} = require('sequelize');

const User =  {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
// Model attributes are defined here
firstName: {
  type: DataTypes.STRING,
  allowNull: false,
},
lastName: {
  type: DataTypes.STRING,
  allowNull: false,
},
address: {
    type: DataTypes.STRING,
},
DOB:{
    type: DataTypes.DATE,
    allowNull: false,
},
email:{
    type: DataTypes.STRING,
    allowNull: false,
},
gender:{
    type: DataTypes.STRING,
    allowNull: false,
},
password:{
    type: DataTypes.STRING,
    allowNull: false,
}
};
module.exports = User;