const players = {};
const games = {};

function joinGame(playerId, socket) {
    // Simple matchmaking logic
    let game = Object.values(games).find(game => game.players.length < 2);
    if (!game) {
        game = { id: Date.now(), players: [] };
        games[game.id] = game;
    }
    game.players.push(playerId);
    players[playerId] = { game, socket };

    socket.join(game.id);

    if (game.players.length === 2) {
        // Start the game
        game.players.forEach(playerId => {
            players[playerId].socket.emit('start-game', game.id);
        });
    }
}

function handleMove(playerId, move) {
    const player = players[playerId];
    if (!player) return;

    const game = player.game;
    game.players.forEach(id => {
        if (id !== playerId) {
            players[id].socket.emit('game-move', move);
        }
    });
}

module.exports = { joinGame, handleMove };
