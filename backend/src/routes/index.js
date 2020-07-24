const middlewares = require('../middlewares')
const userSchema = require('../schemas/user')
const sessionSchema = require('../schemas/session')
const userController = require('../controllers/user')
const sessionController = require('../controllers/session')

const setupRoutes = (app, repository) => {
  app.get('/health_check',  (req, res) => res.sendStatus(200))
  app.get('/', middlewares.authentication, (req, res) => res.sendStatus(200))
  app.post('/', middlewares.authentication, (req, res) => res.status(200).send(req.body))

  app.post('/users', middlewares.validation(userSchema.create), userController.create(repository))
  app.post('/sessions', middlewares.validation(sessionSchema.create), sessionController.create(repository))
}

module.exports = {
  setupRoutes,
}
