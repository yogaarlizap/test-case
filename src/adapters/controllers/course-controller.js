module.exports = (useCases) => {
  const { CourseUseCase } = useCases

  async function index(req, res, next) {
    const params = req.query;

    const courses = await CourseUseCase.findAll(params)

    return res.render('course/index', {
      title: 'Daftar Course',
      active: 'course',
      courses
    })
  }

  async function detail(req, res, next) {
    const course = await CourseUseCase.findOne(req.params)

    return res.render('course/detail', {
      title: 'Edit Course',
      active: 'course',
      course
    })
  }

  async function show(req, res, next) {
    return res.json(await CourseUseCase.findOne(req.params))
  }

  async function create(req, res) {
    return res.render('course/create', {
      title: 'Tambah Course',
      active: 'course'
    })
  }

  async function edit(req, res) {
    const course = await CourseUseCase.findOne(req.params);
    return res.render('course/update', {
      title: 'Edit Course',
      active: 'course',
      course
    })
  }

  async function store(req, res, next) {
    try {
      await CourseUseCase.create(req.body)

      return res.redirect('/course')
    } catch (error) {
      next(error)
    }
  }

  async function update(req, res, next) {
    try {
      await CourseUseCase.update(req.params, req.body)
      return res.redirect('/course')
    } catch (error) {
      next(error)
    }
  }

  async function destroy(req, res, next) {
    try {
      await CourseUseCase.destroy(req.params)
      return res.redirect('/course')
    } catch (error) {
      next(error)
    }
  }

  async function relationship(req, res, next) {
    return res.json(await CourseUseCase.index())
  }

  return { index, detail, show, create, store, edit, update, destroy, relationship }
}
