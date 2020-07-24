const { createServer, startServer } = require('../ports/http-server')
const { listenWebSocket } = require('../ports/web-socket')
const setupDotenv = require('../config')
const sequelize = require('../ports/sequelize')
const DatabaseError = require('../errors/database')

setupDotenv()

const start = async () => {
  try {
    const db = await sequelize.connect()
    console.log('success on database connection')

    const server = createServer(db)

    listenWebSocket(server, db)

    startServer(server)
    console.log('server started listening')
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error('failed to connect to database, error:', error)
      return
    }

    console.error('unknown error:', error)
  }
}

start()
