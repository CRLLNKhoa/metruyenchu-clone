const express = require("express")
const router = express.Router()
const storyController = require("../controllers/storyController")

router.post("/create", storyController.createStory)
router.put("/update/:id",storyController.updateStory)
router.delete("/delete/:id" ,storyController.deleteStory)
router.get("/get-all" ,storyController.getAll)
router.get("/get-rating" ,storyController.getStorySortRating)
router.get("/get-all-author/:id" ,storyController.getAllAuthor)
router.get("/get-detail/:id" ,storyController.getDetail)

module.exports = router