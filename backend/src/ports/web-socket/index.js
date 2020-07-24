const socketIO = require('socket.io')
const onConnection = require('./connection')

const listenWebSocket = (server, db) => {
  const io = socketIO(server)

  io.on('connection', onConnection(io, db))
}

module.exports = {
  listenWebSocket,
}
