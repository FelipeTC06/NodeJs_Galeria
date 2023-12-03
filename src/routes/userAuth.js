const express = require('express');
const userRouter = express.Router();
const createUser = require('../controllers/userController')


userRouter.post('/sign-up', createUser)

module.exports = userRouter;
