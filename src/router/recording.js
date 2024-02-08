const express = require('express');

const {
  handleUpload,
  processUpload,
} = require('../controllers/uploadController');
const { getRecordings } = require('../controllers/recordingController');

const recordingRoute = express.Router();

recordingRoute
  .route('/recordings')
  .get(getRecordings)
  .post(handleUpload, processUpload);

module.exports = recordingRoute;
