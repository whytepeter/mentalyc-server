const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const uploadController = require('./controllers/uploadController');
const {
  getAllRecordings,
  addRecording,
} = require('./controllers/recordingController');

const app = express();

app.use(cors());

app.use(express.json());

const port = 8000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

app.set('io', io);

// app.post('/add', addRecording);

app.post(
  '/recordings',
  uploadController.handleUpload,
  uploadController.processUpload
);
app.get('/recordings', getAllRecordings);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
