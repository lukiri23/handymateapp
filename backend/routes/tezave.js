// Modul za upravljanje težav/projektov
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
// API pot za dodajanje nove težave/projekta
router.post('/dodaj', (req, res) => {
  // Pridobimo podatke o novi težavi
  const { opis, kategorija, cena, uporabnik_id } = req.body;

  // Preverimo, ali so vsi potrebni podatki podani
  if (!opis || !kategorija || !cena || !uporabnik_id) {
    return res.status(400).json({ message: 'Vsi podatki morajo biti izpolnjeni!' });
  }

  // Vstavimo novo težavo v bazo z trenutnim časom
  const query = "INSERT INTO tezave (opis, kategorija, cena, uporabnik_id, datum) VALUES ($1, $2, $3, $4, NOW())";
  db.query(query, [opis, kategorija, cena, uporabnik_id], (err, result) => {
    if (err) {
      console.error('Napaka pri dodajanju težave v bazo:', err);
      return res.status(500).json({ message: 'Napaka pri dodajanju težave' });
    }
    res.status(200).json({ message: 'Težava uspešno dodana!' });
  });
});

// API pot za pridobitev seznama vseh težav
router.get('/vse', (req, res) => {
  // Poišči vse težave v bazi
  const query = 'SELECT * FROM tezave';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Napaka pri pridobivanju težav iz baze:', err);
      return res.status(500).json({ message: 'Napaka pri pridobivanju težav' });
    }
    // Vrnemo seznam vseh težav
    res.status(200).json(results.rows);
  });
});
// API pot za pridobitev podrobnosti določene težave
router.get('/:id', (req, res) => {
  // Pridobimo ID težave iz URL parametra
  const { id } = req.params;
  
  // Poiščemo težavo z dodatnimi podatki o uporabniku (JOIN)
  const query = `
    SELECT t.*, 
           u.ime AS uporabnik_ime,
           u.priimek AS uporabnik_priimek,
           u.gsm AS uporabnik_gsm,
           u.email AS uporabnik_email
    FROM tezave t
    JOIN uporabniki u ON t.uporabnik_id = u.id
    WHERE t.id = $1`;
    
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Napaka pri iskanju težave v bazi:', err);
      return res.status(500).json({ message: 'Napaka pri pridobivanju težave' });
    }
    // Preverimo, ali smo našli težavo
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Težava ni bila najdena' });
    }
    // Vrnemo podrobnosti težave
    res.status(200).json(results.rows[0]);
  });
});

// Izvozimo router za uporabo v glavni aplikaciji
module.exports = router;
