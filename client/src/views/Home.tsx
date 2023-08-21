import { useState } from 'react';
import { useSocket } from '../socketContext';
import { validateUsername } from '../utils/validation';

function Home() {
	const { setUsername, username, enterLobby } = useSocket();
	const [errorMsg, setErrorMsg] = useState('');

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
						if (validateUsername(username)) {
							window.location.href = '/lobby';
							enterLobby();
						} else {
							setErrorMsg(
								'Username must be 3-12 characters long and only contain letters and numbers'
							);
						}
					}}
				>
					Enter Lobby
				</button>
			</div>
			<div>
				<span className='usernameError'>{errorMsg}</span>
			</div>
		</>
	);
}
export default Home;
