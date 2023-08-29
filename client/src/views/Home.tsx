import { useState } from 'react';
import { useSocket } from '../socketContext';
import { useNavigate } from 'react-router';
import { validateUsername } from '../utils/validation';

function Home() {
	const { username, setUsername, enterLobby } = useSocket();
	const [errorMsg, setErrorMsg] = useState(''); // error message to display if username is invalid

	const [usernameHolder, setUsernameHolder] = useState('');

	const navigate = useNavigate();

	return (
		<div className='wrapper'>
			<div className='login'>
				<h1 className='login__heading'>Hello 4Chatters</h1>

				<div>
					<input
						className='login__input'
						type='text'
						placeholder='Username (3-12 chars)'
						onChange={(e) => {
							setUsernameHolder(e.target.value);
						}}
					/>
					<button
						className='login__btn'
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
					<span className='login__error'>{errorMsg}</span>
				</div>
			</div>
		</div>
	);
}
export default Home;
