const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

router.post('/registracija', (req, res) => {
  const { ime, priimek, gsm, strokovnost } = req.body;

  const query = 'INSERT INTO mojstri (ime, priimek, gsm, strokovnost) VALUES (?, ?, ?, ?)';
  db.query(query, [ime, priimek, gsm, strokovnost], (err, result) => {
    if (err) {
      console.error('Napaka pri registraciji mojstra:', err);
      return res.status(500).json({ message: 'Napaka pri registraciji mojstra' });
    }
    res.status(200).json({ message: 'Mojster uspešno registriran!' });
  });
});

router.get('/vsi', (req, res) => {
  const query = 'SELECT * FROM mojstri';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Napaka pri pridobivanju mojstrov:', err);
      return res.status(500).json({ message: 'Napaka pri pridobivanju mojstrov' });
    }
    res.status(200).json(results);
  });
});


module.exports = router;
