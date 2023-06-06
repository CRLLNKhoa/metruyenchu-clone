import axios from "axios"

export const getClientId = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/config`)
    return res.data
}

export const payment = async (data) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/payment/${data.id}`, data.data)
    return res.data
}

export const upVip = async (id) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/up-vip/${id}`)
    return res.data
}

export const getHis = async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/history/${id}`)
    return res.data
}