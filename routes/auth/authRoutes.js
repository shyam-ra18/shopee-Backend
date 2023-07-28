const express = require("express");
const {
  createUser,
  loginUser,
  checkUser,
} = require("../../controller/auth/Auth");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .get("/checkUser", checkUser);

exports.router = router;
