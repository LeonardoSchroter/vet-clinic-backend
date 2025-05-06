const express = require('express');
const db = require('../DB.JS');

const router = express.Router();

router.post('/records', (req, res) => {
    const { pet_id, diagnosis, treatment } = req.body;
    const query = 'INSERT INTO records (pet_id, diagnosis, treatment) VALUES(?, ?, ?)';
    db.query(query, [pet_id, diagnosis, treatment], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao cadastrar prontuário' });
        res.status(201).json({ message: 'Prontuário registrado!' });
    });
});

router.get('/records/:petId', (req, res) => {
    const { petId } = req.params;
    const query = `
    SELECT diagnosis, treatment, date
    FROM records
    WHERE pet_id = ?
    `;
    db.query(query, [petId], (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao obter prontuário" });
        res.json(result);
    });
});
module.exports = router;