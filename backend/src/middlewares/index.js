const cors = require('cors')
const bodyParser = require('body-parser')
const authentication = require('./authentication')
const validation = require('./validation')

const setupDefault = app => {
  app.use(cors())
  app.use(bodyParser.json())
}

module.exports = {
  authentication,
  validation,
  setupDefault,
}
