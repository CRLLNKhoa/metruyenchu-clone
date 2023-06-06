const GenreService = require("../services/genreService")

const createGenre = async (req, res) => {
    try{
        const { title } = req.body
        if(!title ){
            return res.status(200).json({
                status: "ERR",
                massage:"Vui lòng nhập đủ thông tin yêu cầu!"
            })
        }
        const response = await GenreService.createGenre(title)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAll = async (req, res) => {
    try{
        const { limit, page,sort } = req.query
        const response = await GenreService.getAll(Number(limit) || 8 , Number(page) || 0, sort)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteGenre = async (req, res) => {
    try {
      const genreId = req.params.id;
      if (!genreId) {
        return res.status(200).json({
          status: "ERR",
          message: "Nhập mã thể loại!",
        });
      }
      const response = await GenreService.deleteGenre(genreId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        status: "OK",
        message: "Tác giả đã có sản phẩm!",
      });
    }
  };

const updateGenre = async (req, res) => {
    try{
        const genreId = req.params.id
        const data = req.body
        if(!genreId){
            return res.status(200).json({
                status: "ERR",
                message: "Thể loại không tồn tại!"
            })
        }
        const response = await GenreService.updateGenre(genreId, data)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports ={
    createGenre,
    getAll,
    deleteGenre,
    updateGenre
}