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
router.get('/vse', (req, res) => {
  const query = 'SELECT * FROM tezave';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Napaka pri pridobivanju težav:', err);
      return res.status(500).json({ message: 'Napaka pri pridobivanju težav' });
    }
    res.status(200).json(results);
  });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT t.*, 
           u.ime AS uporabnik_ime,
           u.gsm AS uporabnik_gsm,
           u.email AS uporabnik_email
    FROM tezave t
    JOIN uporabniki u ON t.uporabnik_id = u.id
    WHERE t.id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Napaka pri pridobivanju težave:', err);
      return res.status(500).json({ message: 'Napaka pri pridobivanju težave' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Težava ni bila najdena' });
    }
    res.status(200).json(results[0]);  
  });
});
module.exports = router;
