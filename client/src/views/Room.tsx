import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../socketContext';
import { useNavigate } from 'react-router';
import '../styles/room.scss'
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

	const chatboxRef = useRef<HTMLDivElement>(null)

	// Render messages
	const feedHtml = messages.map((msg, i) => {
		return (
			<div
				key={i}
				className={
					msg.username === username
						? 'message message--self'
						: 'message message--other'
				}
			>
				<h3 className='message__sender'>{msg.username}</h3>
				<p className='message__message'>{msg.message}</p>
				<br />
			</div>
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

	// Listen to changes to messages & render output + Autoscroll to bottom
	useEffect(() => {
		console.log('triggered messages useEffect in Room.tsx');
		chatboxRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end'
		})
	}, [messages]);

	//#endregion

	return (
		<div id='chatroom_container'>
			<h1 id='chatroom_topic'>Chat Topic: {myRoom}</h1>

		<div className='chat_content_container'>
			{/* Chatbox */}
			<div className='chat'>
				{/* Messages */}
				<article className='chat__feed'>
					{feedHtml}
					<div ref={chatboxRef} className='chat_scroll_to_div'></div>
				</article>

				<div className="chat__lower__container">
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
			</div>

			{/* List of participants */}
			<div className='participant_list'>
				<h4>Chat participants</h4>
			<ul>{html}</ul>
			</div>

			</div>

			{/* Leave room button */}
			<button className='exit_button'
				onClick={() => {
					leaveRoom(myRoom);
					navigate(-1);
				}}
			>
				EXIT CHAT
			</button>
		</div>
	);
}
export default Room;
