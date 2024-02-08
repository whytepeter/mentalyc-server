const recordingRoute = require('./recording');

const registerRoute = (app) => {
  app.use('/api', recordingRoute);
};

module.exports = { registerRoute };
