const pool = require('../database/database');
const sharp = require('sharp');

class Photo {
  async getPhoto(req, res) {
    console.log('test');
    res.send('All photos');
  }

  async sendPhoto(req, res) {
    try {
      const { name, userId, details } = req.body;

      const compressedBuffer = await sharp(req.file.buffer)
        .resize({ width: 10, height: 10 })
        .toBuffer();

      const base64CompressedImage = compressedBuffer.toString('base64');

      const insertQuery = `
        INSERT INTO photos (userId, name, details, photo)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      const values = [userId, name, details, base64CompressedImage];
      const result = await pool.query(insertQuery, values);

      res.status(200).json({
        result: result.rows[0],
        message: 'Image saved successfully!'
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing or saving the image.');
    }
  }
}

const photoController = new Photo();
module.exports = photoController;
