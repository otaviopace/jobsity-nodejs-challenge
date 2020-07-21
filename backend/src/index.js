const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const setupDotenv = require('./config')
const setupGracefulShutdown = require('./shutdown')
const { sequelize, ensureDbIsConnected } = require('./database')
const DatabaseError = require('./errors/database')

setupDotenv()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.sendStatus(200))
app.post('/', (req, res) => res.status(200).send(req.body))

const startServer = application =>
  application.listen(process.env.PORT || 3000)

ensureDbIsConnected(sequelize)
  .tap(() => console.log('success on database connection'))
  .then(() => startServer(app))
  .tap(() => console.log('server started listening'))
  .then(setupGracefulShutdown)
  .catch(DatabaseError, error => console.error('failed to connect to database, error:', error))
  .catch(error => console.error('unknown error:', error))
