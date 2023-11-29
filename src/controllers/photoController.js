const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

class Photo {
    getPhoto(req, res) {
        console.log('test');
        res.send('All photos');
    }

    sendPhoto(req,res) {
        const base64Image = req.file.buffer.toString('base64');

        sharp(Buffer.from(base64Image, 'base64'))
          .toBuffer()
          .then((compressedBuffer) => {
            const base64CompressedImage = compressedBuffer.toString('base64');
      
            // Salvar a imagem comprimida no disco
            const outputPath = `D:/0 - Projects/Back-End/galeria/photos-galery/${req.file.originalname}`;

            // Criar o diretório se não existir
            const outputDirectory = path.dirname(outputPath);
            if (!fs.existsSync(outputDirectory)) {
              fs.mkdirSync(outputDirectory, { recursive: true });
            }
            
            // Salvar a imagem comprimida no disco
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