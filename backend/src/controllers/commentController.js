const CommentService = require("../services/commentService");

const createComment = async (req, res) => {
  try {
    const { userId, storyId, cmt, chapterNo } = req.body;
    if (!userId  || !storyId  || !cmt  || !chapterNo) {
      return res.status(200).json({
        status: "ERR",
        massage: "Vui lòng nhập đủ thông tin yêu cầu!",
      });
    }
    const response = await CommentService.createComment(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const replayComment = async (req, res) => {
  try {
    const { userId, cmt } = req.body;
    const idCmt = req.params.id
    if (!userId || !cmt) {
      return res.status(200).json({
        status: "ERR",
        massage: "Vui lòng nhập đủ thông tin yêu cầu!",
      });
    }
    const response = await CommentService.replayComment(idCmt,req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getComment = async (req,res) =>{
  try {
    const  storyId = req.params.id;
    const {limit} = req.query
    if (!storyId) {
      return res.status(200).json({
        status: "ERR",
        massage: "Vui lòng nhập đủ thông tin yêu cầu!",
      });
    }
    const response = await CommentService.getComment(storyId,limit);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
}

const getCommentPageChapter = async (req,res) =>{
  try {
    const  storyId = req.params.id;
    const {limit,no} = req.query
    if (!storyId) {
      return res.status(200).json({
        status: "ERR",
        massage: "Vui lòng nhập đủ thông tin yêu cầu!",
      });
    }
    const response = await CommentService.getCommentPageChapter(storyId,limit,no);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
}

const like = async (req,res) =>{
  try {
    const  id = req.params.id;
    const {userId} = req.query
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        massage: "Vui lòng nhập đủ thông tin yêu cầu!",
      });
    }
    const response = await CommentService.like(id,userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
}

const unlike = async (req,res) =>{
  try {
    const  id = req.params.id;
    const {userId} = req.query
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        massage: "Vui lòng nhập đủ thông tin yêu cầu!",
      });
    }
    const response = await CommentService.unlike(id,userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
}

module.exports = {
    createComment,
    getComment,
    like,
    unlike,
    replayComment,
    getCommentPageChapter
  };