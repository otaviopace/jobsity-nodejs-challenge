const errorPresenter = require('../presenters/error')

const globalErrorHandler = (error, req, res, next) => {
  res.status(500).send(errorPresenter.fromMessage('Internal server error'))
  next()
}

module.exports = globalErrorHandler
