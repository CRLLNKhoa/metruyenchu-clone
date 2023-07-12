import axios from "axios";

export const getStory  = async (page) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/story/get-all-admin?page=${page}`)
    return res.data
}

export const editStory  = async (data) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/story/update/${data.id}`,data.data)
    return res.data
}