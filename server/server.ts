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

	let rooms : string[] = [];

	socket.on('user-connected', (username) => {
		console.log("new user connercted: " + username)
	});

	

// Join room and emit current room list to clients
	socket.on('join-room', (room) => {
		socket.join(room)
		rooms = [];
		socket.leave(socket.id);
		socket.rooms.forEach((r) => {
			rooms.push(r)
		})

        socket.emit('rooms', rooms)
	})
});

server.listen(2500, () => console.log('server is up and running'));
