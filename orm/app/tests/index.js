'use strict'

import test from 'ava'

let config = {
  logging: () => {}
}

let db = null

test.beforeEach(async () => {
  const setupDB = require('../index')
  db = await setupDB(config)
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist')
})
