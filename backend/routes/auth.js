// Modul za avtentikacijo uporabnikov (registracija, prijava)
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

// Nastavimo povezavo s PostgreSQL bazo
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// API pot za registracijo novega uporabnika
router.post('/register', (req, res) => {
  console.log('Poizkus registracije z podatki:', req.body);
  console.log('Okoljske spremenljivke:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_DATABASE: process.env.DB_DATABASE
  });
  
  // Pridobimo podatke iz zahteve
  const { ime, priimek, gsm, email, geslo, tip_racuna, strokovnosti } = req.body;
  const sql = 'INSERT INTO uporabniki (ime, priimek, gsm, email, geslo, tip_racuna, strokovnosti) VALUES ($1, $2, $3, $4, $5, $6, $7)';

  // Vstavimo novega uporabnika v bazo
  db.query(sql, [ime, priimek, gsm, email, geslo, tip_racuna, JSON.stringify(strokovnosti)], (err, result) => {
    if (err) {
      console.error('Napaka pri registraciji v bazo:', err);
      if (err.code === '23505') { // PostgreSQL napaka - email že obstaja
        return res.status(409).json({ message: 'Email že obstaja' });
      }
      return res.status(500).json({ message: 'Napaka pri registraciji: ' + err.message });
    }

    res.status(200).json({ message: 'Registracija uspešna' });
  });
});
// API pot za prijavo uporabnika
router.post('/login', (req, res) => {
  // Pridobimo podatke za prijavo
  const { email, geslo } = req.body;

  // Poiščemo uporabnika v bazi z določenimi podatki
  const sql = 'SELECT id, ime, priimek, tip_racuna FROM uporabniki WHERE email = $1 AND geslo = $2';
  db.query(sql, [email, geslo], (err, result) => {
    if (err) {
      console.error('Napaka pri poizvedbi za prijavo:', err);
      return res.status(500).json({ message: 'Napaka na strežniku.' });
    }

    // Preverjamo, ali smo našli uporabnika
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Napačen email ali geslo.' });
    }

    // Vrnemo podatke prijavljenega uporabnika
    const user = result.rows[0];
    res.json(user);
  });
});


// Izvozimo router za uporabo v glavnem aplikaciji
module.exports = router;
