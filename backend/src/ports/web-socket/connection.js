const onChatMessage = require('./chat-message')
const onDisconnect = require('./disconnect')

const onConnection = (io, db) => socket => {
  console.log('a user connected')

  socket.on('chat-message', onChatMessage(io, db))

  socket.on('disconnect', onDisconnect)
}

module.exports = onConnection
