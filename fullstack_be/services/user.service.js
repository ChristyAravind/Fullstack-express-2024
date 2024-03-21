const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Create or Register User
exports.createUser = async (req, res) => {
  try {
    const getUser = await User.findOne({
      email: req.body.email,
    });
    if (getUser) {
      return res.status(200).json({
        statusCode: 410,
        message: "User Exist. Please login",
        success: false,
      });
    }
    req.body.password = await bcrypt.hash(req.body.password, +process.env.SALT);
    req.body.role = "user";

    const user = await User.create(req.body);
    const token = jwt.sign(
      { email: user.email, role: user.role, user_id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res?.status(200)?.json({
      statusCode: 200,
      message: "User Register Successfully",
      success: true,
      data: { user, token },
    });
  } catch (error) {
    res.status(400).json({ success: false, err: error.message });
  }
};

//Get all users
exports.getUser = async (req, res) => {
  try {
    const getUser = await User.find();
    res?.status(200)?.json({
      statusCode: 200,
      data: getUser,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, err: err });
  }
};

//Get User by ID
exports.getUserId = async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    console.log("user::: ", getUser);
    res?.status(200)?.json({
      statusCode: 200,
      data: getUser,
      success: true,
      message: "User data fetched",
    });
  } catch (error) {
    console.log("error::: ", error);
    res.status(400).json({ success: false, err: error });
  }
};

//Update User by ID
exports.updateUser = async (req, res) => {
  console.log("req.body::: ", req.body);
  console.log("req.params.id::: ", req.params.id);
  try {
    const getUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res?.status(200)?.json({
      statusCode: 200,
      data: getUser,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, err: err });
  }
};

//Login
exports.userLogin = async (req, res) => {
  try {
    const getUser = await User.findOne({
      email: req.body.email,
    });
    console.log("getUser::: ", getUser._id);
    if (!getUser)
      return res
        .status(400)
        .json({ message: "Please Register", success: false });
    let response = await bcrypt.compare(req?.body?.password, getUser.password);
    if (!response)
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });

    const token = jwt.sign(
      { email: getUser.email, role: getUser.role, user_id: getUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res?.status(200)?.json({
      statusCode: 200,
      data: { getUser, token },
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
};
