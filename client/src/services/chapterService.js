import axios from "axios"

export const getChapter = async (limit=10) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chapter/get-all?limit=${limit}&sort=desc&sort=createdAt`)
    return res.data
}

export const getListChapter = async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chapter/get-chapter-of-story/${id}`)
    return res.data
}

export const getChapterDetail = async (id,no) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chapter/get/${id}?chapter=${no}`)
    return res.data
}

export const view = async (id) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/chapter/view/${id}`)
    return res.data
}

