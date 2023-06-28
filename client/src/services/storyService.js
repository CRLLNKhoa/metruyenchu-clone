import axios from "axios"

export const getStory = async (limit=10) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/story/get-all?limit=${limit}`)
    return res.data
}

export const getRank = async (limit=10,page=0,sort="createdAt") => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/story/get-rank?limit=${limit}&page=${page}&sort=${sort}`)
    return res.data
}

export const getFiter = async (limit=10,page=0,filter) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/story/get-filter?limit=${limit}&page=${page}`,filter)
    return res.data
}

export const getTopRating = async (limit=10) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/story/get-rating`)
    return res.data
}

export const getStoryDetail = async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/story/get-detail/${id}`)
    return res.data
}
