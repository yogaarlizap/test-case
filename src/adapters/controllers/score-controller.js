module.exports = (useCases) => {
  const { ScoreUseCase, StudentUseCase, CourseUseCase } = useCases

  async function index(req, res, next) {
    const params = req.query;

    const students = await ScoreUseCase.findAll(params)
    
    return res.render('score/index', {
      title: 'Daftar Score',
      active: 'score',
      students
    })
  }

  async function detail(req, res, next) {
    const student = await ScoreUseCase.findOne(req.params)

    return res.render('score/detail', {
      title: 'Show Score',
      active: 'score',
      student
    })
  }

  async function show(req, res, next) {
    return res.json(await StudentUseCase.findOne(req.params))
  }

  async function create(req, res) {
    const courses = await CourseUseCase.findAll()
    return res.render('score/create', {
      title: 'Tambah Score',
      active: 'score',
      courses
    })
  }

  async function edit(req, res) {
    const student = await StudentUseCase.findOne(req.params)
    const courses = await CourseUseCase.findAll()
    return res.render('score/form', {
      title: 'Edit Score',
      active: 'score',
      student, courses
    })
  }

  async function store(req, res, next) {
    try {
      await ScoreUseCase.create(req.body)

      return res.redirect('/score')
    } catch (error) {
      next(error)
    }
  }

  async function update(req, res, next) {
    try {
      await StudentUseCase.update(req.params, req.body)
      return res.redirect('/score')
    } catch (error) {
      next(error)
    }
  }

  async function destroy(req, res, next) {
    try {
      await StudentUseCase.destroy(req.params)
      return res.redirect('/score')
    } catch (error) {
      next(error)
    }
  }

  async function relationship(req, res, next) {
    return res.json(await StudentUseCase.index())
  }

  return { index, detail, show, create, store, edit, update, destroy, relationship }
}
