const findAll = require("./find-all")
const findOne = require("./find-one")
const create = require("./create")
const update = require("./update")
const destroy = require("./delete")

module.exports = (repositories) => {
    return {
      findAll: findAll.bind(null, repositories),
      findOne: findOne.bind(null, repositories),
      create: create.bind(null, repositories),
      update: update.bind(null, repositories),
      destroy: destroy.bind(null, repositories)
    }
}