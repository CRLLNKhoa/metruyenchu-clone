import axios from "axios"

export const getChapter = async (limit=10) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chapter/get-all?limit=${limit}&sort=desc&sort=createdAt`)
    return res.data
}

