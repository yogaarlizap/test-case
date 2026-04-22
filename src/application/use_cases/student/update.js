const Joi = require("joi")
const AppError = require("../../../frameworks/helpers/app-error")

const validate = (payload) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        fullName: Joi.string().required()
    });

    const validator = schema.validate(payload);

    if(validator.error) throw new AppError(validator.error.message, 400)
}

module.exports = async (repositories, params, payload) => {
    const { StudentRepository } = repositories
    validate({ ...params, ...payload })

    return await StudentRepository.update(params.id, payload)
}
