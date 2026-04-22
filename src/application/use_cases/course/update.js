const Joi = require("joi")
const AppError = require("../../../frameworks/helpers/app-error")

const validate = (payload) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required()
    });

    const validator = schema.validate(payload);

    if(validator.error) throw new AppError(validator.error.message, 400)
}

module.exports = async (repositories, params, payload) => {
    const { CourseRepository } = repositories
    validate({ ...params, ...payload })

    return await CourseRepository.update(params.id, payload)
}
