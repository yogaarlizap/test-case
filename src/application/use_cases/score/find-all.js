const Joi = require("joi")
const AppError = require("../../../frameworks/helpers/app-error")

const validate = (payload) => {
    const schema = Joi.object({
        id: Joi.number().integer()
    });

    const validator = schema.validate(payload);

    if(validator.error) throw new AppError(validator.error.message, 400)
}

module.exports = async (repositories, params) => {
    const { StudentRepository, ScoreRepository } = repositories

    validate(params)

    const student = await StudentRepository.index(params, [{association: "courses"}])

    const score = await ScoreRepository.index();

    const data = addScore(student, score)

    return data
}


const addScore = (students, scores) => {
    students.forEach((student) => {
        student.courses.forEach((course) => {
            if(scores.length != 0){
                scores.forEach((score) => {
                    if(course.StudentCourse.id == score.studentCourseId){
                        course.score = score
                    }
                })
            } else {
                course.score = null
            }
        })
    })

    return students
}