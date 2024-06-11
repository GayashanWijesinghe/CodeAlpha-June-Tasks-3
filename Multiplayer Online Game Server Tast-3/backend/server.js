const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');
const setupWebsocket = require('./websocket');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/multiplayer-game', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api/auth', authRoutes);

setupWebsocket(io);

const port = 3001;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
