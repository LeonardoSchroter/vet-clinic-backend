const express = require('express');
const router = express.Router();
const db = require('../DB.JS');


const petsRouter = require('./pets');
const prontuariosRouter = require('./records');
const atendimentoRouter = require('./atendimento');
const usuariosRouter = require('./usuarios');
const tokenRouter = require('./token');


router.use('/pets', petsRouter);
router.use('/prontuarios', prontuariosRouter);
router.use('/atendimentos', atendimentoRouter);
router.use('/usuarios', usuariosRouter);
router.use('/token', tokenRouter);

module.exports = router;