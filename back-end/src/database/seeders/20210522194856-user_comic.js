'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_comics', [{
      id: '1',
      comicId: "1",
	    userId: "1",
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_comics ', null, {});
  }
};
