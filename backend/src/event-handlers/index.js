const onConnection = require('./connection')

const setupEventHandlers = (io, repository, messageBroker) => {
  io.on('connection', onConnection(io, repository, messageBroker))
}

module.exports = setupEventHandlers
