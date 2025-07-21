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
  const { ime, priimek, gsm, email, geslo, tip_racuna } = req.body;

  const insertUporabnikQuery = `
    INSERT INTO uporabniki (ime, priimek, gsm, email, geslo, tip_racuna)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(insertUporabnikQuery, [ime, priimek, gsm, email, geslo, tip_racuna], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email je že v uporabi.' });
      }
      console.error('Napaka pri registraciji:', err);
      return res.status(500).json({ message: 'Napaka pri registraciji.' });
    }

    
    if (tip_racuna === 'mojster') {
      const insertMojsterQuery = `
        INSERT INTO mojstri (ime, priimek, gsm, strokovnost)
        VALUES (?, ?, ?, 'ni določeno')
      `;
      db.query(insertMojsterQuery, [ime, priimek, gsm], (err2) => {
        if (err2) {
          console.error('Napaka pri vnosu mojstra:', err2);
          return res.status(500).json({ message: 'Napaka pri shranjevanju mojstra.' });
        }
        return res.status(200).json({ message: 'Registracija uspešna kot mojster!' });
      });
    } else {
      return res.status(200).json({ message: 'Registracija uspešna kot uporabnik!' });
    }
  });
});

module.exports = router;
