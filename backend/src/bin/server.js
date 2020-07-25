const { createServer, startServer } = require('../ports/http-server')
const { listenWebSocket } = require('../ports/web-socket')
const repository = require('../ports/repository')
const rabbitmq = require('../ports/rabbitmq')
const { logger } = require('../logger')
const setupDotenv = require('../config')

setupDotenv()

const start = async () => {
  const repo = await repository.connect()
  logger.info('Database connecion succeeded')

  const server = createServer(repo)

  const amqpChannel = await rabbitmq.connect()

  listenWebSocket(server, repo, amqpChannel)

  startServer(server)
  logger.info('Server started listening')
}

start()
  .catch(logger.error)
