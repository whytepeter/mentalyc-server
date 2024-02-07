import express from 'express';
import { uploadController } from './controllers/uploadController';
import { recordingsController } from './controllers/recordingsController';

const app = express();
const port = 5000;

app.post(
  '/upload',
  uploadController.handleUpload,
  uploadController.processUpload
);
app.get('/recordings', recordingsController.getAllRecordings);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
