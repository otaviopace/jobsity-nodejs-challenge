const { STRING } = require('sequelize')
const defaultCuidValue = require('../cuid')

const create = (sequelize) =>
  sequelize.define('Message', {
    id: {
      type: STRING,
      primaryKey: true,
      allowNull: false,
      required: true,
      defaultValue: defaultCuidValue('msg_'),
    },
    text: {
      type: STRING,
      allowNull: false,
      required: true,
    },
    user_id: {
      type: STRING,
      allowNull: false,
      required: true,
    },
  })

const associate = (Message, models) => {
  Message.belongsTo(models.User, {
    foreignKey: 'user_id',
  })
}

module.exports = {
  create,
  associate,
}
