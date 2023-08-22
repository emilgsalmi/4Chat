import { useState, useEffect } from 'react';
import { useSocket } from '../socketContext';
import { useNavigate } from 'react-router';


function Home() {

	const {username, setUsername, enterLobby} = useSocket();
	const navigate = useNavigate();

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
						enterLobby(username);
						navigate('/lobby')
					}}
				>
					Enter Lobby
				</button>
			</div>
		</>
	);
}
export default Home;
