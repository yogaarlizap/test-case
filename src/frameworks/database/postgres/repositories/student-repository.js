const _ = require("lodash");

module.exports = (models) => {
  const { Student, StudentCourse } = models
  function index(params) {
    return Student.findAll({ where: params })
  }
  function show(id) {
    return Student.findOne({ where: id, include: ["courses"] })
  }
  async function create(payload) {
    const data = {
      fullName: payload.fullName
    }

    const student = await Student.create(data)

    if(payload.courseId) await student.addCourses(payload.courseId)

    return student
  }
  function update(id, payload) {
    return Student.update(payload, { where: { id } })
  }
  async function destroy(id) {
    const student = await Student.findOne({ where: {id}, include: ["courses"] });
    const courseIds = _.map(student.courses, "id");

    student.removeCourses(courseIds)

    return student.destroy()
  }

  return { index, show, create, update, destroy }
}
