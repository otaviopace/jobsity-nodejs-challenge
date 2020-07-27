const { STRING } = require('sequelize')

const tableName = 'Messages'
const columnName = 'username'

module.exports = {
  up: queryInterface => queryInterface.addColumn(
    tableName,
    columnName,
    {
      type: STRING,
      allowNull: false
    }
  ),
  down: queryInterface => queryInterface.removeColumn(tableName, columnName),
}
