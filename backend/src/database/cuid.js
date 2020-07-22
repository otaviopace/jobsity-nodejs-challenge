const cuid = require('cuid')

const defaultCuidValue = (prefix = '') =>
  () => cuid(`${prefix}${cuid()}`)

module.exports = defaultCuidValue
