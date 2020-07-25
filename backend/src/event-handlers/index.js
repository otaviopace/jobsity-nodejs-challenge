const onConnection = require('./connection')

const setupEventHandlers = (io, repository) => {
  io.on('connection', onConnection(io, repository))
}

module.exports = setupEventHandlers
