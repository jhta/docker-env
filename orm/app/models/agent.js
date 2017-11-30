'use strict'

const Squelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAgentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('agent', {
    uuid: {
      type: Squelize.STRING,
      allowNull: false
    },
    username: {
      type: Squelize.STRING,
      allowNull: false
    },
    name: {
      type: Squelize.STRING,
      allowNull: false
    },
    hostname: {
      type: Squelize.STRING,
      allowNull: false
    },
    pid: {
      type: Squelize.INTEGER,
      allowNull: false
    },
    connected: {
      type: Squelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}
