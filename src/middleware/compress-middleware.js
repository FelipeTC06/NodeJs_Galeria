const sharp = require('sharp');

const compressPhoto = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const imagePath = `D:/galeria-fotos/${req.file.filename}`;
    const compressedImagePath = `D:/galeria-fotos/compressed/${req.file.filename}`;

    sharp(imagePath)
        .toFile(compressedImagePath, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao comprimir a imagem.' });
            }

            req.compressedImagePath = compressedImagePath;
            next();
        })
}

module.exports = compressPhoto;