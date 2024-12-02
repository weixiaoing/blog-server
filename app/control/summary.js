const summary = require("../models/summary");

const createSummary = async (req) => {
  return summary.create(req).then((data) => {
    return data;
  });
};

const findSummary = async (req) => {
  return summary.find(req).then((data) => {
    return data;
  });
};

module.exports = {
  createSummary,
  findSummary,
};
