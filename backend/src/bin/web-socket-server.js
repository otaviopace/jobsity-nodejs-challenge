const { startWebSocketServer } = require('../ports/web-socket')
const repository = require('../ports/repository')
const messageBroker = require('../ports/message-broker')
const { logger } = require('../logger')
const setupDotenv = require('../config')

setupDotenv()

const start = async () => {
  const repo = await repository.connect()
  logger.info('Database connecion succeeded')

  const msgBroker = await messageBroker.connect()

  startWebSocketServer(repo, msgBroker)
}

start()
  .catch(logger.error)
