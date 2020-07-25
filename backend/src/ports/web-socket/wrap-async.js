const { logger } = require('../../logger')

const wrapAsyncMiddleware = (io, eventHandler) => data =>
  eventHandler(data)
    .catch(error => {
      logger.error(error)
      io.emit('error', 'Internal server error')
    })

module.exports = wrapAsyncMiddleware

