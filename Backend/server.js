// server.js
const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/portfolio', (req, res) => {
  db.all('SELECT * FROM portfolio', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.get('/transactions', (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY date DESC LIMIT 10', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.get('/reports', (req, res) => {
  db.all('SELECT * FROM reports', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
