import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/sign-in`,
    data
  );
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};

export const getDetailUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/get-detail/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/log-out`
  );
  await localStorage.removeItem("access_token");
  return res.data;
};

export const getDashboard = async (id) => {
  const res = await axiosJWT.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard/${id}`
  );
  return res.data;
};
