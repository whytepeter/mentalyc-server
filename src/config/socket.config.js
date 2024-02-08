const { Server } = require('socket.io');
//Socket connect

const setupSocket = (httpServer) => {
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

  return io;
};

module.exports = setupSocket;
