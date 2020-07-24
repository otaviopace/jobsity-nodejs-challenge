const http = require('http')
const { createApp } = require('./app')
const setupGracefulShutdown = require('./shutdown')

const createServer = (db) => {
  const app = createApp(db)

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
