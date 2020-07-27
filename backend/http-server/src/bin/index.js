const { startHttpServer } = require('common/src/ports/http')
const { createApp } = require('../app')
const repository = require('common/src/ports/repository')
const { logger } = require('common/src/logger')
const setupDotenv = require('common/src/config')

setupDotenv()

const start = async () => {
  const repo = await repository.connect()
  logger.info('Database connecion succeeded')

  const app = createApp(repo)

  startHttpServer(app)
  logger.info('Server started listening')
}

start()
  .catch(logger.error)
