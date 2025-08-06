// Modul za upravljanje mojstrov (obrtnikov)
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

// Povezava s PostgreSQL bazo
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


// API pot za pridobitev seznama vseh mojstrov
router.get('/', (req, res) => {
  // Poišči vse uporabnike s tipom računa 'mojster'
  const sql = 'SELECT ime, priimek, gsm, email, strokovnosti FROM uporabniki WHERE tip_racuna = $1';
  db.query(sql, ['mojster'], (err, result) => {
    if (err) {
      console.error('Napaka pri iskanju mojstrov v bazi:', err);
      return res.status(500).json({ error: 'Napaka pri pridobivanju mojstrov' });
    }
    // Vrnemo seznam mojstrov
    res.json(result.rows);
  });
});

// Izvozimo router za uporabo v glavni aplikaciji
module.exports = router;
