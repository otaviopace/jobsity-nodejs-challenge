const { STRING, DATE } = require('sequelize')

const tableName = 'Messages'

module.exports = {
  up: queryInterface => queryInterface.createTable(tableName, {
    id: {
      type: STRING,
      primaryKey: true,
      allowNull: false
    },
    text: {
      type: STRING,
      allowNull: false,
      required: true
    },
    user_id: {
      type: STRING,
      allowNull: false,
      required: true
    },
    created_at: {
      type: DATE,
      allowNull: false,
      required: true
    },
    updated_at: {
      type: DATE,
      allowNull: false,
      required: true
    }
  }),
  down: queryInterface => queryInterface.dropTable(tableName)
}
