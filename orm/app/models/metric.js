'use strict'

const Squelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAgentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('metric', {
    uuid: {
      type: Squelize.STRING,
      allowNull: false
    },
    value: {
      type: Squelize.TEXT,
      allowNull: false
    }
  })
}
