const { db } = require('../config/db.config');
const { randomeRange } = require('../utils');

const processingRecording = (recording, io) => {
  const processingTime = randomeRange(60000, 180000);
  console.log('PROCESSING TIME', processingTime);

  setTimeout(async () => {
    await db.run(
      'UPDATE recordings SET status = "DONE" WHERE id = ?',
      [recording.id],
      (err) => {
        if (err) {
          console.log('Error updating status', err.message);
          return;
        }

        io.emit('onStatusUpdate', { ...recording, status: 'DONE' });
        console.log('Status update');
      }
    );
  }, processingTime);
};

module.exports = processingRecording;
