// routes.js
const express = require("express");
const router = express.Router();
const {
  createPost,
  findPost,
  deletePost,
  updatePost,
  findPostMeta,
} = require("../control/post");
// 帖子相关路由
router.post("/create", (req, res) => {
  createPost(req.body)
    .then((data) => {
      res.json({
        status: 1,
        message: "帖子发布成功",
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: 0,
        message: error,
      });
    });
});

router.post("/findPostMeta", (req, res) => {
  console.log(req.body);

  findPostMeta(req.body)
    .then((data) => {
      res.json({
        status: 1,
        message: "查询成功",
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: 0,
        message: error,
      });
    });
});

router.post("/findPost", (req, res) => {
  const props = req.body;
  console.log(props);

  findPost(props)
    .then((data) => {
      res.json({
        status: 1,
        message: "查询成功",
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: 0,
        message: error,
      });
    });
});

router.delete("/delete", (req, res) => {
  deletePost(req.body)
    .then((data) => {
      res.json({
        status: 1,
        message: "删除成功",
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: 0,
        message: "删除失败",
      });
    });
});

router.post("/update", (req, res) => {
  updatePost(req.body)
    .then((data) => {
      res.json({
        status: 1,
        message: "更新成功",
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: 0,
        message: "更新失败",
      });
    });
});

module.exports = router;
