//const mysql = require('mysql');
//
//const mysqlConnection = mysql.createConnection({
//    host: 'quizapi.com',
//    user: 'maverick',
//    password: 'mavericK@123$',
//    database: 'hello'
//});
//
//mysqlConnection.connect(function(error) {
//    if (error) {
//        console.log(error);
//        return error;
//    } else {
//        console.log('Database is connected ..!!');
//    }
//});
//
//module.exports = mysqlConnection;

const sequelize = require('./initialize');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to MySQL has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
