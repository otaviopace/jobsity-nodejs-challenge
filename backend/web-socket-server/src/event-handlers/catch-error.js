const { logger } = require('common/src/logger')

const emitError = io =>
  io.emit('error', 'Internal server error')

const catchSyncError = (io, eventHandler) => (...args) => {
  try {
    eventHandler(...args)
  } catch (error) {
    logger.error(error)
    emitError(io)
  }
}

const catchAsyncError = (io, eventHandler) => (...args) =>
  eventHandler(...args)
    .catch(error => {
      logger.error(error)
      emitError(io)
    })

module.exports = {
  emitError,
  catchSyncError,
  catchAsyncError,
}
