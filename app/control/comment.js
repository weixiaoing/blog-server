// // routes.js

// const express = require("express");
// const router = express.Router();

const comment = require("../models/comment");

//创建一级评论
const createComment = async (req) => {
  const props = { ...req, level: 1 };
  console.log(req);

  try {
    const data = await comment.create(props);
    return { message: "评论成功", data };
  } catch (error) {
    return { message: "评论失败", error };
  }
};

// 回复
const reply = async (req) => {
  try {
    // 创建
    const res = await comment.create(req);
    // 插入每个levelIdArray
    req.levelIdArray.forEach(async (id) => {
      await comment
        .findByIdAndUpdate(id, {
          $push: { replies: res._id },
        })
        .exec();
    });

    console.log("reply");
    console.log(req);

    // 创建后才可以联表查
    console.log(res._id);
    const data = await comment.findById(res._id).populate("parent");
    console.log("find?=", data);
    return { message: "回复成功", data };
  } catch (error) {
    console.log(error);
    return { message: "回复失败", error };
  }
};

const getCommentList = async (req) => {
  const { postId } = req;
  const result = await comment
    .find({ postId: postId, parent: null })
    .populate({
      path: "replies",
      populate: { path: "parent" },
    })
    .sort({ createdAt: -1 });
  console.log(result);
  return result;
};
module.exports = {
  createComment,
  getCommentList,
  reply,
};
