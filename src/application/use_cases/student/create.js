const Joi = require("joi")
const AppError = require("../../../frameworks/helpers/app-error")

const validate = (payload) => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        courseId: Joi.number().required()
    });

    const validator = schema.validate(payload);

    if(validator.error) throw new AppError(validator.error.message, 400)
}

module.exports = async (repositories, payload) => {
    const { StudentRepository } = repositories

    validate(payload)

    return await StudentRepository.create(payload)
}
