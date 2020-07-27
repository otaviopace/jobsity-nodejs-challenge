const axios = require('axios')
const messageBroker = require('../ports/message-broker')
const { getStockFromCsv, buildStockUrl, buildMessageText, buildMessage } = require('../business-logic/command')
const { logger } = require('../logger')

const fetchStockAPI = url =>
  axios({
    url,
    method: 'get',
    headers: {
      'Content-Type': 'text/csv',
    },
  })

const processStock = ({ stock_code }) =>
  Promise.resolve(buildStockUrl(stock_code))
    .then(fetchStockAPI)
    .then(response => response.data)
    .then(getStockFromCsv)
    .then(buildMessage(stock_code))
    .catch(logger.error)

const processCommand = command => {
  switch (command.type) {
    case 'stock':
      return processStock(command.parameters)
      break
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
