'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: '1',
      firstName: "Mateus",
	    lastName: "Souza",
	    email: "fake.email@gmail.com",
	    password: "123455"
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users ', null, {});
  }
};
