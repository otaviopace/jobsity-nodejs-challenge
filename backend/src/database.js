const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  host: 'postgres',
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
})

module.exports = sequelize
