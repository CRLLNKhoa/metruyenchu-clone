const AuthorService = require("../services/authorService");

const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERR",
        massage: "Vui lòng nhập đủ thông tin yêu cầu!",
      });
    }
    const response = await AuthorService.createAuthor(name);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { limit, page, sort } = req.query;
    const response = await AuthorService.getAll(
      Number(limit) || 8,
      Number(page) || 0,
      sort
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    if (!authorId) {
      return res.status(200).json({
        status: "ERR",
        message: "Nhập mã tác giả",
      });
    }
    const response = await AuthorService.deleteAuthor(authorId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "OK",
      message: "Tác giả đã có sản phẩm!",
    });
  }
};

const updateAuthor = async (req, res) => {
    try{
        const authorId = req.params.id
        const data = req.body
        if(!authorId){
            return res.status(200).json({
                status: "ERR",
                message: "Tác giả không tồn tại!"
            })
        }
        const response = await AuthorService.updateAuthor(authorId, data)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
  createAuthor,
  getAll,
  deleteAuthor,
  updateAuthor
};
