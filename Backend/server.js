const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'investor_secret',
  resave: false,
  saveUninitialized: false
}));

app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
