const router = require("express").Router()
const categoryController = require("../controllers/ServiceCategoryController")

router.post("/category", categoryController.createCategory)

router.get("/category", categoryController.getCategories)

router.put("/category/:id", categoryController.updateCategory)

router.delete("/category/:id", categoryController.deleteCategory)

module.exports = router