const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/sign-up", userController.createUser)
router.post("/sign-in", userController.loginUser)
router.post("/log-out", userController.logoutUser)
router.put("/update-user/:id",userController.updateUser)
router.put("/payment/:id",userController.payment)
router.put("/up-vip/:id",userController.upVip)
router.delete("/delete-user/:id" ,userController.deleteUser)
router.get("/get-all" ,userController.getAllUser)
router.get("/get-seen/:id" ,userController.getReadingStory)
router.get("/get-favorite/:id" ,userController.getFavoriteStories)
router.get("/get-detail/:id" ,userController.getDetailUser)
router.post("/refresh-token" ,userController.refreshToken)
router.put("/read/:id" ,userController.readStory)
router.put("/favorite/:id" ,userController.favoriteStory)
router.put("/unfavorite/:id" ,userController.unfavoriteStory)
router.get("/dashboard/:id" ,userController.getDashboard)
router.get("/dashboardAdmin" ,userController.getDashboardAdmin)

module.exports = router