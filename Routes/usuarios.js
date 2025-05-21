const express = require('express');
const db = require('../DB.JS'); // deve exportar uma conexão com mysql2/promise
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

        await db.query(query, [name, email, hashedPassword]);

        res.status(201).send("Usuário registrado com sucesso!");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});

module.exports = router;
