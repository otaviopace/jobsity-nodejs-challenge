const socketIO = require('socket.io')
const onConnection = require('./connection')

const listenWebSocket = (server, repository) => {
  const io = socketIO(server)

  io.on('connection', onConnection(io, repository))
}

module.exports = {
  listenWebSocket,
}
