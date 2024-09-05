// // routes.js

// const express = require("express");
// const router = express.Router();

const comment = require("../models/comment");

// router.post("/comment", (req, res) => {
//   console.log(req.body);

//   try {
//     comment.create(req.body).then((data) => {
//       console.log(data);
//       res.json(data);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
const createComment = async (req) => {
  console.log(req);
  return comment
    .create(req)
    .then((data) => {
      return { message: "评论成功", data };
    })
    .catch((error) => {
      return { message: "评论失败", error };
    });
};

const replay = async (req) => {
  return comment
    .create(req)
    .then((data) => {
      return comment
        .findByIdAndUpdate(data.parentId, {
          $push: { replies: data._id },
        })
        .exec()
        .then((result) => {
          return { message: "回复成功", data };
        });
    })
    .catch((error) => {
      return { message: "回复失败", error };
    });
};

const getCommentList = async (req) => {
  const { postId } = req;
  const result = await comment
    .find({ postId: postId, parentId: null })
    .populate("replies")
    .sort({ createdAt: -1 });
  console.log(result);

  return result;
};
module.exports = {
  createComment,
  getCommentList,
  replay,
};
