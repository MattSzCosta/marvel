const { BLOB, INTEGER, STRING } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comics', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      apiId: {
        type: STRING(100),
        allowNull: false,
      },
      thumb: {
        type: BLOB("medium"),
        allowNull: false,
      },
      name: {
        type: STRING(100),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comics');
  }
};