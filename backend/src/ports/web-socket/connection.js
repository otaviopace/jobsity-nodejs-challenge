const onChatMessage = require('./chat-message')
const onDisconnect = require('./disconnect')

const onConnection = (io, repository) => socket => {
  console.log('a user connected')

  socket.on('chat-message', onChatMessage(io, repository))

  socket.on('disconnect', onDisconnect)
}

module.exports = onConnection
