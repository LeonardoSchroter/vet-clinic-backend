require('dotenv').config();
const express = require('express');
const router = require('./Routes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use('/api', router);
app.use(cors());

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
