// Uvažamo potrebne module za Express server
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Konfiguriramo CORS za produkcijo - omogočimo povezavo z različnih domen
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? /^https:\/\/.*\.vercel\.app$/ // Dovolimo vsi Vercel domeni
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json()); // Za parsing JSON zahtev


// Nastavimo PostgreSQL povezavo s poolom povezav
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Za varnost SSL povezav
  }
});


// Uvozimo poti (routes) za različne funkcionalnosti
const authRoutes = require('./routes/auth');
const mojstriRoutes = require('./routes/mojstri');
const tezaveRoutes = require('./routes/tezave');

// Registriramo poti za API
app.use('/api', authRoutes); // Avtentikacija uporabnikov
app.use('/api/mojstri', mojstriRoutes); // Upravljanje mojstrov
app.use('/api/tezave', tezaveRoutes); // Upravljanje težav/projektov

// Testna pot za preverjanje delovanja backenda
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend deluje in je povezan z bazo!' });
});

// Testna pot za preverjanje povezave z bazo
app.get('/api/test-db', (req, res) => {
  console.log('Testiram povezavo z bazo...');
  console.log('Okoljske spremenljivke:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_DATABASE: process.env.DB_DATABASE,
    NODE_ENV: process.env.NODE_ENV
  });

  // Izvršimo enostavno poizvedbo za testiranje PostgreSQL
  db.query('SELECT 1 as test', (err, results) => {
    if (err) {
      console.error('Napaka pri povezavi z bazo:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Povezava z bazo ni uspela',
        error: err.message,
        code: err.code
      });
    }
    
    console.log('Povezava z bazo uspešna:', results.rows);
    res.json({ 
      success: true, 
      message: 'PostgreSQL povezava deluje!',
      result: results.rows[0]
    });
  });
});


const PORT = process.env.PORT || 5000;

// Za lokalni razvoj - poženemo server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server se izvaja na portu ${PORT}`);
  });
}

// Izvoz za Vercel deployment
module.exports = app;
