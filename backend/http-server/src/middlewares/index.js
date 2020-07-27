const cors = require('cors')
const bodyParser = require('body-parser')
const authentication = require('./authentication')
const validation = require('./validation')
const globalErrorHandler = require('./global-error-handler')
const catchAsyncError = require('./catch-async-error')
const { httpLogger } = require('common/src/logger')

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
  catchAsyncError,
}
