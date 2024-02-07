import Bull from 'bull';
import { Server } from 'socket.io';
import { db } from './databaseService';
import { getRandomInt } from '../utils';

const io = new Server();

export const processingQueue = new Bull('processing');

processingQueue.process(async (job) => {
  const { session_name } = job.data;
  const processingTime = getRandomInt(60000, 180000);
  await new Promise((resolve) => setTimeout(resolve, processingTime));
  await db.run('UPDATE recordings SET status = "Done" WHERE session_name = ?', [
    session_name,
  ]);
  io.emit('statusUpdate', { session_name, status: 'Done' });
});
