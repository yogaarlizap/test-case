module.exports = (models) => {
  const { Student } = models
  function index(params) {
    return Student.findAll({ where: params })
  }
  function show(id) {
    return Student.findOne({ where: id })
  }
  function create(payload) {
    return Student.create(payload, include: "")
  }
  function update(id, payload) {
    return Student.update(payload, { where: { id } })
  }
  function destroy(id) {
    return Student.destroy({ where: { id } })
  }

  return { index, show, create, update, destroy }
}
