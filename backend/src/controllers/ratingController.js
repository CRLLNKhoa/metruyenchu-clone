const RatingService = require("../services/ratingService")

const createRating = async (req, res) => {
    try{
        const data = req.body
        if(!data.userId || !data.storyId || !data.cmt ){
            return res.status(200).json({
                status: "ERR",
                massage:"Vui lòng nhập đủ thông tin yêu cầu!"
            })
        }
        const response = await RatingService.createRating(data)
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
        const id = req.params.id;
        const { limit } = req.query
        const response = await RatingService.getAll(id,Number(limit) || 8)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getNewRating = async (req, res) => {
  try{
      const { limit } = req.query
      const response = await RatingService.getNewRating(Number(limit) || 3)
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

const getMyRating = async (req, res) => {
    try {
      const idStory = req.params.story;
      const idUser = req.params.user;
      if (!idStory || !idUser) {
        return res.status(200).json({
          status: "ERR",
          message: "Nhập chưa đủ thông tin!",
        });
      }
      const response = await RatingService.getMyRating(idStory,idUser);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        status: "OK",
        message: "Tác giả đã có sản phẩm!",
      });
    }
  };

const updateRating = async (req, res) => {
    try{
        const id = req.params.id
        const data = req.body
        if(!id){
            return res.status(200).json({
                status: "ERR",
                message: "Thể loại không tồn tại!"
            })
        }
        const response = await RatingService.updateRating(id, data)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports ={
    createRating,
    getAll,
    deleteGenre,
    updateRating,
    getMyRating,
    getNewRating
}