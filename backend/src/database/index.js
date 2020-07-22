const Promise = require('bluebird')
const Sequelize = require('sequelize')
const config = require('../config/database')
const DatabaseError = require('../errors/database')
const models = require('./models')

const defaults = {
  define: {
    paranoid: true,
    underscored: true,
  },
}

const createDatabase = () => {
  const sequelize = new Sequelize({ ...defaults, ...config })

  const createModelInstance = (model) => ({
    model,
    instance: model.create(sequelize)
  })

  const associateModels = ({ model, instance }) => {
    if (model.associate) {
      model.associate(instance, sequelize.models)
    }
  }

  Object.values(models)
    .map(createModelInstance)
    .forEach(associateModels)

  return sequelize
}

const ensureDbIsConnected = (db) => {
  const MAX_RETRIES = 10
  const RETRY_TIMEOUT = 1000

  const tryToConnect = (retry = 1) =>
    db.authenticate()
      .catch((err) => {
        if (retry < MAX_RETRIES) {
          return Promise.delay(RETRY_TIMEOUT)
            .then(() => tryToConnect(retry + 1))
        }

        return Promise.reject(new DatabaseError(err))
      })

  return Promise.resolve(tryToConnect())
}

const connectToDatabase = () =>
  Promise.resolve(createDatabase())
    .tap(ensureDbIsConnected)
    .tap(db => db.sync())

module.exports = {
  connectToDatabase,
  createDatabase,
  ensureDbIsConnected,
}
