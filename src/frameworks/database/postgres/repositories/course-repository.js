module.exports = (models) => {
  const { Course } = models
  function index(params) {
    return Course.findAll({where: params})
  }
  function show(id) {
    return Course.findOne({where: id})
  }
  function create(payload) {
    return Course.create(payload)
  }
  function update(id, payload) {
    return Course.update(payload, { where: { id }, returning: true })
  }
  function destroy(id) {
    return Course.destroy({ where: { id } })
  }
  function relationship(params) {
    return Course.findAll({
      where: params,
      include: {
        association: 'students'
      }
    })
  }

  return { index, show, create, update, destroy, relationship }
}
