import axios from "axios";

export const getUser = async (page) => {
    const  res   = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get-all?page=${page}`)
    return  res.data
};

export const getPay = async (page) => {
    const  res   = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/get?page=${page}`)
    return  res.data
};