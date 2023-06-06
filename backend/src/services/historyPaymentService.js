const PaymentHistory = require("../models/paymentHistory");



const getAll = (id,limit = 10, page = 0) => {
    return new Promise(async (resolve, reject) => {
      try {
        const total = await PaymentHistory.count()
          const his = await PaymentHistory.find({userId: id}).limit(limit).skip(page * limit)
        resolve({
          status: "OK",
          message: "Lấy thành công!",
          data: his,
          totalGenre: total,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(total / limit)
        })
      } catch (e) {
        reject(e);
      }
    });
  };
  

  module.exports ={
    getAll,
}