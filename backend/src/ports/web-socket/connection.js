const onChatMessage = require('./chat-message')
const onDisconnect = require('./disconnect')
const { logger } = require('../../logger')

const onConnection = (io, repository) => socket => {
  logger.info('A user connected to the chat')

  socket.on('chat-message', onChatMessage(io, repository))

  socket.on('disconnect', onDisconnect)
}

module.exports = onConnection
