const express = require('express');
const db = require('../DB.JS');

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, result) => {
        if (err || result.length === 0) return res.status(400).json({
            message: 'Usuárionão encontrado'
        });
        const user = result[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: 'Senha incorreta' });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn:
                '1h'
        });
        res.json({ token });
    });
});
module.exports = router;