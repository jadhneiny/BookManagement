const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.post('/login', (req, res) => {
    const { email } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      res.json({ email: user.email, role: user.role });
    });
  });

  return router;
};
