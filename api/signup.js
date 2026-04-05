const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Please provide both name and password!" });
  }

  if (password.length < 8 || !/[^A-Za-z0-9]/.test(password)) {
    return res.status(400).json({ error: "8 characters necessary along with at least one special character" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );
    res.status(201).json({ message: "User created!" });
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ error: "That username is already taken. Try another!" });
    } else {
      console.error("Signup error:", err.message);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
