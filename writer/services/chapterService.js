import axios from "axios";

export const addChapter = async (data) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/chapter/create`,
    data
  );
  return res.data;
};

export const getListChapter = async (data) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/chapter/get-chapter-of-story/${data.id}?limit=10&page=${data.page}`
  );
  return res.data;
};

export const deleteChapter = async (id) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/chapter/delete/${id}`
  );
  return res.data;
};

export const updateChapter = async (data) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/chapter/update/${data.id}`,data.data
  );
  return res.data;
};