import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function Home() {
	const socket = io('http://localhost:2500', { autoConnect: false });

	const [username, setUsername] = useState('');

	useEffect(() => {
		socket.on('new-connection', (username) => {
			console.log(username);
		});
	}, []);

	const enterLobby = () => {
		socket.connect();

		socket.emit('user-connected', username);
	};

	return (
		<>
			<div>Hello 4Chatters</div>

			<div>
				<input
					type='text'
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						enterLobby();
					}}
				>
					Enter Lobby
				</button>
			</div>
		</>
	);
}
export default Home;
