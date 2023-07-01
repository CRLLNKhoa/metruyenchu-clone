import axios from "axios";

export const createChapter = async (data) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/chapter/create`,
    data
  );
  return res.data;
};

export const editChapter = async (req) => {
  const { id, data } = req;
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/chapter/update/${id}`,
    data
  );
  return res.data;
};

export const getChapterList = async (data) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/chapter/get-chapter-of-story/${data}`
  );
  return res.data;
};

export const getChapter = async (data) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/chapter/get-edit/${data}`
    );
    return res.data;
  };

export const deleteChapter = async (data) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/chapter/delete/${data}`
  );
  return res.data;
};
