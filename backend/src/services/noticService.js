const Notic = require("../models/noticationModel")

const createNotic = (data) => {
    return new Promise(async (resolve, reject) => {
      try {     
        const created = Notic.create(data)
        resolve({
            status: "OK",
            message: "Tạo thể loại thành công!",
            data: created,
          });
      } catch (e) {
        reject(e);
      }
    });
  };

  const getall = (id,limit=3) => {
    return new Promise(async (resolve, reject) => {
      try {    
        const count = await Notic.find({
          userId: id
        }).count()
        const find = await Notic.find({
          userId: id
        }).limit(limit).sort({createdAt: -1})
        resolve({
            status: "OK",
            message: "Lấy thông báo!",
            data: find,
            count: count
          });
      } catch (e) {
        reject(e);
      }
    });
  };

  const delAllNotic = (id) => {
    return new Promise(async (resolve, reject) => {
      try {    
        const count = await Notic.find({
          userId: id
        }).updateMany({$pull: {userId: id}})
        resolve({
            status: "OK",
            message: "Xóa thành công!",
          });
      } catch (e) {
        reject(e);
      }
    });
  };
  

module.exports ={
    createNotic,getall,delAllNotic
}