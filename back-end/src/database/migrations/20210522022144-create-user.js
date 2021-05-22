const { DATE, INTEGER, STRING } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      firstName: {
        type: STRING(100),
        allowNull: false,
      },
      lastName: {
        type: STRING(100),
        allowNull: false,
      },
      password: {
        type: STRING(100),
        allowNull: false,
      },
      email: {
        type: STRING(150),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};