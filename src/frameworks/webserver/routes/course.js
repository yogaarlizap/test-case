const express = require("express");
const router = express.Router();

module.exports = (controllers) => {
    const { courseController: controller } = controllers

    router.get("/course", controller.index)
    router.get('/course/create', controller.create)
    router.post("/course", controller.store)

    router.put("/course/:id", controller.update)
    router.delete("/course/:id", controller.destroy)
    router.get('/course/:id', controller.detail)
    router.get('/course/edit/:id', controller.edit)
    return router
}