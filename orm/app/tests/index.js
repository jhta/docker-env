'use strict'

import test from 'ava'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

let config = {
  logging: () => {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}

let db = null
let sandbox = null
let AgentStub = null

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  AgentStub = {
    hasMany: sandbox.spy()
  }

  const setupDB = proxyquire('../index', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDB(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist')
})

test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'Agent Model was executed')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Agent should be the MetricModel')
  t.true(MetricStub.belongsTo.called, 'Metric Model was executed')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Metric should be the Agent model')
})
