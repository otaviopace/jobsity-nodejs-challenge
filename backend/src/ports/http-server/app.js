const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const middlewares = require('../../middlewares')
const userSchema = require('../../schemas/user')
const sessionSchema = require('../../schemas/session')
const userController = require('../../controllers/user')
const sessionController = require('../../controllers/session')

const createApp = (db) => {
  const app = express()

  middlewares.setupDefault(app)
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/health_check',  (req, res) => res.sendStatus(200))
  app.get('/', middlewares.authentication, (req, res) => res.sendStatus(200))
  app.post('/', middlewares.authentication, (req, res) => res.status(200).send(req.body))

  app.post('/users', middlewares.validation(userSchema.create), userController.create(db))
  app.post('/sessions', middlewares.validation(sessionSchema.create), sessionController.create(db))

  return app
}

module.exports = {
  createApp,
}
