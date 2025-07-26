const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();

// ✅ Allow CORS from frontend running on port 82
app.use(cors({
  origin: 'http://3.145.4.69:82',
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
