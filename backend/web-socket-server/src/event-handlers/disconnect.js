const { logger } = require('common/src/logger')

const onDisconnect = () => {
  logger.info('A user disconnected from the chat')
}

module.exports = onDisconnect
