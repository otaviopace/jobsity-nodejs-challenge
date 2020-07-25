const onChatMessage = require('./chat-message')
const onDisconnect = require('./disconnect')
const authenticationMiddleware = require('./authentication')
const wrapSyncMiddleware = require('./wrap-sync')
const wrapAsyncMiddleware = require('./wrap-async')
const { logger } = require('../../logger')

const onConnection = (io, repository) => socket => {
  logger.info('A user connected to the chat')

  socket.use(authenticationMiddleware)

  socket.on('chat-message', wrapAsyncMiddleware(io, onChatMessage(io, repository)))

  socket.on('disconnect', wrapSyncMiddleware(io, onDisconnect))
}

module.exports = onConnection
