import axios from "axios";

export const dashboard = async () =>  {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/dashboardAdmin`)
    return res.data
}