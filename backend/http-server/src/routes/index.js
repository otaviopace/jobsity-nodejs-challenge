const middlewares = require('../middlewares')
const userSchema = require('../schemas/user')
const sessionSchema = require('../schemas/session')
const messageSchema = require('../schemas/message')
const userController = require('../controllers/user')
const sessionController = require('../controllers/session')
const messageController = require('../controllers/message')
const { resourceNotFound, methodNotAllowed } = require('../controllers')

const setupRoutes = (app, repository) => {
  app.get('/health_check',  (req, res) => res.sendStatus(200))
  app.all('/health_check', methodNotAllowed)

  app.post(
    '/users',
    middlewares.validation(userSchema.create),
    middlewares.catchAsyncError(userController.create(repository))
  )
  app.all('/users', methodNotAllowed)

  app.post(
    '/sessions',
    middlewares.validation(sessionSchema.create),
    middlewares.catchAsyncError(sessionController.create(repository))
  )
  app.all('/sessions', methodNotAllowed)

  app.get(
    '/messages',
    middlewares.authentication,
    middlewares.validation(messageSchema.list),
    middlewares.catchAsyncError(messageController.list(repository))
  )
  app.all('/messages', methodNotAllowed)

  app.all('*', resourceNotFound)
}

module.exports = {
  setupRoutes,
}
