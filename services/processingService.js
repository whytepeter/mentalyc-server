const { db } = require('../config/db.config');
const { randomeRange } = require('../utils');

// Function to process recording with progress tracking
const processingRecording = async (recording, io) => {
  // Generate random processing time between 1 to 3 minutes (in milliseconds)
  const processingTime = randomeRange(60000, 60000);
  // const processingTime = randomeRange(60000, 180000);
  let progress = 0;
  const updateInterval = 1000;

  // Update progress at regular intervals
  const processing = setInterval(async () => {
    // Ensure progress does not exceed 100%
    if (progress >= 100) {
      clearInterval(processing);
      return;
    }

    // Calculate progress percentage
    progress += (updateInterval / processingTime) * 100;
    // Clamp progress to 100%
    progress = Math.min(progress, 100);

    // Emit progress update to clients
    await io.emit('onProcessingUpdate', { recording, progress });

    // If progress reaches 100%, update status to "DONE" in the database
    if (progress >= 100) {
      try {
        await db.run('UPDATE recordings SET status = "DONE" WHERE id = ?', [
          recording.id,
        ]);
        // Emit status update to clients
        io.emit('onStatusUpdate', { ...recording, status: 'DONE' });
        console.log('Status updated to DONE');
      } catch (err) {
        console.error('Error updating status:', err.message);
      } finally {
        clearInterval(processing);
      }
    }
  }, updateInterval);
};

module.exports = processingRecording;
