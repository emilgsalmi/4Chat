import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { users, rooms } from './storage/data';
import cors from 'cors';
//
//#region Setup
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

app.use(express.static('public'));
//#endregion Setup
//
io.on('connection', (socket) => {
	console.log('New user connected', socket.id);

	// User connected
	socket.on('user-connected', (username) => {
		users.push(username); // add user to users array

		socket.broadcast.emit('new-user-connected', username);
	});

	// User disconnected
	socket.on('user-disconnected', (username) => {
		socket.broadcast.emit('user-disconnected', username);
	});

	// Create room
	socket.on('create-room', (roomName) => {
		rooms.push(roomName); // add room to rooms array
		socket.broadcast.emit('new-room-created', roomName);
	});

	// Delete room
	socket.on('delete-room', (roomName) => {
		rooms.splice(rooms.indexOf(roomName), 1);
		socket.broadcast.emit('room-deleted', roomName);
	});

	// Join room
	socket.on('join-room', (roomName) => {
		socket.join(roomName);
	});

	// Leave room
	socket.on('leave-room', (roomName) => {
		socket.leave(roomName);
	});
});

server.listen(2500, () => console.log('server is up and running'));
