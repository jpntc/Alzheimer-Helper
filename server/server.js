// server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();
const database = require('./database');
const storage = multer.memoryStorage();
const upload = multer({ storage });


const app = express();
const PORT = process.env.PORT || 3000;
const db = database.initializeDatabase();

app.use(cors());
app.use(bodyParser.json());


// Set name to id
app.get('/send/:id/:name', (req, res) => {
  // if(!req.params.id || !req.parans.name){
  //   return;
  // }
  database.addName(db, req.params.id, req.params.name);
});

// Retrieve and display all records
app.get('/retrieve', (req, res) => {
  database.getAllRecords(db, (restrictedData) => {
    console.log('All Records:', restrictedData);
    return;
  });
});


// Route to store text in the database
app.post('/store-text/:id', (req, res) => {
    const { text } = req.body; // Expecting { text: "Your text here" }

    if (!text) {
        return res.status(400).send('Text is required.');
    }
    addJournal(db, req.params.id, text)
});

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Catch-all route for non-existent routes
app.use((req, res) => {
    res.status(404).send('Forbidden.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// app.post('/upload', upload.single('photo'), (req, res) => {
//     const { id, name } = req.body;
//     const photoPath = path.join(__dirname, 'path/to/your/photo.jpg'); // Adjust the path
//     const photo = req.file.buffer; // Get the uploaded file as a buffer
//     // Read the photo file
//     fs.readFile(photoPath, (err, photoBuffer) => {
//        if (err) {
//            return res.status(500).send('Error reading file: ' + err.message);
//        }
//
//        // Insert the record into the database
//        const stmt = db.prepare(`INSERT INTO records (id, name, photo) VALUES (?, ?, ?)`);
//        stmt.run(id, name, photoBuffer, function(err) {
//            if (err) {
//                return res.status(500).send('Error inserting data: ' + err.message);
//            }
//            res.send('Photo uploaded successfully from file!');
//        });
//        stmt.finalize();
//    });
//     database.addPhoto(db, id, photo);
// });
