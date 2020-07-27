const { startHttpServer } = require('../ports/http')
const repository = require('../ports/repository')
const { logger } = require('../logger')
const setupDotenv = require('../config')

setupDotenv()

const start = async () => {
  const repo = await repository.connect()
  logger.info('Database connecion succeeded')

  startHttpServer(repo)
  logger.info('Server started listening')
}

start()
  .catch(logger.error)
