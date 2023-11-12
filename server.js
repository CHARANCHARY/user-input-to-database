const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to SQLite database
const db = new sqlite3.Database("users.db");

// Create a table for users
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, email TEXT , dob DATE)"
  );
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post("/api/users", async (req, res) => {
  try {
    const { name, age, email, dob } = req.body;

    // Insert user into the users table
    db.run(
      "INSERT INTO users (name, age, email, dob) VALUES (?, ?, ? , ?)",
      [name, age, email, dob],
      function (err) {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.status(201).json({ message: "User added successfully" });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
