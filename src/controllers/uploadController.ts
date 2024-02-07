import { Request, Response } from 'express';
import multer from 'multer';

import { calculateRecordingLength } from '../utils';
import { db } from '../services/databaseService';
import { processingQueue } from '../services/processingService';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadController = {
  handleUpload: upload.single('audio'),
  async processUpload(req: Request, res: Response) {
    try {
      const { session_name } = req.body;
      const timestamp = new Date().toLocaleString();
      const length = req.file && calculateRecordingLength(req.file.buffer);
      const status = 'Uploading';

      await db.run(
        'INSERT INTO recordings (session_name, timestamp, length, status) VALUES (?, ?, ?, ?)',
        [session_name, timestamp, length, status]
      );

      await processingQueue.add({ session_name });

      res.status(200).json({
        success: true,
        message: '',
        data: { session_name, timestamp, length, status },
      });
    } catch (error) {
      console.error('Error processing upload:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
};
