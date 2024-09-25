const post = require("../models/post");

const createPost = async (req) => {
  console.log("createPost", req);
  return post.create(req).then((data) => {
    return { message: "创建成功", data };
  });
};

// 查元数据
const findPostMeta = async (req) => {
  console.log("findPost", req);

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
      console.log(data);
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
      console.log(data);
      return data;
    });
};

const deletePost = async (req) => {
  console.log(req);
  return post.deleteOne(req).then((data) => {
    return data;
  });
};

const updatePost = async (req) => {
  console.log(req);

  return post
    .findByIdAndUpdate(req._id, {
      $set: { ...req.config },
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
};
