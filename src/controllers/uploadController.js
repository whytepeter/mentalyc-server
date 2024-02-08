const { db } = require('../config/db.config');
const processingRecording = require('../services/processingService');
const { randomeRange, convertToMP3 } = require('../utils');
const { multerInstance } = require('../config/multer.config');

const handleUpload = multerInstance.single('audio');

const processUpload = async (req, res) => {
  try {
    const { name, length, timestamp } = req.body;

    if (!name || !length || !timestamp) {
      return res.status(400).json({
        success: false,
        message: 'Name, Lenght and Timestamp is required',
        data: null,
      });
    }

    const { filename } = req.file;
    const mp3 = await convertToMP3(filename);
    const status = 'PROCESSING';
    const recording = { name, timestamp, length, status, mp3 };

    db.run(
      'INSERT INTO recordings (name, timestamp, length, status, mp3) VALUES (?, ?, ?, ?, ?)',
      [name, timestamp, length, status, mp3],
      function (err) {
        if (err) {
          console.log('Error', err.message);
          res.status(500).json({ success: false, message: err.message });
          return;
        }

        recording.id = this.lastID;

        const io = req.app.get('io');

        processingRecording(recording, io);

        const uploadingTime = randomeRange(10000, 28000);
        setTimeout(() => {
          res.status(200).json({
            success: true,
            message: 'Recording uploaded successfully',
            data: null,
          });
        }, uploadingTime);
      }
    );
  } catch (error) {
    console.error('Error processing upload:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { handleUpload, processUpload };
