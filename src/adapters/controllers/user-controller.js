const Joi = require('joi')
const AppError = require('../../frameworks/helpers/app-error')

module.exports = (repositories) => {
  const { userRepository } = repositories
  async function index(req, res, next) {
    return res.json(await userRepository.index())
  }

  async function show(req, res, next) {
    return res.json(await userRepository.show(req.params.id))
  }

  async function create(req, res, next) {
    try {
      validate({ role: req.body.role })
      return res.json(await userRepository.create(req.body))
    } catch (e) {
      next(e.message)
    }
  }

  async function update(req, res, next) {
    return res.json(await userRepository.update(req.params.id, req.body))
  }

  async function destroy(req, res, next) {
    return res.json(await userRepository.destroy(req.params.id))
  }

  async function relationship(req, res, next) {
    return res.json(await userRepository.index())
  }

  function validate(payload) {
    const schema = Joi.object({
      role: Joi.string().valid('project manager', 'developer', 'Tester')
    })

    const { error } = schema.validate(payload)

    if (error) throw new AppError(error.message, 400)
  }

  return { index, show, create, update, destroy, relationship }
}
