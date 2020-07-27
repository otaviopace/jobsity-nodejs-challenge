const { createApp } = require('./app')
const setupGracefulShutdown = require('./shutdown')

const startHttpServer = repo => {
  const app = createApp(repo)

  const startedServer = app.listen(process.env.HTTP_PORT)

  setupGracefulShutdown(startedServer)
}

module.exports = {
  startHttpServer,
}
