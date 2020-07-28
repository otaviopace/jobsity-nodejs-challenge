const sequelize = require('../sequelize')
const { fromSequelize } = require('./from-sequelize')

const connect = async () => {
  const seq = await sequelize.connect()

  const repo = fromSequelize(seq)

  return repo
}

module.exports = {
  connect
}
