const jwt = require('jsonwebtoken');
const { joinGame, handleMove } = require('./game');
const Player = require('./models/player');

module.exports = (io) => {
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.query.token;
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const player = await Player.findById(decoded.id);
            if (!player) {
                return next(new Error('Authentication error'));
            }
            socket.playerId = player._id;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        joinGame(socket.playerId, socket);

        socket.on('move', (move) => {
            handleMove(socket.playerId, move);
        });

        socket.on('disconnect', () => {
            // Handle disconnection logic
        });
    });
};
