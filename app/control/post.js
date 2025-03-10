const post = require("../models/post");

const createPost = async (req) => {
  return post.create(req).then((data) => {
    return { message: "创建成功", data };
  });
};

// 查元数据
const findPostMeta = async (req) => {
  if (req?.tags?.length > 0) {
    req.tags = { $in: req.tags };
  }
  return post
    .find(
      {
        ...req,
      },
      "-content"
    )
    .sort({ date: -1 })
    .then((data) => {
      return data;
    });
};

const findPost = async (req) => {
  return post
    .find({
      ...req,
    })
    .sort({ date: -1 })
    .then((data) => {
      return data;
    });
};

const deletePost = async (req) => {
  return post.findByIdAndDelete(req).then((data) => {
    return data;
  });
};

const findWithPage = async (req) => {
  const { skip, limit, body } = req;

  return post.find(body).sort({ date: -1 }).skip(skip).limit(limit);
};

const updatePost = async (req) => {
  return post
    .findByIdAndUpdate(req._id, {
      $set: { ...req.config, updatedAt: new Date() },
    })
    .then((data) => {
      return data;
    });
};

module.exports = {
  createPost,
  findPost,
  deletePost,
  updatePost,
  findPostMeta,
  findWithPage,
};
