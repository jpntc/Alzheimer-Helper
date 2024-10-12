// server.js
const express = require("express");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

// Connect to the SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
        // Create a sample table
        db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)`);
    }
});

// Seed some data
db.serialize(() => {
    const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    stmt.run("John Doe", "john@example.com");
    stmt.run("Jane Smith", "jane@example.com");
    stmt.finalize();
});

// GET route to retrieve all users
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// GET route to retrieve a user by ID
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
