const socketIO = require('socket.io')
const setupEventHandlers = require('../../event-handlers')

const listenWebSocket = (server, repository, messageBroker) => {
  const io = socketIO(server)

  setupEventHandlers(io, repository, messageBroker)
}

module.exports = {
  listenWebSocket,
}
