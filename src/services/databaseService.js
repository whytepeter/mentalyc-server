const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '../recordings.db');

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to database');
    // Create the recordings table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS recordings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      length TEXT NOT NULL,
      status TEXT NOT NULL
    );`,
      (err) => {
        if (err) {
          console.error('Error creating recordings table:', err.message);
        } else {
          console.log('Recordings table created or already exists');
        }
      }
    );
  }
});

module.exports = { db };
