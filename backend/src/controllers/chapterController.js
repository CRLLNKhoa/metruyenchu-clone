const ChapterService = require("../services/chapterService");

const createChapter = async (req, res) => {
  try {
    const { title, content, storyId, chapterNo } = req.body;
    if (!title || !content || !storyId || !chapterNo) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng nhập đủ thông tin yêu cầu!",
      });
    }
    const response = await ChapterService.createChapter(req.body);
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
    const response = await ChapterService.getAll(
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

const getAllByStory = async (req, res) => {
    try {
      const { limit, page, sort } = req.query;
      const chapterId = req.params.id;
      const response = await ChapterService.getAllByStory(
        Number(limit) || 8,
        Number(page) || 0,
        sort,
        chapterId
      );
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

const deleteChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    if (!chapterId) {
      return res.status(200).json({
        status: "ERR",
        message: "Nhập mã tập truyện!",
      });
    }
    const response = await ChapterService.deleteChapter(chapterId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "OK",
      message: "Tác giả đã có sản phẩm!",
    });
  }
};

const updateChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const data = req.body;
    if (!chapterId) {
      return res.status(200).json({
        status: "ERR",
        message: "Tập truyện không tồn tại!",
      });
    }
    const response = await ChapterService.updateChapter(chapterId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    if (!chapterId) {
      return res.status(200).json({
        status: "ERR",
        message: "Tập truyện không tồn tại!",
      });
    }
    const response = await ChapterService.getChapter(chapterId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createChapter,
  getAll,
  getAllByStory,
  deleteChapter,
  updateChapter,
  getChapter
};
