const multer = require('multer');
const { db } = require('../services/databaseService');
const processingRecording = require('../services/processingService');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleUpload = upload.single('audio');

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

    const status = 'PROCESSING';
    const recording = { name, timestamp, length, status };

    db.run(
      'INSERT INTO recordings (name, timestamp, length, status) VALUES (?, ?, ?, ?)',
      [name, timestamp, length, status],
      function (err) {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
          return;
        }

        recording.id = this.lastID;

        const io = req.app.get('io');

        processingRecording(recording, io);

        res.status(200).json({
          success: true,
          message: 'Recording uploaded successfully',
          data: recording,
        });
      }
    );
  } catch (error) {
    console.error('Error processing upload:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { handleUpload, processUpload };
