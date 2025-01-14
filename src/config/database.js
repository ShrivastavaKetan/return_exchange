// // src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: console.log,    // Disable logging, set to `console.log` to enable
  // logging: false,    // Disable logging, set to `console.log` to enable
});

module.exports = sequelize;
  