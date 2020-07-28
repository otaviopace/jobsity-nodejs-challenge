const buildStockUrl = stockCode =>
  `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`

const getStockFromCsv = csv => {
  // eslint-disable-next-line no-unused-vars
  const [headers, stockData] = csv.split('\n')

  // eslint-disable-next-line no-unused-vars
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
  text: buildMessageText(stockCode, stockValue)
})

const buildCommand = text => {
  const [commandName, parameter] = text.split('=')

  switch (commandName) {
    case '/stock':
      return { type: 'stock', parameters: { stock_code: parameter } }
    default:
      return { type: 'unknown', parameters: {} }
  }
}

module.exports = {
  getStockFromCsv,
  buildStockUrl,
  buildMessageText,
  buildMessage,
  buildCommand
}
