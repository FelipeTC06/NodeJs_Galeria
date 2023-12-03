const express = require('express');
const userRouter = express.Router();
const createUser = require('../controllers/userController')
const authUser = require('../controllers/authController')


userRouter.post('/sign-up', createUser)
userRouter.post('/sign-in', authUser)

module.exports = userRouter;
