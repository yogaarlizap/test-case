module.exports = (useCases) => {
  const { StudentUseCase } = useCases

  async function index(req, res, next) {
    const params = req.query;

    const students = await StudentUseCase.findAll(params)

    return res.render('student/index', {
      title: 'Daftar Student',
      active: 'student',
      students
    })
  }

  async function detail(req, res, next) {
    const student = await StudentUseCase.findOne(req.params)

    return res.render('student/detail', {
      title: 'Edit Student',
      active: 'student',
      student
    })
  }

  async function show(req, res, next) {
    return res.json(await StudentUseCase.findOne(req.params))
  }

  async function create(req, res) {
    return res.render('student/create', {
      title: 'Tambah Student',
      active: 'student'
    })
  }

  async function edit(req, res) {
    const student = await StudentUseCase.findOne(req.params);
    return res.render('student/update', {
      title: 'Edit Student',
      active: 'student',
      student
    })
  }

  async function store(req, res, next) {
    try {
      await StudentUseCase.create(req.body)

      return res.redirect('/student')
    } catch (error) {
      next(error)
    }
  }

  async function update(req, res, next) {
    try {
      await StudentUseCase.update(req.params, req.body)
      return res.redirect('/student')
    } catch (error) {
      next(error)
    }
  }

  async function destroy(req, res, next) {
    try {
      await StudentUseCase.destroy(req.params)
      return res.redirect('/student')
    } catch (error) {
      next(error)
    }
  }

  async function relationship(req, res, next) {
    return res.json(await StudentUseCase.index())
  }

  return { index, show, create, store, edit, update, destroy, relationship }
}
