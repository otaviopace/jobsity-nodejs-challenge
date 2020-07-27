const axios = require('axios')
const messageBroker = require('../ports/message-broker')
const { logger } = require('../logger')

const buildUrl = stockCode =>
  `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`

const getStockFromCsv = csv => {
  const [headers, stockData] = csv.split('\n')

  const [symbol, date, time, open, high, low, close, volume] = stockData.split(',')

  if (!close) {
    return open
  }

  return close
}

const buildMessageText = (stockCode, stockValue) =>
  `${stockCode.toUpperCase()} quote is $${stockValue} per share`

const buildMessage = stockCode => stockValue => ({
  username: 'stock-bot',
  text: buildMessageText(stockCode, stockValue),
})

const fetchStockAPI = url =>
  axios({
    url,
    method: 'get',
    headers: {
      'Content-Type': 'text/csv',
    },
  })

const processStock = ({ stock_code }) =>
  Promise.resolve(buildUrl(stock_code))
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
  .catch(console.error)
