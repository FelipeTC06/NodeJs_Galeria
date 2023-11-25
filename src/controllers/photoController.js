class Photo {
    getPhoto(req, res) {
        console.log('test');
        res.send('All photos');
    }
}

const photoController = new Photo();
module.exports = photoController;