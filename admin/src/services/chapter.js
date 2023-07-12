import axios from "axios";

export const getChapter = async (page) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chapter/get-all?page=${page}`)
    return res.data
}