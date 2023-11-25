var express = require('express');
var photosRouter = express.Router();
const photoController = require('./../controllers/photoController');

photosRouter.get('/', photoController.getPhoto);




module.exports = photosRouter;
