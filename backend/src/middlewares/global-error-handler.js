const errorPresenter = require('../presenters/error')
const { logger } = require('../logger')

const globalErrorHandler = (error, req, res, next) => {
  logger.error(error)
  res.status(500).send(errorPresenter.fromMessage('Internal server error'))
  next()
}

module.exports = globalErrorHandler
