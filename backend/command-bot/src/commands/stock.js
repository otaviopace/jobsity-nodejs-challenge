const axios = require('axios')
const { getStockFromCsv, buildStockUrl, buildMessageText, buildMessage } = require('common/src/business-logic/command')
const { logger } = require('common/src/logger')

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

module.exports = {
  fetchStockAPI,
  processStock,
}
