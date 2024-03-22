const express = require("express");
const authenticateToken = require("../utils/common");
const router = express.Router();

//importing the service
const {
  createUser,
  getUser,
  updateUser,
  getUserId,
  userLogin,
} = require("../services/user.service");

//importing express router from express

router.post("/create", createUser);
router.post("/login", userLogin);
router.put("/updateById", authenticateToken, updateUser);
router.get("/get", authenticateToken, getUser);
router.get("/getById", authenticateToken, getUserId);

module.exports = router;
