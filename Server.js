const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // This allows your React app to talk to this server

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_NbPOcre7yhk8@ep-small-cherry-anuyn0q7-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: true
});

// SIGNUP ROUTE
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  
  // 1. Basic check for empty fields
  if (!username || !password) {
    return res.status(400).json({ error: "Please provide both name and password!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );
    
    console.log(`Success! Created user with ID: ${result.rows[0].id}`);
    res.status(201).json({ message: "User created!" });

  } catch (err) {
    // Log the EXACT error to your terminal so you can see it
    console.error("Database Error:", err.code, err.message);

    if (err.code === '23505') { // 23505 is the specific Postgres code for "Unique Violation"
      res.status(400).json({ error: "That username is already taken. Try another!" });
    } else {
      res.status(500).json({ error: "Internal server error. Check your terminal!" });
    }
  }
});

// LOGIN ROUTE
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

  if (result.rows.length > 0) {
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (isMatch) {
      res.json({ message: "Success", user: user.username });
    } else {
      res.status(401).json({ error: "Incorrect password" });
    }
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));