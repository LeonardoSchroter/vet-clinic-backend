const db = require('../DB.JS');
const express = require('express');
const router = express.Router();
router.post('/pets', (req, res) => {
    const { name, species, owner_id } = req.body;
    const query = 'INSERT INTO pets (name, species, owner_id) VALUES (?, ?, ?)';
    db.query(query, [name, species, owner_id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao cadastrar pet' });
        res.status(201).json({ message: 'Pet cadastrado com sucesso!' });
    });
});


router.get('/pets', (req, res) => {
    const query = `
    SELECT pets.id, pets.name AS pet_name, pets.species, users.name AS owner_name
    FROM pets
    JOIN users ON pets.owner_id = users.id
    `;
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao obter pets" });
        res.json(result);
    });
});

router.get('/pets/search', (req, res) => {
    const { ownerName } = req.query;
    const query = `
    SELECT pets.id, pets.name AS pet_name, pets.species, users.name AS owner_name
    FROM pets
    JOIN users ON pets.owner_id = users.id
    WHERE users.name LIKE ?
    `;
    db.query(query, [`%${ownerName}%`], (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao buscar pets" });
        res.json(result);
    });
});
module.exports = router;