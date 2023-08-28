import { useEffect, useState } from 'react';
import { useSocket } from '../socketContext';
import { useNavigate } from 'react-router';

function Room() {
	//#region  Context
	const {
		rooms,
		myRoom,
		leaveRoom,
		username,
		isTyping,
		userTyping,
		messages,
		sendMessage,
	} = useSocket();

	const [participantList, setParticipantList] = useState([]);
	const [html, setHtml] = useState<JSX.Element[]>([]);
	const [message, setMessage] = useState('');
	const [whoIsTyping, setWhoIsTyping] = useState('');

	const navigate = useNavigate();

	// Render messages
	const feedHtml = messages.map((msg) => {
		return (
			<article
				className={
					msg.username === username
						? 'message message--self'
						: 'message message--other'
				}
			>
				<h3 className='message__sender'>{msg.username}</h3>
				<p className='message__message'>{msg.message}</p>
				<br />
			</article>
		);
	});

	// Render participants
	useEffect(() => {
		for (const [room, names] of Object.entries(rooms)) {
			// console.log(room);
			if (room === myRoom) {
				let list: any = [];
				for (let i = 0; i < names.length; i++) {
					list.push(names[i]);
				}
				setParticipantList(list);
			}
		}
	}, [rooms]);

	// Listen to changes to participantList
	useEffect(() => {
		let names = participantList.map((name, i) => {
			return <li key={i}>{name}</li>;
		});
		setHtml(names);
	}, [participantList]);

	// Listen to changes to userTyping
	useEffect(() => {
		setWhoIsTyping(userTyping);
	}, [userTyping]);

	// Listen to changes to messages & render output
	useEffect(() => {
		console.log('triggered messages useEffect in Room.tsx');
	}, [messages]);

	//#endregion

	return (
		<div>
			<h1>Topic: {myRoom}</h1>

			{/* Chatbox */}
			<div className='chat'>
				{/* Messages */}
				<div className='chat__feed'>{feedHtml}</div>

				{/* Typing indicator */}
				<p className='chat__typing'>{whoIsTyping}</p>

				{/* Input field */}
				<input
					className='chat__input'
					type='text'
					onChange={(e) => {
						setMessage(e.target.value);
						isTyping(username, myRoom);
					}}
					value={message}
				/>

				{/* Submit button */}
				<button
					className='chat__submit-btn btn'
					onClick={() => {
						sendMessage(message);
						setMessage('');
					}}
				>
					Send
				</button>
			</div>

			{/* List of participants */}
			<ul>{html}</ul>

			{/* Leave room button */}
			<button
				onClick={() => {
					leaveRoom(myRoom);
					navigate(-1);
				}}
			>
				Exit
			</button>
		</div>
	);
}
export default Room;
