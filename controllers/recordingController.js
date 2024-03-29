const moment = require('moment');
const { db } = require('../config/db.config');
const { formatDate } = require('../utils');

const getRecordings = async (req, res) => {
  try {
    db.all('SELECT * FROM recordings', async (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: err.message, data: null });
      }

      let recordings = rows || [];

      if (recordings.length) {
        recordings = rows.sort(
          (a, b) => formatDate(b.timestamp) - formatDate(a.timestamp)
        );
      }

      res.status(200).json({
        success: true,
        message: '',
        data: recordings,
      });
    });
  } catch (error) {
    console.error('Error processing recordings:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing recordings',
      data: null,
    });
  }
};

module.exports = {
  getRecordings,
};
