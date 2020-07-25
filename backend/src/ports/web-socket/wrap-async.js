const { logger } = require('../../logger')

const wrapAsyncMiddleware = (io, eventHandler) => (...args) =>
  eventHandler(...args)
    .catch(error => {
      logger.error(error)
      io.emit('error', 'Internal server error')
    })

module.exports = wrapAsyncMiddleware
