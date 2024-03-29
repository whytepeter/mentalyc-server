const express = require('express');
const path = require('path');
const cors = require('cors');
const { createServer } = require('http');
const setupSocket = require('./config/socket.config');
const { registerRoute } = require('./router');

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

//Set up socket io
app.set('io', setupSocket(httpServer));

app.use(
  '/uploads/audios',
  express.static(path.join(__dirname, 'uploads', 'audios'))
);

//Register route
registerRoute(app);

const port = 8000;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
