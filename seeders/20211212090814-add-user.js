'use strict';
const bcrypt = require('bcrypt');

const config = require('../config/appconfig');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
    {
      name: 'jahanzeb',
      email: 'jahanzebsethi@gmail.com',
      password: bcrypt.hashSync('sup3rman65', config.auth.saltRounds),
      role_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
