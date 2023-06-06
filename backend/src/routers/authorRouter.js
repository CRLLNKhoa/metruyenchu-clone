const express = require("express")
const router = express.Router()
const authorController = require("../controllers/authorController.js")

router.post("/create", authorController.createAuthor)
router.delete("/delete/:id" ,authorController.deleteAuthor)
router.get("/get-all" ,authorController.getAll)
router.put("/update/:id",authorController.updateAuthor)

module.exports = router