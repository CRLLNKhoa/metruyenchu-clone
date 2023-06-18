const express = require("express")
const router = express.Router()
const noticController = require("../controllers/noticController")

router.get("/get-all/:id" ,noticController.getAll)
router.put("/del/:id" ,noticController.delAllNotic)

module.exports = router