

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


router.post('/register', (req, res) => {
  const { ime, priimek, gsm } = req.body;

  const query = 'INSERT INTO uporabniki (ime, priimek, gsm) VALUES (?, ?, ?)';
  db.query(query, [ime, priimek, gsm], (err, result) => {
    if (err) {
      console.error('Napaka pri registraciji:', err);
      return res.status(500).json({ message: 'Napaka pri registraciji' });
    }
    res.status(200).json({ message: 'Uporabnik uspešno registriran!' });
  });
});

module.exports = router;



