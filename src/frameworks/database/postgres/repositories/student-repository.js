const _ = require("lodash");

module.exports = (models) => {
  const { Student, StudentCourse } = models
  function index(params, include = []) {
    return Student.findAll({ where: params, include: include })
  }
  function show(id) {
    return Student.findOne({ where: id, include: ["courses"] })
  }
  async function create(payload) {
    const data = {
      fullName: payload.fullName
    }

    const student = await Student.create(data)
    console.log(payload);
    
    if(payload.courseId) await student.addCourses(payload.courseId)

    return student
  }
  async function update(id, payload) {
    const student = await Student.findOne({ where: { id }});
    await student.update({fullName: payload.fullName});

    await student.setCourses(payload.courseId)
    return student
  }

  async function destroy(id) {
    const student = await Student.findOne({ where: {id}, include: ["courses"] });
    const courseIds = _.map(student.courses, "id");

    student.removeCourses(courseIds)

    return student.destroy()
  }

  return { index, show, create, update, destroy }
}
