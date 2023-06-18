import axios from "axios";

export const addRating = async (data) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rating/add`,data)
    return res.data
}

export const getRating = async (id,limit) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rating/get-all/${id}?limit=${limit}`)
    return res.data
}

export const getNewRating = async (limit=10) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rating/get-new?limit=${limit}`)
    return res.data
}

export const getMyRating = async (story,user) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rating/get/${story}/${user}`)
    return res.data
}

export const updateRating = async (data) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/rating/update/${data.id}`,data.data)
    return res.data
}