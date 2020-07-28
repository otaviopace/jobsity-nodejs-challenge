const log4js = require('log4js').getLogger()
const escriba = require('escriba')

log4js.level = 'info'

const { logger, httpLogger } = escriba({
  loggerEngine: log4js,
  service: 'api',
  sensitive: {
    password: {
      paths: ['message.password', 'body.password'],
      pattern: /\w.*/g,
      replacer: '*'
    },
    password_hash: {
      paths: ['message.password_hash', 'body.password_hash'],
      pattern: /\w.*/g,
      replacer: '*'
    },
    token: {
      paths: ['message.token', 'body.token'],
      pattern: /\w.*/g,
      replacer: '*'
    }
  },
  httpConf: {
    propsToLog: {
      request: ['id', 'url', 'body', 'method', 'connection.remoteAddress', 'query'],
      response: ['id', 'url', 'body', 'statusCode', 'latency', '_headers']
    },
    skipRules: [
      {
        route: /\/health_check/,
        method: /.*/,
        onlyBody: false
      },
      {
        route: /.*/,
        method: /GET/,
        onlyBody: true
      },
      {
        route: /.*/,
        method: /OPTIONS/,
        onlyBody: false
      }
    ],
    propMaxLength: {
      body: 2048,
      url: 1024
    }
  }
})

module.exports = {
  logger,
  httpLogger
}
