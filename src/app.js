require('dotenv').config()
const config = require('./config/config')
const express = require('express')
const routes = require('./frameworks/webserver/routes/routes')
const server = require('./frameworks/webserver/server')
const postgresConnection = require('./frameworks/database/postgres/connection')
const expressConfig = require('./frameworks/webserver/express')
;(async () => {
  // DEFINE EXPRESS
  const app = express()

  expressConfig(app)

  // RUN SEQUELIZE
  const sequelize = postgresConnection(config)

  // HELPERS
  /*===================================================IMPORT========================================================== */
  //MODEL
  const User = require("./frameworks/database/postgres/models/user")
  const Course = require("./frameworks/database/postgres/models/course")
  const Student = require("./frameworks/database/postgres/models/student")
  const StudentCourse = require('./frameworks/database/postgres/models/studentCourse')
  const Score = require('./frameworks/database/postgres/models/score')

  //REPOSITORY
  const CourseRepository = require("./frameworks/database/postgres/repositories/course-repository")
  const StudentRepository = require("./frameworks/database/postgres/repositories/student-repository")
  const ScoreRepository = require("./frameworks/database/postgres/repositories/score-repository")

  //USE CASE
  const CourseUseCase = require("./application/use_cases/course/index")
  const StudentUseCase = require("./application/use_cases/student/index")
  const ScoreUseCase = require("./application/use_cases/score/index")
  //CONTROLLER
  const CourseController = require("./adapters/controllers/course-controller")
  const StudentController = require("./adapters/controllers/student-controller")
  const ScoreController = require("./adapters/controllers/score-controller")

  /*===================================================DEFINE========================================================== */
  //MODELS
  const models = {
    User: User(sequelize),
    Course: Course(sequelize),
    Student: Student(sequelize),
    StudentCourse: StudentCourse(sequelize),
    Score: Score(sequelize)
  }

  //REPOSITORIES
  const repositories = {
    CourseRepository: CourseRepository(models),
    StudentRepository: StudentRepository(models),
    ScoreRepository: ScoreRepository(models)
  }

  //USE CASES
  const useCases = {
    CourseUseCase: await CourseUseCase(repositories),
    StudentUseCase: await StudentUseCase(repositories),
    ScoreUseCase: await ScoreUseCase(repositories)
  }

  //CONTROLLERS
  const controllers = {
    courseController: await CourseController(useCases),
    studentController: await StudentController(useCases),
    scoreController: await ScoreController(useCases)
  }

  // DEFINE ROUTES
  routes(app, controllers)

  // RUN SERVER
  server(app)
})()
