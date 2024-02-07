import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export let db: sqlite3.Database;

(async () => {
  try {
    db = await open({
      filename: path.join(__dirname, '../../recordings.db'),
      driver: sqlite3.Database,
    });
    await db.exec(`
      CREATE TABLE IF NOT EXISTS recordings (
        id INTEGER PRIMARY KEY,
        session_name TEXT,
        timestamp TEXT,
        length TEXT,
        status TEXT
      );
    `);
  } catch (error) {
    console.error('Error connecting to SQLite database:', error);
  }
})();
