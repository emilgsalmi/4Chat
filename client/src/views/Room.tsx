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
		setMessages
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
				<h3 className='message__sender'>{msg.username}:</h3>
				<p className='message__message'>{msg.message}</p>
				<br />
			</div>
		);
	});


	// Render participants
	useEffect(() => {
		for (const [room, names] of Object.entries(rooms)) {
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

	// Listen to changes to messages & Autoscroll to bottom
	useEffect(() => {
		chatboxRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end'
		})

	}, [messages]);

	//#endregion

	return (
		<div id='chatroom_container'>
			<h1 id='chatroom_topic'>{myRoom.toUpperCase()}</h1>

		<div className='chat_content_container'>
			{/* Chatbox */}
			<div className='chat'>
				{/* Messages */}
				<article className='chat__feed'>
					{feedHtml}

					{/* div to stick to bottom for scrolling */}
					<div ref={chatboxRef} className='chat_scroll_to_div'>
					</div>
				</article>
				{/* Typing indicator */}
				<p className='chat__typing'>{whoIsTyping}</p>

				{/* Message form */}
				<form 
				className="chat__lower__container" 
				onSubmit={(e) => {
					e.preventDefault()
					if (message !== '') {
						sendMessage(message);
						setMessage('');
						}

				}}>
			
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
				type='submit'
				className='chat__submit-btn btn'
				>
					Send
				</button>
				</form>
			</div>

			<div className='chat_right_container'>
			{/* List of participants */}
			<div className='participant_list'>
				<h4>Chat participants</h4>
			<ul>{html}</ul>
			</div>

			

			{/* Leave room button */}
			<button className='exit_button'
				onClick={() => {
					leaveRoom(myRoom);
					setMessages([]);
					navigate(-1);
				}}
			>
				EXIT CHAT
			</button>
			</div>
			</div>
		</div>
	);
}
export default Room;
