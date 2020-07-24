const http = require('http')
const { createApp } = require('./app')
const setupGracefulShutdown = require('./shutdown')

const createServer = (repository) => {
  const app = createApp(repository)

  return http.createServer(app)
}

const startServer = server => {
  const startedServer = server.listen(process.env.PORT || 4000)

  setupGracefulShutdown(startedServer)
}

module.exports = {
  createServer,
  startServer,
}
