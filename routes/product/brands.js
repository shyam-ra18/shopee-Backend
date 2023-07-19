const express = require("express");
const {
  fetchBrands,
  createBrands,
} = require("../../controller/product/BrandController");
const router = express.Router();

router.get("/", fetchBrands).post("/", createBrands);

exports.router = router;
