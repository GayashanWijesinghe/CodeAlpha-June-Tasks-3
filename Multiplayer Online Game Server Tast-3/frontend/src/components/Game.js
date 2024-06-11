import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Game = ({ token }) => {
    const [socket, setSocket] = useState(null);
    const [gameId, setGameId] = useState(null);
    const [moves, setMoves] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:3001', {
            query: { token }
        });

        newSocket.on('start-game', (gameId) => {
            setGameId(gameId);
        });

        newSocket.on('game-move', (move) => {
            setMoves((prevMoves) => [...prevMoves, move]);
        });

        setSocket(newSocket);

        return () => newSocket.close();
    }, [token]);

    const sendMove = (move) => {
        if (socket) {
            socket.emit('move', move);
        }
    };

    return (
        <div>
            <h2>Game ID: {gameId}</h2>
            <div>
                {moves.map((move, index) => (
                    <div key={index}>{move}</div>
                ))}
            </div>
            <button onClick={() => sendMove('Move at ' + new Date().toLocaleTimeString())}>Send Move</button>
        </div>
    );
};

export default Game;
