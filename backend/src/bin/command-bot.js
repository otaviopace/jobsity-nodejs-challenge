const axios = require('axios')

// rabbit.queue('commands')
//   .listen((command) => {
//     // switch command
//     // execute command
//     const value = fetchStock(stock)
//
//     const message = buildMessage(value)// APPL.US quote is $93.42 per share
//
//     rabbit.queue('messages').push(message)
//   })

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

const buildMessage = stockCode => stockValue =>
  `${stockCode.toUpperCase()} quote is $${stockValue} per share`

const fetchStockAPI = url =>
  axios({
    url,
    method: 'get',
    headers: {
      'Content-Type': 'text/csv',
    },
  })

const processStock = stockCode =>
  Promise.resolve(buildUrl(stockCode))
    .then(fetchStockAPI)
    .then(response => response.data)
    .then(getStockFromCsv)
    .then(buildMessage(stockCode))
    .then(console.log)
    .catch(error => {
      console.log('U FUCKED UP', error)
    })

const stockCode = 'aapl.us'

processStock(stockCode)
