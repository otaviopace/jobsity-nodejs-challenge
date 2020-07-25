const socketIO = require('socket.io')
const setupEventHandlers = require('../../event-handlers')

const listenWebSocket = (server, repository) => {
  const io = socketIO(server)

  setupEventHandlers(io, repository)
}

module.exports = {
  listenWebSocket,
}
