import { useState, useEffect } from 'react';
import { useSocket } from '../socketContext';


function Home() {

	const {setUsername, enterLobby} = useSocket();

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
