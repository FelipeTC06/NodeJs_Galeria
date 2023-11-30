const express = require('express');
const userRouter = express.Router();
const createUser = require('../controllers/authController')


userRouter.post('/sign-up', createUser)

module.exports = userRouter;
