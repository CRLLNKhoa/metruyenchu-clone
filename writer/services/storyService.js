import axios from "axios"

export const addStory = async (data) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/story/create`, data)
    return res.data
}

export const getStory = async (data) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/story/get-all-author/${data}`)
    return res.data
}

export const getStoryDetail = async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/story/get-detail/${id}`)
    return res.data
}

export const delStory = async (id) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/story/delete/${id}`)
    return res.data
}

export const editStory = async (data) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/story/update/${data.id}`,data.data)
    return res.data
}