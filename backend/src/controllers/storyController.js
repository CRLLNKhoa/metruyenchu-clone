const StoryService = require("../services/storyService");

const createStory = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      originalLook,
      idUser,
      sect,
      worldScene,
      character,
    } = req.body;
    if (!title || !description || !genre || !originalLook || !idUser) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng nhập đủ thông tin yêu cầu!",
      });
    }
    const response = await StoryService.createStory(req.body);
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
    const response = await StoryService.getall(
      Number(limit) || 10,
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

const getStorySortRating = async (req, res) => {
  try {
    const { limit, page} = req.query;
    const response = await StoryService.getStorySortRating(
      Number(limit) || 8,
      Number(page) || 0,
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllAuthor = async (req, res) => {
  try {
    const { limit, page, sort } = req.query;
    const id = req.params.id;
    const response = await StoryService.getAllAuthor(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      id
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetail = async (req, res) => {
  try {
    const storyId = req.params.id;
    if (!storyId) {
      return res.status(200).json({
        status: "ERR",
        message: "Thiếu mã truyện!",
      });
    }
    const response = await StoryService.getDetail(storyId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    if (!storyId) {
      return res.status(200).json({
        status: "ERR",
        message: "Truyện không tồn tại!",
      });
    }
    const response = await StoryService.deleteStory(storyId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    const data = req.body;
    if (!storyId) {
      return res.status(200).json({
        status: "ERR",
        message: "Nhập mã truyện không tồn tại!",
      });
    }
    const response = await StoryService.updateStory(storyId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getByRank = async (req, res) => {
  try {
    const { limit, page, sort } = req.query;
    const response = await StoryService.getByRank(
      Number(limit) || 10,
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

const getByFilter = async (req, res) => {
  try {
    const filter = req.body
    if(filter.genre.length < 1){
      delete filter.genre
    }
    if(filter.progress.length < 1){
      delete filter.progress
    }
    if(filter.view.length < 1){
      delete filter.view
    }
    if(filter.worldScene.length < 1){
      delete filter.worldScene
    }
    if(filter.sect.length < 1){
      delete filter.sect
    }
    if(filter.character.length < 1){
      delete filter.character
    }
    if(filter.title.length < 1){
      delete filter.title
    }
    const { limit, page } = req.query;
    const response = await StoryService.getByFilter(
      Number(limit) || 10,
      Number(page) || 0,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createStory,
  getAll,
  getDetail,
  deleteStory,
  updateStory,
  getAllAuthor,getStorySortRating,getByRank,getByFilter
};
