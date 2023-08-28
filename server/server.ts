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

const userList = new Map();
let rooms: any = [];

io.on('connection', (socket) => {
	console.log('New user connected', socket.id);

	socket.on('new-user', (username) => {
		userList.set(socket.id, username);

		socket.data.username = username;
	});

	// Join room and update list of rooms
	socket.on('join-room', (room) => {
		socket.join(room);

		socket.leave(socket.id);
		console.log(room);

		updateRooms();
		console.log(rooms);
		socket.broadcast.emit('rooms', rooms);
	});

	// Leave room and update list of rooms

	socket.on('leave-room', (room) => {
		socket.leave(room);

		updateRooms();

		console.log(rooms);
		socket.broadcast.emit('rooms', rooms);
	});

	// User is typing

	socket.on('is-typing', ({ user, room }) => {
		socket.to(room).emit('user-typing', user);
	});

	// Listen for chat message
	socket.on('send-message', ({ data }) => {
		// Send to everyone in the room including sender
		io.in(data.room).emit('recieve-message', data);
	});

	// Functions & Utils

	const updateRooms = () => {
		let roomObject = Object.fromEntries(
			Array.from(io.sockets.adapter.rooms, ([key, value]) => {
				let usernames: any = [];
				value.forEach((v) => {
					usernames.push(userList.get(v));
				});
				return [key, usernames];
			})
		);

		rooms = roomObject;
	};
});

server.listen(2500, () => console.log('server is up and running'));
