import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

app.use(express.static('public'));

io.on('connection', (socket) => {
	console.log('New user connected', socket.id);

	socket.on('user-connected', (username) => {
		socket.broadcast.emit('new-user-connected', username);
	});
});

server.listen(2500, () => console.log('server is up and running'));
