const { createServer, startServer } = require('../ports/http-server')
const { listenWebSocket } = require('../ports/web-socket')
const repository = require('../ports/repository')
const messageBroker = require('../ports/message-broker')
const { logger } = require('../logger')
const setupDotenv = require('../config')

setupDotenv()

const start = async () => {
  const repo = await repository.connect()
  logger.info('Database connecion succeeded')

  const server = createServer(repo)

  const msgBroker = await messageBroker.connect()

  listenWebSocket(server, repo, msgBroker)

  startServer(server)
  logger.info('Server started listening')
}

start()
  .catch(logger.error)
