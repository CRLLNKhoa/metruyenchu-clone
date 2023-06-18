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

export const updateUser = async (data) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/user/update-user/${data.id}`,
    data.data
  );
  return res.data;
};

export const getReading = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/get-seen/${id}`
  );
  return res.data;
};

export const getFavorite = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/get-favorite/${id}`
  );
  return res.data;
};

export const read = async (data) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/user/read/${data.id}`,
    data.data
  );
  return res.data;
};

export const favorite = async (id, data) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/user/favorite/${id}`,
    data
  );
  return res.data;
};

export const unfavorite = async (id, data) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/user/unfavorite/${id}`,
    data
  );
  return res.data;
};

export const getNotic = async (id,limit) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/notic/get-all/${id}?limit=${limit}`
  );
  return res.data;
};

export const delNotic = async (id) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/notic/del/${id}`
  );
  return res.data;
};
