const User = require("../schemas/user.schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Create or Register User
exports.createUser = async (req, res) => {
    try {
      const getUser = await User.findOne
      ({
       email: req.body.email
      });
      if(getUser) {
        return res.status(400).json
        ({
          statusCode: 200, 
          message:"User Exist. Please login",
          success: false, 
        });
      }
    req.body.password = await bcrypt.hash(req.body.password, +process.env.SALT);
    
    const user = await User.create( req.body);
    res?.status(200)?.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, err: error.message });
  }
};

//Get all users
exports.getUser = async (req, res) => {
  try {
    const getUser = await User.find();
    res?.status(200)?.json(
        { 
            statusCode: 200,
            data:getUser,
            success: true
        })
        ;
  } catch (error) {
    res.status(400).json({ success: false, err: err });
  }
};

//Get User by ID
exports.getUserId = async (req, res) => {
  try {
    const getUser = await User.findById(
        req.params.id
    );
    res?.status(200)?.json(
        { 
            statusCode: 200,
            data:getUser,
            success: true
        })
        ;
  } catch (error) {
    res.status(400).json({ success: false, err: err });
  }
};

//Update User by ID
exports.updateUser = async (req, res) => {
    console.log('req.body::: ', req.body);
    console.log('req.params.id::: ', req.params.id);
  try {
    const getUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res?.status(200)?.json(
        { 
            statusCode: 200,
            data:getUser,
            success: true
        })
        ;
  } catch (error) {
    res.status(400).json({ success: false, err: err });
  }
};

//Login
exports.userLogin = async (req, res) => {
  try {
    const getUser = await User.findOne
    ({
     email: req.body.email
    });
    if(!getUser) return res.status(400).json({ message:"Please Register",success: false});
   let response = await bcrypt.compare(req?.body?.password, getUser.password)
   if(!response) return res.status(400).json({ message:"Invalid Credentials",success: false});

   const token = jwt.sign({  email: getUser.email, role: getUser.role }, process.env.JWT_SECRET ,{expiresIn:process.env.JWT_EXPIRES_IN});

    res?.status(200)?.json(
        { 
            statusCode: 200,
            data:getUser,
            success: true,
            token
        })
        ;
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
};
