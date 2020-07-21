const Promise = require('bluebird')
const Sequelize = require('sequelize')
const config = require('../config/database')
const DatabaseError = require('../errors/database')

const sequelize = new Sequelize(config)

const ensureDbIsConnected = (db) => {
  const MAX_RETRIES = 10
  const RETRY_TIMEOUT = 1000

  const tryToConnect = (retry = 1) =>
    db.authenticate()
      .catch((err) => {
        console.log('tried:', retry)
        if (retry < MAX_RETRIES) {
          return Promise.delay(RETRY_TIMEOUT)
            .then(() => tryToConnect(retry + 1))
        }

        return Promise.reject(new DatabaseError(err))
      })

  return Promise.resolve(tryToConnect())
}

module.exports = {
  sequelize,
  ensureDbIsConnected,
}
