const http = require('http')
const socketIO = require('socket.io')
const setupGracefulShutdown = require('../http/shutdown')
const setupEventHandlers = require('../../event-handlers')

const startWebSocketServer = (repository, messageBroker) => {
  const server = http.createServer()

  const io = socketIO(server)

  setupEventHandlers(io, repository, messageBroker)

  const startedServer = server.listen(process.env.WEB_SOCKET_PORT)

  setupGracefulShutdown(startedServer)
}

module.exports = {
  startWebSocketServer,
}
