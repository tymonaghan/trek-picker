const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// populate users
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, rank TEXT)');
  db.run('INSERT INTO users (username, rank) VALUES (?, ?)', ['Riker', 'Commander']);
  db.run('INSERT INTO users (username, rank) VALUES (?, ?)', ['Wesley', 'Ensign']);
});

// populate series
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS series (abbreviation TEXT PRIMARY KEY, title TEXT)');
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['Star Trek (Original Series)', 'TOS']);
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['The Next Generation', 'TNG']);
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['Voyager', 'VOY']);
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['Deep Space 9', 'DS9']);
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['Enterprise', 'ENT']);
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['Discovery', 'DSC']);
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['Picard', 'PIC']);
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['Strange New Worlds', 'SNW']);
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['Prodigy', 'PRO']);
  db.run('INSERT INTO series (title, abbreviation) VALUES (?, ?)', ['Lower Decks', 'LD']);
});

// populate episodes
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS episodes (id INTEGER PRIMARY KEY AUTOINCREMENT, series_abbr TEXT NOT NULL, season_number INTEGER NOT NULL, episode_number INTEGER NOT NULL, title TEXT NOT NULL, FOREIGN KEY (series_abbr) REFERENCES series(abbreviation))');
  db.run('INSERT INTO episodes (series_abbr, season_number, episode_number, title) VALUES (?, ?, ?, ?)', ['TOS', 1, 2, 'Charlie X']);
  db.run('INSERT INTO episodes (series_abbr, season_number, episode_number, title) VALUES (?, ?, ?, ?)', ['TOS', 3, 24, 'Turnabout Intruder']);
  db.run('INSERT INTO episodes (series_abbr, season_number, episode_number, title) VALUES (?, ?, ?, ?)', ['TOS', 1, 1, 'Encounter at Farpoint']);
  db.run('INSERT INTO episodes (series_abbr, season_number, episode_number, title) VALUES (?, ?, ?, ?)', ['TNG', 5, 25, 'The Inner Light']);
  db.run('INSERT INTO episodes (series_abbr, season_number, episode_number, title) VALUES (?, ?, ?, ?)', ['PRO', 1, 1, 'Lost & Found, Pt 1']);
  db.run('INSERT INTO episodes (series_abbr, season_number, episode_number, title) VALUES (?, ?, ?, ?)', ['PRO', 1, 2, 'Lost & Found, Pt 2']);
  db.run('INSERT INTO episodes (series_abbr, season_number, episode_number, title) VALUES (?, ?, ?, ?)', ['PRO', 1, 8, 'Time Amok']);
});



module.exports = db;
