import { useEffect, useState } from "react";
import { useSocket } from "../socketContext";
import { useNavigate } from "react-router";
import '../styles/lobby.scss'

function Lobby() {
	const [topic, setTopic] = useState('');
	const [html, setHtml] = useState<JSX.Element[]>([]);
	const [roomList, setRoomList] = useState([]);
	const [roomUsers, setRoomUsers] = useState([]);
	const [allUsers, setAllUsers] = useState(0);
	const [roomCreated, setRoomCreated] = useState<boolean>(false);

	const { setMyRoom, rooms, setMessages, myRoom, joinRoom } = useSocket();
	const navigate = useNavigate();

	useEffect(() => {
		let list: any = [];
		let count: any = [];
		for (const [room, names] of Object.entries(rooms)) {
			if (room !== 'lobby') {
				list.push(room);
				count.push(names.length);
			}
			if (room === 'lobby') {
				setAllUsers(names.length);
			}
		}
		setRoomUsers(count);
		setRoomList(list);
	}, [rooms]);

	useEffect(() => {
		let rooms = roomList.map((room, i) => {
			return (
				<li
					key={i}
					onClick={() => {
						if (myRoom !== '') {
							joinRoom(room, myRoom);
						} else {
							joinRoom(room);
						}
						setMyRoom(room);
						setMessages([]);
						navigate('/room');
					}}
				>
					<h4>{room}</h4>

					<span>Users in room: {roomUsers[i]}</span>
				</li>
			);
		});

		setHtml(rooms);
	}, [roomList]);

	useEffect(() => {
		if(roomList.length > 0){
			setRoomCreated(true);
		}
		else{
			setRoomCreated(false)
		}
	},[roomList])

	return (

	<div className="lobby_container">
      <div className="lobby_title">
			<h1>LOBBY</h1>
			<h6>Users online: {allUsers}</h6>
      </div>

			<div className="lobby_create_container">
				<form onSubmit={(e) => {
					e.preventDefault();
				}}>
					<h3>Create Room</h3>
					<input
						type='text'
						placeholder='Topic'
						onChange={(e) => {
							setTopic(e.target.value);
						}}
					/>
					<button onClick={() => {
						joinRoom(topic,myRoom);
						setMessages([]);
						navigate("/room");					
					}}>
						CREATE
					</button>
				</form>
			</div>

			
			<div className={roomCreated ? "lobby_room_container" :"lobby_room_container--hide"}>
				<h2>ALL ROOMS</h2>
				<ul>{html}</ul>
			</div>
			
		</div>
	);
}
export default Lobby;
