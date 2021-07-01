const express = require("express");
const router = express.Router();
const { CreateUser, LoginUser } = require("../controller/userController");

router.post(
  "/user/signup",
  CreateUser
);
router.post(
  "/user/signin",
  LoginUser
);

module.exports = router;
