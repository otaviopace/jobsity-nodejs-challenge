const Promise = require('bluebird')
const passport = require('passport')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const setupDotenv = require('./config')
const setupGracefulShutdown = require('./shutdown')
const { connectToDatabase } = require('./database')
const DatabaseError = require('./errors/database')

setupDotenv()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.sendStatus(200))
app.post('/', (req, res) => res.status(200).send(req.body))

const startServer = application =>
  application.listen(process.env.PORT || 3000)

const start = () => Promise.resolve((async () => {
  const db = await connectToDatabase()
  console.log('success on database connection')

  const server = startServer(app)
  console.log('server started listening')
  setupGracefulShutdown(server)
})())

start()
  .catch(DatabaseError, error => console.error('failed to connect to database, error:', error))
  .catch(error => console.error('unknown error:', error))
