const log4js = require('log4js').getLogger()
const escriba = require('escriba')
const cuid = require('cuid')

log4js.level = 'info'

const { logger } = escriba({
  loggerEngine: log4js,
  service: 'api',
  sensitive: {
    password: {
      paths: ['message.password'],
      pattern: /\w.*/g,
      replacer: '*',
    },
    password_hash: {
      paths: ['message.password_hash'],
      pattern: /\w.*/g,
      replacer: '*',
    },
  },
})

module.exports = {
  logger,
}
