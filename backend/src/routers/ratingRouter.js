const express = require("express")
const router = express.Router()
const ratingController = require("../controllers/ratingController")

router.post("/add", ratingController.createRating)
router.delete("/delete/:id" ,ratingController.deleteGenre)
router.get("/get-all/:id" ,ratingController.getAll)
router.get("/get-new" ,ratingController.getNewRating)
router.put("/update/:id" ,ratingController.updateRating)
router.get("/get/:story/:user" ,ratingController.getMyRating)

module.exports = router