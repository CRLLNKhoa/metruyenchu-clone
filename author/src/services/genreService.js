import axios from "axios"

export const getGenre = async (data) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/genre/get-all`)
    return res.data
}