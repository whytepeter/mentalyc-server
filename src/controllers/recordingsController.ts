import { Request, Response } from 'express';
import { db } from '../services/databaseService';

export const recordingsController = {
  async getAllRecordings(req: Request, res: Response) {
    try {
      const recordings = await db.all('SELECT * FROM recordings');
      res.status(200).json({
        success: true,
        message: '',
        data: recordings,
      });
    } catch (error) {
      console.error('Error fetching recordings:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
};
