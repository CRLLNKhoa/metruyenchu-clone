const express = require("express")
const router = express.Router()
const ChapterController = require("../controllers/chapterController")

router.post("/create", ChapterController.createChapter)
router.delete("/delete/:id" ,ChapterController.deleteChapter)
router.get("/get-all" ,ChapterController.getAll)
router.get("/get-chapter-of-story/:id",ChapterController.getAllByStory)
router.put("/update/:id",ChapterController.updateChapter)
router.put("/view/:id",ChapterController.view)
router.get("/get/:id" ,ChapterController.getChapter)
router.get("/get-edit/:id" ,ChapterController.getChapterEdit)

module.exports = router