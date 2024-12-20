const express = require("express");
const { createSummary, findSummary } = require("../control/summary");
const friends = require("../models/friends");
const router = express.Router();
router.post("/create", async (req, res) => {
  const mongoResult = await friends.create(req.body);
  createSummary(req.body)
    .then((data) => {
      res.json({
        code: 1,
        message: "success",
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

module.exports = router;
