const express = require("express");
const router = express.Router();

module.exports = (controllers) => {
    const { studentController: controller } = controllers

    router.get("/student", controller.index)
    router.get('/student/create', controller.create)
    router.post("/student", controller.store)

    router.put("/student/:id", controller.update)
    router.delete("/student/:id", controller.destroy)
    router.get('/student/:id', controller.detail)
    router.get('/student/edit/:id', controller.edit)
    return router
}