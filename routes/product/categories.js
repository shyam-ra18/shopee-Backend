const express = require("express");
const {
  fetchCategory,
  createCategories,
} = require("../../controller/product/CategoryController");
const router = express.Router();

router.get("/", fetchCategory).post("/", createCategories);

exports.router = router;
