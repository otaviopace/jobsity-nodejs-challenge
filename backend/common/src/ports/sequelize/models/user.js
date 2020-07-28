const { STRING } = require('sequelize')

const create = (sequelize) =>
  sequelize.define('User', {
    id: {
      type: STRING,
      primaryKey: true,
      allowNull: false,
      required: true
    },
    username: {
      type: STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    password_hash: {
      type: STRING,
      allowNull: false,
      required: true
    }
  })

const associate = (User, models) => {
  User.hasMany(models.Message)
}

module.exports = {
  create,
  associate
}
