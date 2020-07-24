const middlewares = require('../middlewares')
const userSchema = require('../schemas/user')
const sessionSchema = require('../schemas/session')
const userController = require('../controllers/user')
const sessionController = require('../controllers/session')
const { resourceNotFound, methodNotAllowed } = require('../controllers')

const setupRoutes = (app, repository) => {
  app.get('/health_check',  (req, res) => res.sendStatus(200))
  app.all('/health_check', methodNotAllowed)

  app.get('/', middlewares.authentication, (req, res) => res.sendStatus(200))
  app.post('/', middlewares.authentication, (req, res) => res.status(200).send(req.body))
  app.all('/', methodNotAllowed)

  app.post(
    '/users',
    middlewares.validation(userSchema.create),
    middlewares.wrapAsync(userController.create(repository))
  )
  app.all('/users', methodNotAllowed)

  app.post(
    '/sessions',
    middlewares.validation(sessionSchema.create),
    middlewares.wrapAsync(sessionController.create(repository))
  )
  app.all('/sessions', methodNotAllowed)

  app.all('*', resourceNotFound)
}

module.exports = {
  setupRoutes,
}
