const express = require("express");
const { createUser, loginUser } = require("../../controller/auth/Auth");

const router = express.Router();

router.post("/signup", createUser).post("/login", loginUser);

exports.router = router;
