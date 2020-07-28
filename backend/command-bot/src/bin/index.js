const messageBroker = require('common/src/ports/message-broker')
const { logger } = require('common/src/logger')
const { processStock } = require('../commands/stock')

const processCommand = command => {
  switch (command.type) {
    case 'stock':
      return processStock(command.parameters)
    default:
      logger.warn(`Command type '${command.type}' not available`)
      return Promise.resolve()
  }
}

const start = async () => {
  const msgBroker = await messageBroker.connect()

  msgBroker.on('error', logger.error)

  msgBroker.listen('commands', async command => {
    const result = await processCommand(command)

    if (!result) return

    return msgBroker.sendToQueue('messages', result)
  })
}

start()
  .catch(logger.error)
