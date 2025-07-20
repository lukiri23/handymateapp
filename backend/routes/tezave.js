

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


router.post('/dodaj', (req, res) => {
  const { opis, kategorija, cena } = req.body;

  const query = 'INSERT INTO tezave (opis, kategorija, cena) VALUES (?, ?, ?)';
  db.query(query, [opis, kategorija, cena], (err, result) => {
    if (err) {
      console.error('Napaka pri dodajanju težave:', err);
      return res.status(500).json({ message: 'Napaka pri dodajanju težave' });
    }
    res.status(200).json({ message: 'Težava uspešno dodana!' });
  });
});

module.exports = router;
