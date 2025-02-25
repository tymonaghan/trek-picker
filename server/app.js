const express = require('express');
const path = require('path')
const db = require('./db');

const app = express();
const port = 3000;

// set up dummy db
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, rank TEXT)');
    db.run('INSERT INTO users (username, rank) VALUES (?, ?)', ['Riker', 'Commander']);
    db.run('INSERT INTO users (username, rank) VALUES (?, ?)', ['Wesley', 'Ensign']);
});

// create a router we can use
// any routes used by this router are prepended by '/api'
const router = express.Router()
app.use('/api', router)

// serve static files from build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

router.get('/example', (req, res) => {
    db.get('SELECT username, rank FROM users WHERE username = ?', ['Riker'], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});

// serve the app to any request that doesn't match the above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`)
    }
    else {
        console.log(error);
    }
});
