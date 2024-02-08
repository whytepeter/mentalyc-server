const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const {
  handleUpload,
  processUpload,
} = require('./controllers/uploadController');
const { getAllRecordings } = require('./controllers/recordingController');

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

//Socket connect
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

app.set('io', io);

app
  .route('/recordings')
  .get(getAllRecordings)
  .post(handleUpload, processUpload);

const port = 8000;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
