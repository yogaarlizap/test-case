const Joi = require("joi")
const AppError = require("../../../frameworks/helpers/app-error")

const validate = (payload) => {
    const schema = Joi.object({
        scores: Joi.array().items(Joi.object({
            studentCourseId: Joi.number().required(),
            score: Joi.number().required()
        })).required(),
    });

    const validator = schema.validate(payload);

    if(validator.error) throw new AppError(validator.error.message, 400)
}

module.exports = async (repositories, payload) => {
    const { ScoreRepository } = repositories

    validate(payload)

    return await ScoreRepository.bulkCreate(payload.scores)
}
