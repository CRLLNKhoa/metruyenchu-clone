const Author = require("../models/authorModel");
const Story = require("../models/storyModel")

const createAuthor = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
        const checkAuthor = await Author.findOne({
            name: name
        })
        if(checkAuthor !== null){
            resolve({
                status: "ERR",
                message: "Tác giả đã tồn tại!"
            })
        }      
        if(checkAuthor === null){
          const created = await Author.create({
            name,
          });
          resolve({
            status: "OK",
            message: "Thêm tác giả thành công!",
            data: created,
          });
        }
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (limit = 10, page = 0,sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await Author.count()
      if(sort){
        const objSort = {}
        objSort[sort[1]] =sort[0]
        const allUserSort = await Author.find().limit(limit).skip(page * limit).sort(objSort)
        resolve({
          status: "OK",
          message: "Lấy danh sách người dùng thành công!",
          data: allUserSort,
          totalAuthor: totalUser,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalUser / limit)
        })
      }
        const allUser = await Author.find().limit(limit).skip(page * limit).sort({name: "asc"})
      resolve({
        status: "OK",
        message: "Lấy danh sách người dùng thành công!",
        data: allUser,
        totalAuthor: totalUser,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit)
      })
    } catch (e) {
      reject(e);
    }
  });
};

const deleteAuthor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
        const checkUser = await Author.findOne({
          _id: id
        })
        if(checkUser === null){
            resolve({
                status: "OK",
                message: "Tác giả không tồn tại!"
            })
        }
        const checkStory = await Story.find({
          author: id
        })
        console.log(checkStory)
        if(checkStory.length < 1){
          await Author.findByIdAndDelete(id)
          resolve({
            status: "OK",
            message: "Xóa tác giả thành công!"
          })
        }
        resolve({
          status: "ERR",
          message: "Xóa không thành công (đã có truyện)!"
        })
    } catch (e) {
      reject(e);
    }
  });
};
const updateAuthor = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
        const checkUser = await Author.findOne({
          _id: id
        })
        if(checkUser === null){
            resolve({
                status: "OK",
                message: "Tác giả không tồn tại!"
            })
        }
        const updateUser = await Author.findByIdAndUpdate(id, data, {new: true})
      resolve({
        status: "OK",
        message: "Cập nhật thành công!",
        data: updateUser
      })
    } catch (e) {
      reject(e);
    }
  });
};

module.exports ={
    createAuthor,getAll,deleteAuthor,updateAuthor
}