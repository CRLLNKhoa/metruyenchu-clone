const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    },process.env.ACCESS_TOKEN, {expiresIn: "30d"})

    return access_token
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    },process.env.REFRESH_TOKEN, {expiresIn: "365d"})

    return refresh_token
}

const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
       jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
            if(err){
                resolve({
                    stastus: "ERROR",
                    message: "The authentication"
                })
            }
            const access_token = await genneralAccessToken({
                id: user?.id,
                isAdmin: user?.isAdmin
            })
            resolve({
                status: "OK",
                message: "Get User Success!",
                access_token
              })
       })
      } catch (e) {
          reject(e);
        }
      });
}

module.exports =  {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}