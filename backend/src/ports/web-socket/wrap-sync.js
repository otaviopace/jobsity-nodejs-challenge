const { logger } = require('../../logger')

const wrapSyncMiddleware = (io, eventHandler) => (...args) => {
  try {
    eventHandler(...args)
  } catch (error) {
    logger.error(error)
    io.emit('error', 'Internal server error')
  }
}

module.exports = wrapSyncMiddleware
