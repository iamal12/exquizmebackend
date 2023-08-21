const Sequelize = require('sequelize');

const sequelize = new Sequelize('test_1', 'maverick', 'mavericK@123$', {
  host: 'quizapi.com',
  dialect: 'mysql',
  logging: false, // Set to true if you want to see SQL queries in the console
});

module.exports = sequelize;
