'use strict'

const debug = require('debug')('orm:setup')
const db = require('./index')
const chalk = require('chalk')
const dbConfig = require('./config')

async function setup () {
  const config = {
    database: dbConfig.database || 'test',
    username: dbConfig.username || 'postgres',
    password: dbConfig.password || '123456',
    host: 'postgres',
    dialect: 'postgres',
    logging: (e) => debug(e),
    setup: true
  }

  await db(config).catch(handleError)

  console.log('Done!')
  process.exit(0)
}

function handleError ({ message, stack }) {
  console.log(`${chalk.red('[oh my god]:')} ${message}`)
  console.log(stack)
  process.exit(1)
}

setup()
