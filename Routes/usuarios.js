const express = require('express');
const db = require('../DB.JS');

const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Usuário registrado!" });
    });
});
module.exports = router;