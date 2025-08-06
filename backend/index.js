const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});


app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend deluje in je povezan z bazo!' });
});


app.post('/api/login', (req, res) => {
  const { email, geslo } = req.body;

  const query = 'SELECT * FROM Uporabnik WHERE email = ? AND geslo = ?';
  db.query(query, [email, geslo], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Napaka na strežniku' });
    }
    if (results.length > 0) {
      res.json({ message: 'Prijava uspešna!', user: results[0] });
    } else {
      res.status(401).json({ message: 'Napačen email ali geslo' });
    }
  });
});


module.exports = app;
