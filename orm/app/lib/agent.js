'use strict'

module.exports = function setupAgentModel (AgentModel) {
  return {
    findById: id => AgentModel.findById(id),

    createOrUpdate: async (agent) => {
      const condition = {
        where: {
          uuid: agent.uuid
        }
      }

      const existAgent = await AgentModel.findOne(condition)

      if (existAgent) {
        const updated = await AgentModel.update(agent, condition)
        return updated ? AgentModel.findOne(condition) : existAgent
      }

      const result = await AgentModel.create(agent)
      return result.toJSON()
    }
  }
}
