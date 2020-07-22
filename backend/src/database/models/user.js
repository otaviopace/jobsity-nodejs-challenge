const { STRING } = require('sequelize')
const defaultCuidValue = require('../cuid')

const create = (sequelize) =>
  sequelize.define('User', {
    id: {
      type: STRING,
      primaryKey: true,
      allowNull: false,
      required: true,
      defaultValue: defaultCuidValue('usr_'),
    },
    username: {
      type: STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    password_hash: {
      type: STRING,
      allowNull: false,
      required: true,
    },
  })

module.exports = {
  create,
}
