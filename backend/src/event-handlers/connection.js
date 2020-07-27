const onChatMessage = require('./chat-message')
const onDisconnect = require('./disconnect')
const authenticationMiddleware = require('./authentication')
const { catchAsyncError, catchSyncError } = require('./catch-error')
const { logger } = require('../logger')

const onConnection = (io, repository, messageBroker) => socket => {
  logger.info('An user connected to the chat')

  socket.use(authenticationMiddleware(['chat-message']))

  socket.on('chat-message', catchAsyncError(io, onChatMessage(io, repository, messageBroker)))

  socket.on('disconnect', catchSyncError(io, onDisconnect))

  messageBroker.on('error', logger.error)

  messageBroker.listen('messages', message => {
    io.emit('chat-message', message)
  })
}

module.exports = onConnection
