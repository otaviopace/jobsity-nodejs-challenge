const express = require('express')
const middlewares = require('../../middlewares')
const { setupRoutes } = require('../../routes')

const createApp = (db) => {
  const app = express()

  middlewares.setupDefault(app)

  setupRoutes(app, db)

  return app
}

module.exports = {
  createApp,
}
