'use strict'

import test from 'ava'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

import agentFixtures from './fixtures/agent'

let config = {
  logging: () => {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}

let db = null
let sandbox = null
let AgentStub = null
let id = 1
let uuid = 'yyy-yyy-yyy'
const uuidArgs = {
  where: {
    uuid
  }
}

let single = Object.assign({}, agentFixtures.single)

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  AgentStub = {
    hasMany: sandbox.spy()
  }

  // STUB findById
  AgentStub.findById = sandbox.stub()
  AgentStub
    .findById
    .withArgs(id)
    .returns(
      Promise.resolve(agentFixtures.byId(id))
    )

  // STUB create or update
  AgentStub.update = sandbox.stub()
  AgentStub
    .update
    .withArgs(single, uuidArgs)
    .returns(
      Promise.resolve(single)
    )

  // STUB find one
  AgentStub.findOne = sandbox.stub()
  AgentStub
    .findOne
    .withArgs(uuidArgs)
    .returns(
      Promise.resolve(agentFixtures.byUuid(uuid))
    )
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

test.serial('Agent#findById', async t => {
  let agent = await db.Agent.findById(id)
  t.true(AgentStub.findById.called, 'should be called')
  t.true(AgentStub.findById.calledOnce, 'should be called one time')
  t.true(AgentStub.findById.calledWith(id), 'should be called with a specific id')
  t.deepEqual(agent, agentFixtures.byId(id), 'should be the same')
})

test.serial('Agent#createOrUpdate', async t => {
  let agent = await db.Agent.createOrUpdate(single)
  t.true(AgentStub.update.called, 'should be called')
  t.true(AgentStub.update.calledOnce, 'should be called one time')
  t.true(AgentStub.update.calledWith(single), 'should be called with a specific agent')
  t.deepEqual(agent, single, 'agent should be the same')
})
