const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const setupDotenv = require('./config')
const database = require('./database')

setupDotenv()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.sendStatus(200))
app.post('/', (req, res) => res.status(200).send(req.body))

database.authenticate()
  .then(() => console.log('success on database connection'))
  .catch(error => console.error('failed to connect to database, error:', error))

app.listen(process.env.PORT || 3000)
