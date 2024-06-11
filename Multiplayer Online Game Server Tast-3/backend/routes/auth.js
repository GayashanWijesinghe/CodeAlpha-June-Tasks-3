const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Player = require('../models/player');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const player = new Player({ username, password });
        await player.save();
        const token = jwt.sign({ id: player._id }, 'your_jwt_secret');
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const player = await Player.findOne({ username });
        if (!player || !(await player.comparePassword(password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: player._id }, 'your_jwt_secret');
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
