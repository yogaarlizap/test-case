const express = require("express");
const router = express.Router();

module.exports = (controllers) => {
    const { scoreController: controller } = controllers

    router.get("/score", controller.index)
    router.get('/score/create', controller.create)
    router.post("/score", controller.store)

    router.put("/score/:id", controller.update)
    router.delete("/score/:id", controller.destroy)
    router.get('/score/:id', controller.detail)
    router.get('/score/edit/:id', controller.edit)
    return router
}