const cuid = require('cuid')

const defaultCuidValue = (prefix = '') =>
  () => `${prefix}${cuid()}`

module.exports = defaultCuidValue
