import { useState, useEffect } from 'react';
import { useSocket } from '../socketContext';
import { useNavigate } from 'react-router';
import { validateUsername } from '../utils/validation';
import '../styles/home.scss';

function Home() {
	const { enterLobby } = useSocket();
	const [loading, setLoading] = useState<boolean>(true); // loading state for initial socket connection
	const [prompt, setPrompt] = useState<string>(); // error message to display if username is invalid
	const [valid, setValid] = useState<boolean>();
	const [usernameHolder, setUsernameHolder] = useState<string>('');
	const navigate = useNavigate();
	const handleLogin = () => {
		if (!valid) return;
		enterLobby(usernameHolder);
		navigate('/lobby');
	};

	// Validate username on change
	useEffect(() => {
		setValid(validateUsername(usernameHolder));
	}, [usernameHolder]);

	// Manage error message
	useEffect(() => {
		if (valid) {
			return setPrompt('Username valid');
		}
		if (!valid) {
			return setPrompt('Username must be 3-12 chars and alphanumeric');
		}
	}, [valid]); // Why is this displayed on first render? Solution: https://stackoverflow.com/questions/54954091/react-hooks-useeffect-setstate-on-first-render

	return (
		<div className='home'>
			<div className='login'>
				<form className='login__form' onSubmit={handleLogin}>
					<h1 className='login__heading'>Hello 4Chatters</h1>
					<div className='login__container'>
						<input
							className={valid ? 'login__input' : 'login__input login__input--invalid'}
							type='text'
							placeholder='Enter username . . .'
							onChange={(e) => {
								setLoading(false);
								setUsernameHolder(e.target.value);
							}}
							value={usernameHolder}
						/>
						<span
							className={
								valid
									? 'login__prompt login__prompt--valid'
									: 'login__prompt login__prompt--invalid'
							}
						>
							{!loading && prompt}
						</span>
					</div>
					<button
						type='submit'
						className={!valid ? 'login__btn login__btn--disabled' : 'login__btn'}
						disabled={!valid}
					>
						Enter Lobby
					</button>
				</form>
			</div>
		</div>
	);
}
export default Home;
