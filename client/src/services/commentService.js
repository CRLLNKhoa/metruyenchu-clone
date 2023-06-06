import axios from "axios"

export const getCommentStory = async (id,limit) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comment/get/${id}?limit=${limit}`)
    return res.data
}

export const addComment = async (data) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comment/create`,data)
    return res.data
}

export const like = async (data) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/comment/like/${data.id}?userId=${data.userId}`)
    return res.data
}

export const unLike = async (data) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/comment/unlike/${data.id}?userId=${data.userId}`)
    return res.data
}

export const replay = async (data) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/comment/replay/${data.id}`,data.body)
    return res.data
}