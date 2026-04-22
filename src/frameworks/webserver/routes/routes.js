// const routeNotFoundController = require('../../../adapters/controllers/route-not-found-controller')
const expressLayouts = require('express-ejs-layouts')
const course = require("./course")
const express = require("express");
const path = require("path")
const methodOverride = require('method-override');
const student = require('./student');

const routes = (app, controllers) => {
  app.use(expressLayouts)
  app.set('view engine', 'ejs')
  app.set('layout', 'layouts/main')
  app.set('views', path.join(__dirname, '../../../views'))
  app.use(express.urlencoded({ extended: true }))
  app.use(methodOverride('_method'))

  app.use(course(controllers))
  app.use(student(controllers))
  // PROJECT
  // app.get('/projects', projectController.index)
  // app.get('/projects/:id', projectController.show)
  // app.post('/projects', projectController.create)
  // app.patch('/projects/:id', projectController.update)
  // app.delete('/projects/:id', projectController.destroy)

  // // USERS
  // app.get('/users', userController.index)
  // app.get('/users/:id', userController.show)
  // app.post('/users', userController.create)
  // app.patch('/users/:id', userController.update)
  // app.delete('/users/:id', userController.destroy)

  // // TASKS
  // app.get('/tasks', taskController.index)
  // app.get('/tasks/:id', taskController.show)
  // app.get('/task-relationship', taskController.relationship)
  // app.post('/tasks', taskController.create)
  // app.patch('/tasks/:id', taskController.update)
  // app.delete('/tasks/:id', taskController.destroy)

  // app.all('*', routeNotFoundController)
}

module.exports = routes
