const axios = require('axios')
const rabbitmq = require('../ports/rabbitmq')
const { logger } = require('../logger')

const parseMessage = message => {
  try {
    return JSON.parse(message)
  } catch (error) {
    return null
  }
}

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
    .then(JSON.stringify)
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
  const channel = await rabbitmq.connect()

  channel.assertQueue('commands', { durable: false })

  channel.consume('commands', async data => {
    const command = parseMessage(data.content)

    if (!command) {
      logger.warn(`Command bad JSON format: ${data.content}`)
      return
    }

    const result = await processCommand(command)

    if (!result) {
      return
    }

    return rabbitmq.sendMessage(channel, 'messages', result)
  }, {
    noAck: true
  })
}

start()
  .catch(console.error)
