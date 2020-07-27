const { createWebSocketServer, startWebSocketServer } = require('common/src/ports/web-socket')
const setupEventHandlers = require('../event-handlers')
const setupDotenv = require('common/src/config')
const repository = require('common/src/ports/repository')
const messageBroker = require('common/src/ports/message-broker')
const { logger } = require('common/src/logger')

setupDotenv()

const start = async () => {
  const repo = await repository.connect()
  logger.info('Database connecion succeeded')

  const msgBroker = await messageBroker.connect()

  const io = createWebSocketServer()

  setupEventHandlers(io, repo, msgBroker)

  startWebSocketServer(io)
}

start()
  .catch(logger.error)
