const noticService = require("../services/noticService")

const getAll = async (req, res) => {
    try{
        const id = req.params.id;
        const { limit } = req.query
        const response = await noticService.getall(id,limit)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const delAllNotic = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await noticService.delAllNotic(id)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}



module.exports ={
    getAll,
    delAllNotic
}