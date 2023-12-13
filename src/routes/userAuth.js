const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authUser = require('../controllers/authController');


userRouter.post('/sign-up', userController.createUser);
userRouter.delete('/delete', userController.deleteUser);
userRouter.post('/sign-in', authUser);

module.exports = userRouter;
