'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      intUserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      strFirstName: {
        type: Sequelize.STRING
      },
      strLastName: {
        type: Sequelize.STRING
      },
      strAddress: {
        type: Sequelize.STRING
      },
      dtmDateOfBirth: {
        type: Sequelize.DATE
      },
      strEmailAddress: {
        type: Sequelize.STRING
      },
      strGender: {
        type: Sequelize.STRING
      },
      strPassword: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};