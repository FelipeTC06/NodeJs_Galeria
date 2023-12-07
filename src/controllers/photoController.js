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
            
            res.status(200).send(`Image sent, processed and saved successfully in: ${outputPath}`);
            
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error processing the image.');
          });
    }

}

const photoController = new Photo();
module.exports = photoController;