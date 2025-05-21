const db = require('../DB.JS');
const express = require('express');
const router = express.Router();

// Rota para cadastrar um pet
router.post('/pets', async (req, res) => {
    const { name, species, owner_id } = req.body;
    const query = 'INSERT INTO pets (name, species, owner_id) VALUES (?, ?, ?)';
    try {
        await db.query(query, [name, species, owner_id]);
        res.status(201).json({ message: 'Pet cadastrado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao cadastrar pet' });
    }
});

// Rota para listar todos os pets
router.get('/pets', async (req, res) => {
    const query = `
        SELECT pets.id, pets.name AS pet_name, pets.species, users.name AS owner_name
        FROM pets
        JOIN users ON pets.owner_id = users.id
    `;
    try {
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao obter pets" });
    }
});

router.get('/pets/search', async (req, res) => {
    const { ownerName } = req.query;
    const query = `
        SELECT pets.id, pets.name AS pet_name, pets.species, users.name AS owner_name
        FROM pets
        JOIN users ON pets.owner_id = users.id
        WHERE users.name LIKE ?
    `;
    try {
        const [rows] = await db.query(query, [`%${ownerName}%`]);

        // Mostrando os nomes dos donos no console
        const donos = rows.map(pet => pet.owner_name);
        console.log('Donos encontrados:', donos);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar pets" });
    }
});
module.exports = router;
