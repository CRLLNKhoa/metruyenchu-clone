const express = require("express")
const router = express.Router()
const genreController = require("../controllers/genreController")

router.post("/create", genreController.createGenre)
router.delete("/delete/:id" ,genreController.deleteGenre)
router.get("/get-all" ,genreController.getAll)
router.put("/update/:id" ,genreController.updateGenre)

module.exports = router