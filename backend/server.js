const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DK1234",
  database: "signup",
});

app.post("/signup", (req, res) => {
  const q = "INSERT INTO signup (`name`, `email`, `password`) VALUES(?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const q = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  const values = [req.body.email, req.body.password];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
