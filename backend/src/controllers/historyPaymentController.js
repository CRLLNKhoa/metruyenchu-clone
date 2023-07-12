const HisPayment = require("../services/historyPaymentService")

const getAll = async (req, res) => {
    const id = req.params.id;
    try{
        const { limit, page,sort } = req.query
        const response = await HisPayment.getAll(id,Number(limit) || 8 , Number(page) || 0)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllAdmin = async (req, res) => {
    try{
        const { limit, page } = req.query
        const response = await HisPayment.getAllAdmin(Number(limit) || 8 , Number(page) || 0)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports ={
    getAll,getAllAdmin
}