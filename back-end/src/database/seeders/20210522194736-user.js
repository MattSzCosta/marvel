'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: '1',
        firstName: 'Mateus',
        lastName: 'Souza',
        email: 'email@gmail.com',
        password: '123',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users ', null, {});
  },
};
