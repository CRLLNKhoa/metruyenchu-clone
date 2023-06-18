const express = require("express")
const router = express.Router()
const CommentController = require("../controllers/commentController")

router.post("/create", CommentController.createComment)
// router.delete("/delete/:id" ,ChapterController.deleteChapter)
router.get("/get/:id" ,CommentController.getComment)
router.get("/get-of-chapter/:id" ,CommentController.getCommentPageChapter)
router.put("/like/:id" ,CommentController.like)
router.put("/unlike/:id" ,CommentController.unlike)
router.put("/replay/:id" ,CommentController.replayComment)
// router.get("/get-chapter-of-story/:id",ChapterController.getAllByStory)
// router.put("/update/:id",ChapterController.updateChapter)

module.exports = router