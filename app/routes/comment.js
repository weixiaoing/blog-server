// routes.js

const express = require("express");
const router = express.Router();
// const { createPost, getPostWithComments, addComment, addReply } = require('./controllers');

const comment = require("../models/comment");
// 帖子相关路由
router.post("/comment", (req, res) => {
  console.log(req.body);

  try {
    comment.create(req.body).then((data) => {
      console.log(data);
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/replay", (req, res) => {
  console.log(req.body);

  try {
    comment.create(req.body).then((data) => {
      console.log(data);
      comment
        .findByIdAndUpdate(data.parentId, {
          $push: { replies: data._id },
        })
        .exec()
        .then((data) => {
          console.log(data);
        });
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/commentList", async (req, res) => {
  console.log(req.body);
  const { postId } = req.body;

  const result = await comment
    .find({ postId, parentId: { $ne: null } })
    .populate("replies");

  console.log(result);
  res.json(result);
});

module.exports = router;
