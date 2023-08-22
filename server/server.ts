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
let rooms : any = {};

io.on('connection', (socket) => {
	console.log('New user connected', socket.id);




	socket.on('new-user', (username) => {
	
		userList.set(socket.id, username);

		socket.data.username = username;

	});

	

// Join room and update list of rooms
	socket.on('join-room', (room) => {
		socket.join(room)

		socket.leave(socket.id)
	
		
	 updateRooms();

     socket.emit('rooms', rooms)
	})

// Leave room and update list of rooms

  socket.on('leave-room', (room) => {
	socket.leave(room)

	updateRooms();

	socket.emit('rooms', rooms)
  })


	// Functions & Utils
	
	const updateRooms = () => {
	
		const roomObject = Object.fromEntries(Array.from(io.sockets.adapter.rooms, ([key, value]) => {
		
			let	usernames: any = []	
			value.forEach((v) => {
				usernames.push(userList.get(v))
				console.log(userList)
			})
			return [key, usernames]
		}))

		console.log(roomObject)

		rooms = roomObject
	}

});

server.listen(2500, () => console.log('server is up and running'));
