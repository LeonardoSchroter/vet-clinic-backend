const express = require('express');
const db = require('../DB.JS');

const router = express.Router();

// Inserir novo prontuário
router.post('/records', async (req, res) => {
    const { pet_id, diagnosis, treatment } = req.body;
    const query = 'INSERT INTO records (pet_id, diagnosis, treatment) VALUES (?, ?, ?)';
    try {
        await db.query(query, [pet_id, diagnosis, treatment]);
        res.status(201).json({ message: 'Prontuário registrado!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao cadastrar prontuário' });
    }
});

// Obter prontuários por ID do pet
router.get('/records/:petId', async (req, res) => {
    const { petId } = req.params;
    const query = `
        SELECT diagnosis, treatment, date
        FROM records
        WHERE pet_id = ?
    `;
    try {
        const [rows] = await db.query(query, [petId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao obter prontuário" });
    }
});

module.exports = router;
