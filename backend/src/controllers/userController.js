const UserService = require("../services/userService")
const JwtService = require("../services/JwtService")

const createUser = async (req, res) => {
    try{
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email || !password ){
            return res.status(200).json({
                status: "ERR",
                message:"Vui lòng nhập đủ thông tin yêu cầu!"
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status: "ERR",
                message:"Sai định dạng email"
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email || !password){
            return res.status(200).json({
                status: "ERR",
                message:"Vui lòng nhập đầy đủ thông tin"
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status: "ERR",
                message:"Tài khoản không tồn tại!"
            })
        }
        const response = await UserService.loginUser(req.body)
        const {refresh_token, ...newRespone} = response
        res.cookie("refresh_token",refresh_token,{
            httpOnly: true,
            secure: false,
            samesite: "strict"
        })
        return res.status(200).json(newRespone)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "Người dùng không tồn tại!"
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "The UserId is required"
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try{
        const { limit, page,sort } = req.query
        const response = await UserService.getAllUser(Number(limit) || 8 , Number(page) || 0, sort)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailUser = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "Thiếu mã người dùng!"
            })
        }
        const response = await UserService.getDetailUser(userId)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try{
        const token = req.cookies.refresh_token
        if(!token){
            return res.status(200).json({
                status: "ERR",
                message: "The Token is required"
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req, res) => {
    try{
        res.clearCookie("refresh_token")
        return res.status(200).json({
            status: "OK",
            message: "Đăng xuất thành công!"
        })
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const readStory = async (req, res) => {
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "Người dùng không tồn tại!"
            })
        }
        const response = await UserService.readStory(userId, data)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const favoriteStory = async (req, res) => {
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "Người dùng không tồn tại!"
            })
        }
        const response = await UserService.favoriteStory(userId, data)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const unfavoriteStory = async (req, res) => {
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "Người dùng không tồn tại!"
            })
        }
        const response = await UserService.unfavoriteStory(userId, data)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getReadingStory = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "Người dùng không tồn tại!"
            })
        }
        const response = await UserService.getReadingStory(userId)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getFavoriteStories = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "Người dùng không tồn tại!"
            })
        }
        const response = await UserService.getFavoriteStories(userId)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const payment = async (req, res) => {
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "Người dùng không tồn tại!"
            })
        }
        const response = await UserService.payment(userId, data)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const upVip = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "Người dùng không tồn tại!"
            })
        }
        const response = await UserService.upVip(userId)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    refreshToken,
    logoutUser,
    readStory,
    getReadingStory,
    getFavoriteStories,
    favoriteStory,
    unfavoriteStory,
    payment,
    upVip
}