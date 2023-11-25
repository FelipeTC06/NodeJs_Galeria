class Photo {
    getPhoto(req, res) {
        console.log('test');
        res.send('All photos');
    }

    sendPhoto(req,res) {
        res.json({ message: 'Imagem salva com sucesso!' });
    }

}

const photoController = new Photo();
module.exports = photoController;