const express = require('express');
const db = require('../DB.JS');
const orquestradorAtendimento = require('../OrquestradorAtendimento');
const router = express.Router();
// Registrar uma solicitação de compra
router.post('/register', async (req, res) => {
    const { dadosPet,dadosProntuario } = req.body;
    try {
        await orquestradorAtendimento.registrarAtendimento(dadosPet, dadosProntuario);
        res.status(201).send('Atendimento registrado!');
    } catch (erro) {
        res.status(500).send('Erro ao registrar Atendimento: ' + erro.message);
    }
});
module.exports = router;
