const onChatMessage = require('./chat-message')
const onDisconnect = require('./disconnect')
const authenticationMiddleware = require('./authentication')
const { catchAsyncError, catchSyncError } = require('./catch-error')
const { logger } = require('../logger')

const onConnection = (io, repository) => socket => {
  logger.info('An user connected to the chat')

  socket.use(authenticationMiddleware(['chat-message']))

  socket.on('chat-message', catchAsyncError(io, onChatMessage(io, repository)))

  socket.on('disconnect', catchSyncError(io, onDisconnect))
}

module.exports = onConnection
