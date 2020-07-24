const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const userController = require('../../controllers/user')
const sessionController = require('../../controllers/session')

const createApp = (db) => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())

  const authMiddleware = (req, res, next) => {
    const authHeader = req.get('Authorization')

    if (!authHeader) {
      return res.status(401).send({ errors: [{ message: 'authorization header is missing' }] })
    }

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer') {
      return res.status(401).send({ errors: [{ message: 'the string `Bearer` should prefix the auth token' }] })
    }

    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET)

      req.user = decodedUser

      return next()
    } catch (error) {
      return res.status(401).send({ errors: [{ message: 'invalid authorization token' }] })
    }
  }

  app.get('/health_check',  (req, res) => res.sendStatus(200))
  app.get('/', authMiddleware, (req, res) => res.sendStatus(200))
  app.post('/', authMiddleware, (req, res) => res.status(200).send(req.body))

  app.post('/users', userController.create(db))
  app.post('/sessions', sessionController.create(db))

  return app
}

module.exports = {
  createApp,
}
