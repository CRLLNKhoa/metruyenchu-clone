const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");
const PaymentHistory = require("../models/paymentHistory");
const EmailService = require("../services/emailService");
const Story = require("../models/storyModel");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "Tài khoản email đã tồn tại!",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      if (checkUser === null) {
        const created = await User.create({
          email,
          password: hash,
        });
        resolve({
          status: "OK",
          message: "Đăng ký thành công!",
          data: created,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Không tìm thấy tài khoản!",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "Mật khẩu sai!",
        });
      }

      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "Đăng nhập thành công!",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  console.log(data)
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "Cập nhật thành công!",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      const deleteUser = await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete User Success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = (limit = 10, page = 0, sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await User.count();
      if (sort) {
        const objSort = {};
        objSort[sort[1]] = sort[0];
        const allUserSort = await User.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objSort);
        resolve({
          status: "OK",
          message: "Lấy danh sách người dùng thành công!",
          data: allUserSort,
          totalUser: totalUser,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalUser / limit),
        });
      }
      const allUser = await User.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ name: "asc" });
      resolve({
        status: "OK",
        message: "Lấy danh sách người dùng thành công!",
        data: allUser,
        totalUser: totalUser,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      }).populate("seenStory");
      if (user === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      resolve({
        status: "OK",
        message: "Get User Success!",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const readStory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      const updateUser = await User.findByIdAndUpdate(
        id,
        { $addToSet: data }
      );
      resolve({
        status: "OK",
        message: "Cập nhật thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const favoriteStory = (id, data) => {
  const {favoriteStories} = data
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      const updateUser = await User.findByIdAndUpdate(
        id,
        { $addToSet: data },{new: true}
      );
      const addFavorite = await Story.findByIdAndUpdate(
        favoriteStories,
        {$addToSet: {liked: updateUser._id}},{new: true}
      )
      resolve({
        status: "OK",
        message: "Cập nhật thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const unfavoriteStory = (id, data) => {
  const {favoriteStories} = data
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      const updateUser = await User.findByIdAndUpdate(
        id,
        { $pull: data },{new: true}
      );
      const addFavorite = await Story.findByIdAndUpdate(
        favoriteStories,
        {$pull: {liked: updateUser._id}},{new: true}
      )
      resolve({
        status: "OK",
        message: "Cập nhật thành công!",
        data: updateUser.favoriteStories
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReadingStory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      }).populate("seenStory", "title thumbnail chapter chapter_readed");
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      const result = {
        seenStory: checkUser.seenStory,
      };
      resolve({
        status: "OK",
        message: "Thành công!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getFavoriteStories = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      }).populate("favoriteStories", "title thumbnail chapter chapter_readed");
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      const result = {
        favoriteStories: checkUser.favoriteStories,
      };
      resolve({
        status: "OK",
        message: "Thành công!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const payment = (id, data) => {
  const {pack} = data
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      let amount = 50000
      switch (pack) {
        case 2.49:
          amount = 50000 
          break;
        case 4.98:
          amount = 100000
          break;
          case 9.94:
            amount = 200000
            break;
            case 19.49:
              amount = 500000
              break;
        default:
          break;
      }
      const updateUser = await User.findByIdAndUpdate(id, {$inc: {"asset.candy.quantity": amount}}, { new: true });
      const createdHis = await PaymentHistory.create({
        userId: id,
        pack: pack,
        amount: amount
      })
      await EmailService.sendEmailPaymentComplete(pack,updateUser.email,createdHis._id,createdHis.createdAt,amount)
      resolve({
        status: "OK",
        message: "Thanh toán thành công!",
        data: updateUser.asset,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const upVip = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not define!",
        });
      }
      if (checkUser.asset.candy.quantity < 300000) {
        resolve({
          status: "ERR",
          message: "Bạn không đủ kẹo!",
        });
      }
      const updateUser = await User.findByIdAndUpdate(id, {$inc: {"asset.candy.quantity": -300000}}, { new: true });
      const change = await User.findByIdAndUpdate(id,{vip: {status: true}},{new: true})
      resolve({
        status: "OK",
        message: "Thanh toán thành công!",
        data: {
          asset: updateUser.asset,
          vip: {status: true}
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  readStory,
  getReadingStory,
  getFavoriteStories,
  favoriteStory,
  unfavoriteStory,
  payment,
  upVip
};
