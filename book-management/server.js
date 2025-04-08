const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Middleware
app.use(express.json());

// Connect to SQLite DB
const dbPath = path.resolve(__dirname, 'db', 'books.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('Error opening DB:', err.message);
  console.log('Connected to SQLite database.');
});

// Create books table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER,
    status TEXT DEFAULT 'in'
  )
`);

// Routes
const bookRoutes = require('./routes/books')(db);
app.use('/api/books', bookRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Library Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
