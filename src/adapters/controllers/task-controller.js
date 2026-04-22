const Joi = require('joi')
const AppError = require('../frameworks/helpers/app-error')
const moment = require('moment')
module.exports = (repositories) => {
  const cacheKey = 'cache:key_ifan'
  const rabbitKey = 'rabbit_ifan'

  const { taskRepository, redisRepository, rabbitMqRepo } = repositories
  async function index(req, res, next) {
    return res.json(await taskRepository.index())
  }

  async function show(req, res, next) {
    return res.json(await taskRepository.show(req.params.id))
  }

  async function create(req, res, next) {
    try {
      validate({ status: req.body.status })

      const created = await taskRepository.create(req.body)
      if (created) await redisRepository.destroyData(cacheKey)

      const endTime = moment(
        moment(moment().format('YYYY-MM-DD') + ' ' + created.endTime)
      )
      const timer = moment.duration(endTime.diff(moment()))

      await rabbitMqRepo.publishQueue(
        rabbitKey,
        created,
        timer.seconds() * 1000
      )

      return res.json({ message: 'sukses' })
    } catch (e) {
      next(e.message)
    }
  }

  async function update(req, res, next) {
    try {
      validate({ status: req.body.status })

      const data = await taskRepository.show(req.params.id)

      if (data) {
        let [isUpdated, [updated]] = await taskRepository.update(
          req.params.id,
          req.body
        )
        if (updated) await redisRepository.destroyData(cacheKey)

        return res.json({ message: 'sukses' })
      }

      res.json({ message: 'data not found' })
    } catch (e) {
      next(e.message)
    }
  }

  async function destroy(req, res, next) {
    await taskRepository.destroy(req.params.id)
    const deleted = await redisRepository.destroyData(cacheKey)

    if (deleted) await redisRepository.destroyData(cacheKey)

    return res.json({ message: 'sukses' })
  }

  async function relationship(req, res, next) {
    const redisCheck = await redisRepository.getData(cacheKey)

    if (redisCheck) return res.json({ isCache: true, data: redisCheck })

    const results = await taskRepository.relationship()
    await redisRepository.setData(cacheKey, results)

    return res.json(results)
  }

  function validate(payload) {
    const schema = Joi.object({
      status: Joi.string().valid('open', 'working', 'closed', 'overdue')
    })

    const { error } = schema.validate(payload)

    if (error) throw new AppError(error.message, 400)
  }
  return { index, show, create, update, destroy, relationship }
}
