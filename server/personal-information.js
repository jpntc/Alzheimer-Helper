// Required packages: SQLite3

const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// Database Setup
const db = new sqlite3.Database('./alzheimer-helper.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create Personal Information Table
const createTableQuery = `
CREATE TABLE IF NOT EXISTS PersonalInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  age INTEGER,
  email TEXT,
  phoneNumber TEXT,
  averageGameScore REAL DEFAULT 0
);
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating PersonalInfo table:', err.message);
  }
});

// Create QuizResults Table
const createQuizResultsTableQuery = `
CREATE TABLE IF NOT EXISTS QuizResults (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  quizId INTEGER,
  score INTEGER,
  FOREIGN KEY (userId) REFERENCES PersonalInfo(id)
);
`;

db.run(createQuizResultsTableQuery, (err) => {
  if (err) {
    console.error('Error creating QuizResults table:', err.message);
  }
});

// Create GameScores Table
const createGameScoresTableQuery = `
CREATE TABLE IF NOT EXISTS GameScores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  score INTEGER,
  date TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES PersonalInfo(id)
);
`;

db.run(createGameScoresTableQuery, (err) => {
  if (err) {
    console.error('Error creating GameScores table:', err.message);
  }
});

// Function to Update Game Score and Calculate New Average
function updateGameScore(userId, newScore) {
  db.run(
    `INSERT INTO GameScores (userId, score) VALUES (?, ?)`,
    [userId, newScore],
    function (err) {
      if (err) {
        return console.error('Error inserting game score:', err.message);
      }

      // Calculate new average score
      db.get(
        `SELECT AVG(score) AS averageScore FROM GameScores WHERE userId = ?`,
        [userId],
        (err, row) => {
          if (err) {
            return console.error('Error calculating average score:', err.message);
          }

          const averageScore = row.averageScore;
          db.run(
            `UPDATE PersonalInfo SET averageGameScore = ? WHERE id = ?`,
            [averageScore, userId],
            (err) => {
              if (err) {
                return console.error('Error updating average game score:', err.message);
              }
              console.log('Updated average game score successfully.');
            }
          );
        }
      );
    }
  );
}

module.exports = {
  db,
  updateGameScore,
};