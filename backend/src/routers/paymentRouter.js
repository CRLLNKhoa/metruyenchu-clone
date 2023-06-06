const express = require("express")
const router = express.Router()
const dotenv = require("dotenv")
const hisPaymentController = require("../controllers/historyPaymentController")

dotenv.config()

router.get("/config", (req,res)=>{
    return res.status(200).json({
        status: "OK",
        data: process.env.CLIENT_ID
    })
})
router.get("/history/:id", hisPaymentController.getAll)

module.exports = router