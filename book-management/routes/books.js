const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get all books
  router.get('/', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // Search books by title or author
  router.get('/search', (req, res) => {
    const { query } = req.query;
    db.all(
      'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?',
      [`%${query}%`, `%${query}%`],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
  });

  // Add book
  router.post('/', (req, res) => {
    const { title, author, year, role } = req.body;
  
    if (role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can add books' });
    }
  
    db.run(
      'INSERT INTO books (title, author, year) VALUES (?, ?, ?)',
      [title, author, year],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, author, year, status: 'in' });
      }
    );
  });
  

  // Edit book
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, year } = req.body;
    db.run(
      'UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?',
      [title, author, year, id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Book updated' });
      }
    );
  });

  // Delete book
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Book deleted' });
    });
  });

  // Check-out
  router.put('/:id/checkout', (req, res) => {
    const { id } = req.params;
    db.run('UPDATE books SET status = ? WHERE id = ?', ['out', id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Book checked out' });
    });
  });

  // Check-in
  router.put('/:id/checkin', (req, res) => {
    const { id } = req.params;
    db.run('UPDATE books SET status = ? WHERE id = ?', ['in', id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Book checked in' });
    });
  });

  return router;
};
