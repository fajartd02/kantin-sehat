
const Sequelize = require('sequelize');
const database = new Sequelize('kantin_sehat', 'mekari', '', {
    host: "localhost",
    dialect: "mysql"
});

export default database;