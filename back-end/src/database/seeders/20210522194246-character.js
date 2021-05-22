'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('characters', [
      {
        id: '1',
        apiId: '1010727',
        name: 'Spider-Girl (May Parker)',
        thumb: 'http://i.annihil.us/u/prod/marvel/i/mg/1/70/4c003adccbe4f',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('characters', null, {});
  },
};
