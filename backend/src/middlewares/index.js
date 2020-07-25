const cors = require('cors')
const bodyParser = require('body-parser')
const authentication = require('./authentication')
const validation = require('./validation')
const globalErrorHandler = require('./global-error-handler')
const wrapAsync = require('./wrap-async')
const { httpLogger } = require('../logger')

const setupDefault = app => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(httpLogger)
}

module.exports = {
  authentication,
  validation,
  setupDefault,
  globalErrorHandler,
  wrapAsync,
}
