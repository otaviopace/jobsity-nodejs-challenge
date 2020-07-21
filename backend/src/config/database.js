const setupDotenv = require('./')

setupDotenv()

const databaseConfig = {
  host: 'postgres',
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
}

module.exports = databaseConfig
