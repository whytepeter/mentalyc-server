const { db } = require('../services/databaseService');

// Controller to get all recordings
const getAllRecordings = (req, res) => {
  db.all('SELECT * FROM recordings', (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: err.message, data: null });
      return;
    }
    res.status(200).json({
      success: true,
      message: '',
      data: rows,
    });
  });
};

// Controller to add a new recording
const addRecording = (req, res) => {
  const { name, timestamp, length } = req.body;
  if (!name || !timestamp || !length) {
    res
      .status(400)
      .json({ error: 'Name, timestamp, length, and status are required' });
    return;
  }
  db.run(
    'INSERT INTO recordings (name, timestamp, length, status) VALUES (?, ?, ?, ?)',
    [name, timestamp, length, 'PROCESSING'],
    function (err) {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
        return;
      }

      const data = {
        id: this.lastID,
        name: name,
        timestamp: timestamp,
        length: length,
        status: 'PROCESSING',
      };

      res.status(200).json({
        success: true,
        message: 'Recording uploaded successfully',
        data,
      });
    }
  );
};

module.exports = {
  getAllRecordings,
  addRecording,
};
