const dotenv = require('dotenv')
const log4js = require('log4js').getLogger()
const { logger } = require('../src/logger')

dotenv.config({ path: '.env.example' })

log4js.level = 'off'
