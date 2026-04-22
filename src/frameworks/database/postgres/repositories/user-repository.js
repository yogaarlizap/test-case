module.exports = (models) => {
  const { user } = models
  function index() {
    return user.findAll()
  }
  function show(id) {
    return user.findByPk(id)
  }
  function create(payload) {
    return user.create(payload)
  }
  function update(id, payload) {
    return user.update(payload, { where: { id } })
  }
  function destroy(id) {
    return user.destroy({ where: { id } })
  }

  return { index, show, create, update, destroy }
}
