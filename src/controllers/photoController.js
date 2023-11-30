const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

class Photo {
    getPhoto(req, res) {
        console.log('test');
        res.send('All photos');
    }

    sendPhoto(req,res) {
        sharp(req.file.buffer)
          .resize({ width: 100, height: 100 })
          .toBuffer()
          .then((compressedBuffer) => {
            const base64CompressedImage = compressedBuffer.toString('base64');      
            const outputPath = `D:/0 - Projects/Back-End/galeria/photos-galery/${req.file.originalname}`;
            const outputDirectory = path.dirname(outputPath);

            if (!fs.existsSync(outputDirectory)) {
              fs.mkdirSync(outputDirectory, { recursive: true });
            }
            fs.writeFileSync(outputPath, base64CompressedImage);
            
            res.status(200).send(`Imagem enviada, processada e salva com sucesso em: ${outputPath}`);
            
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Erro ao processar a imagem.');
          });
    }

}

const photoController = new Photo();
module.exports = photoController;