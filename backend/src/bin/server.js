const { createServer, startServer } = require('../ports/http-server')
const { listenWebSocket } = require('../ports/web-socket')
const repository = require('../ports/repository')
const { logger } = require('../logger')
const setupDotenv = require('../config')

setupDotenv()

const start = async () => {
  const repo = await repository.connect()
  logger.info('Database connecion succeeded')
  throw new Error('bad stuff')

  const server = createServer(repo)

  listenWebSocket(server, repo)

  startServer(server)
  logger.info('Server started listening')
}

start()
  .catch(logger.error)
