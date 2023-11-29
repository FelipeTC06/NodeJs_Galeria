const express = require('express');
const photosRouter = express.Router();
const photoController = require('./../controllers/photoController');
const uploadMemory = require('./../middleware/saveMemory-middleware');

photosRouter.post('/upload', uploadMemory.uploadMemory.single('file'), photoController.sendPhoto);

photosRouter.get('/', photoController.getPhoto);


module.exports = photosRouter;
