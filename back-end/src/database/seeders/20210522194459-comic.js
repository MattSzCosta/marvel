'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comics', [{
      id: '1',
      apiId: "59181", 
	    name: "Civil War II (2016) #6 (Gi Connecting Variant H)", 
	    thumb: "http://i.annihil.us/u/prod/marvel/i/mg/8/c0/51dda501724ed"
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comics', null, {});
  }
};