const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'form',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});







// Register a new user
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    console.log('Received data:', name, email, password);

    db.query(
      'INSERT INTO signup (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
      (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Registration failed' });
        } else {
          res.status(201).json({ message: 'Registration successful' });
        }
      }
    );
  });
  
  // Login user
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    db.query(
      'SELECT * FROM signup WHERE email = ? AND password = ?',
      [email, password],
      (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Login failed' });
        } else if (result.length > 0) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      }
    );
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  