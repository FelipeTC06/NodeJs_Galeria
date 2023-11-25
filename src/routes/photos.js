const express = require('express');
const photosRouter = express.Router();
const photoController = require('./../controllers/photoController');
const saveDisk = require('./../middleware/saveDisk-middleware');
const compressPhoto = require('./../middleware/compress-middleware');

photosRouter.post('/upload',
    saveDisk,
    compressPhoto,
    photoController.sendPhoto
);

photosRouter.get('/', photoController.getPhoto);


module.exports = photosRouter;
