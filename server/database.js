const sqlite3 = require('sqlite3').verbose();

// Creates the database
const initializeDatabase = () => {
    const db = new sqlite3.Database('restrictedData.db', (err) => {
        if (err) {
            console.error('Could not connect to database:', err.message);
        }
    });
    db.run(`CREATE TABLE IF NOT EXISTS restrictedData (id TEXT PRIMARY KEY, name TEXT, photo BLOB)`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        }
    });

    return db;
};


// Function to add names to the database
const addName = (db, id, name) => {
  db.get(`SELECT * FROM restrictedData WHERE id = ?`, [id], (err, row) => {
    checkErr(db, id, err, row);
    const stmt = db.prepare(`INSERT INTO restrictedData (id, name) VALUES (?, ?)`);
    stmt.run(id, name, function(err) {
      if (err) {
        console.error('Error inserting data:', err.message);
      }
    });

    stmt.finalize();
    });
};


// Function to add photos to db
const addPhoto = (db, id, photo) => {
  db.get(`SELECT * FROM restrictedData WHERE id = ?`, [id], (err, row) => {
    checkErr(db, id, err, row);
    // Insert the record into the database
    const stmt = db.prepare(`INSERT INTO restrictedData (id, photo) VALUES (?, ?)`);
    stmt.run(id, photo, function(err) {
        if (err) {
            return res.status(500).send('Error inserting data: ' + err.message);
        }
        res.send('Photo uploaded successfully!');
    });
    stmt.finalize();
    });

}

// Function to add journals to db
const addJournal = (db, id, journal) => {
  db.get(`SELECT * FROM restrictedData WHERE id = ?`, [id], (err, row) => {
    // checkErr(db, id, err, row);
    // Insert the record into the database
    const stmt = db.prepare(`INSERT INTO restrictedData (id, journal) VALUES (?, ?)`);
    stmt.run(id, journal, function(err) {
        if (err) {
            return res.status(500).send('Error inserting data: ' + err.message);
        }
        res.send('Journal uploaded successfully!');
    });
    stmt.finalize();
    });

}

// Reused func
function checkErr(db, id, err, row) {
  if (err) {
    console.error('Error checking ID:', err.message);
    return;
  }

  if (row) {
    console.log(`Data with ID ${id} already exists. Data will not be added.`);
    return; // ID exists, do not add data
  }
}


// Function to retrieve all records from the database
const getAllRecords = (db, callback) => {
    db.all(`SELECT * FROM restrictedData`, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving data:', err.message);
            return;
        }
        callback(rows);
    });
};

// Export functions for use in other modules
module.exports = {
    initializeDatabase,
    addName,
    addPhoto,
    getAllRecords
};
