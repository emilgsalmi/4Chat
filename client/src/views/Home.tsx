import { useState } from 'react';
import { useSocket } from '../socketContext';
import { useNavigate } from 'react-router';
import { validateUsername } from '../utils/validation';

function Home() {
	const { enterLobby } = useSocket();
	const [errorMsg, setErrorMsg] = useState(''); // error message to display if username is invalid

	const [usernameHolder, setUsernameHolder] = useState("")
	
	const navigate = useNavigate();

	return (
		<>
			<div>Hello 4Chatters</div>

			<div>
				<input
					type='text'
					onChange={(e) => {
						setUsernameHolder(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						// validate username
						if (validateUsername(usernameHolder)) {
							// if valid: set username and enter lobby
							enterLobby(usernameHolder);
							navigate('/lobby');
						} else {
							// if invalid: display error message
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
