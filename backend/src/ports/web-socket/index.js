const socketIO = require('socket.io')
const setupEventHandlers = require('../../event-handlers')

const listenWebSocket = (server, repository, amqpChannel) => {
  const io = socketIO(server)

  setupEventHandlers(io, repository, amqpChannel)
}

module.exports = {
  listenWebSocket,
}
