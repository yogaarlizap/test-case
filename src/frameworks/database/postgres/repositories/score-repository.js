module.exports = (models) => {
  const { Score } = models
  function index() {
    return Score.findAll()
  }
  function show(id) {
    return Score.findByPk(id)
  }
  function create(payload) {
    return Score.create(payload)
  }
  function update(id, payload) {
    return Score.update(payload, { where: { id } })
  }
  function destroy(id) {
    return Score.destroy({ where: { id } })
  }

  return { index, show, create, update, destroy }
}
