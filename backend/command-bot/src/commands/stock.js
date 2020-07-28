const axios = require('axios')
const { getStockFromCsv, buildStockUrl, buildMessage } = require('common/src/business-logic/command')
const { logger } = require('common/src/logger')

const fetchStockAPI = url =>
  axios({
    url,
    method: 'get',
    headers: {
      'Content-Type': 'text/csv'
    }
  })

const processStock = ({ stock_code: stockCode }) =>
  Promise.resolve(buildStockUrl(stockCode))
    .then(fetchStockAPI)
    .then(response => response.data)
    .then(getStockFromCsv)
    .then(buildMessage(stockCode))
    .catch(logger.error)

module.exports = {
  fetchStockAPI,
  processStock
}
