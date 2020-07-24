const { STRING, DATE } = require('sequelize')

const tableName = 'Users'

module.exports = {
  up: queryInterface => queryInterface.createTable(tableName, {
    id: {
      type: STRING,
      primaryKey: true,
      allowNull: false,
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
    created_at: {
      type: DATE,
      allowNull: false,
      required: true,
    },
    updated_at: {
      type: DATE,
      allowNull: false,
      required: true,
    },
  }),
  down: queryInterface => queryInterface.dropTable(tableName),
}
