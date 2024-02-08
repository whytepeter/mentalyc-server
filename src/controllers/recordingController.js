const { db } = require('../services/databaseService');

// Controller to get all recordings
const getAllRecordings = (req, res) => {
  db.all('SELECT * FROM recordings', (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: null });
    }

    const recorgins = rows.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    res.status(200).json({
      success: true,
      message: '',
      data: recorgins,
    });
  });
};

module.exports = {
  getAllRecordings,
};
