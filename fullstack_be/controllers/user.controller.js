const express = require('express');

//importing the service
const {createUser,getUser,updateUser,getUserId,userLogin} = require('../services/user.service');

//importing express router from express
const router = express.Router();

router.route('/create').post(createUser);
router.route('/update/:id').put(updateUser);
router.route('/get').get(getUser);
router.route('/get/:id').get(getUserId);
router.route('/login').post(userLogin);

module.exports =router