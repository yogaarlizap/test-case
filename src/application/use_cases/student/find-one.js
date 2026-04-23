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
    const { StudentRepository, ScoreRepository } = repositories

    validate(params)

    const student = await StudentRepository.show(params)

    const score = await ScoreRepository.index();

    const data = addScore(student, score);

    return data
}

const addScore = (student, scores) => {
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
    getGrade(student)
    return student
}

const getGrade = (student) => {
    const courseLength = student.courses.length
    let totalScore = 0
    student.courses.forEach((course) => {
        totalScore += course.score?.score || 0
    })

    if(totalScore > 70){
        student.grade = "A"
    }else if(totalScore < 70 && totalScore > 50){
        student.grade = "B"
    }else if(totalScore < 50 && totalScore > 40){
        student.grade = "C"
    }else{
        student.grade = "D"
    }

    return student
}