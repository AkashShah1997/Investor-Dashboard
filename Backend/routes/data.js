const express = require("express");
const router = express.Router();
const db = require("../database");

// Middleware: ensure authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

router.get("/portfolio", ensureAuthenticated, (req, res) => {
  const { id, role } = req.session.user;

  const query = role === "admin"
    ? `SELECT p.id, u.username, p.investment_name, SUM(p.value) AS value 
       FROM portfolio p JOIN users u ON p.user_id = u.id GROUP BY u.username, p.investment_name`
    : `SELECT p.id, u.username, p.investment_name, p.value AS value
       FROM portfolio p JOIN users u ON p.user_id = u.id WHERE p.user_id = ?`;

  const params = role === "admin" ? [] : [id];

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

router.get("/portfolio/:username", ensureAuthenticated, (req, res) => {
  const { role } = req.session.user;
  const { username } = req.params;

  if (role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const query = `
    SELECT u.username, p.investment_name, SUM(p.value) AS total_value
    FROM portfolio p
    JOIN users u ON p.user_id = u.id
    WHERE u.username = ?
    GROUP BY u.username, p.investment_name
  `;

  db.all(query, [username], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});


router.get("/reports", ensureAuthenticated, (req, res) => {
  const { role } = req.session.user;
  
  if (role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }

  const query = `
    SELECT r.id, u.username, r.report_url, r.created_at 
    FROM reports r 
    JOIN users u ON r.user_id = u.id
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

router.get("/transactions", ensureAuthenticated, (req, res) => {
  const { id, role } = req.session.user;

  const query = role === "admin"
    ? `SELECT t.id, u.username, t.description, t.amount, t.date 
       FROM transactions t JOIN users u ON t.user_id = u.id`
    : `SELECT t.id, u.username, t.description, t.amount, t.date 
       FROM transactions t JOIN users u ON t.user_id = u.id WHERE t.user_id = ?`;

  const params = role === "admin" ? [] : [id];

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

module.exports = router;
