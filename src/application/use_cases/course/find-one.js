const Joi = require("joi")
const AppError = require("../../../frameworks/helpers/app-error")

const validate = (payload) => {
    const schema = Joi.object({
        id: Joi.number().integer().required()
    });

    const validator = schema.validate(payload);

    if(validator.error) throw new AppError(validator.error.message, 400)
}

module.exports = async (repositories, params) => {
    const { CourseRepository } = repositories

    validate(params)

    return await CourseRepository.show(params)
}
