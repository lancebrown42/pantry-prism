const { type } = require('os');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const types = DataTypes;
const User = sequelize.define('User', {
    id: {
        type: types.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
  // Model attributes are defined here
  firstName: {
    type: types.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
      type: type.STRING,
  },
  DOB:{
      type: types.DATE,
      allowNull: false,
  },
  email:{
      type: types.STRING,
      allowNull: false,
  },
  gender:{
      type: types.STRING,
      allowNull: false,
  },
  password:{
      type: types.STRING,
      allowNull: false,
  }
}, {
    tableName: 'CPDM_GroupC.db_owner.TUsers'
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;