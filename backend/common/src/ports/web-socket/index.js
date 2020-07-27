const http = require('http')
const socketIO = require('socket.io')
const setupGracefulShutdown = require('../http/shutdown')

const createWebSocketServer = () => {
  const server = http.createServer()

  const io = socketIO(server)

  return io
}

const startWebSocketServer = server => {
  const startedServer = server.listen(process.env.WEB_SOCKET_PORT)

  setupGracefulShutdown(startedServer)
}

module.exports = {
  createWebSocketServer,
  startWebSocketServer,
}
