
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});
db.connect(err => {
  if (err) {
    console.error('Povezava z bazo ni uspela:', err);
  } else {
    console.log('Povezano z MySQL bazo!');
  }
});
app.get('/', (req, res) => {
  res.send('Strežnik deluje!');
});
app.listen(3001, () => {
  console.log('Strežnik teče na http://localhost:3001');
});

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const tezaveRoutes = require('./routes/tezave');
app.use('/api/tezave', tezaveRoutes);

const mojstriRoutes = require('./routes/mojstri');
app.use('/api/mojstri', mojstriRoutes);





