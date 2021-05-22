const { TEXT, INTEGER, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('characters', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      apiId: {
        type: STRING(100),
        allowNull: false,
        unique: true,
      },
      thumb: {
        type: TEXT,
        allowNull: false,
      },
      name: {
        type: TEXT,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('characters');
  },
};
