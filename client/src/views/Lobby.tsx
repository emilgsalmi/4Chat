import { useEffect, useState } from "react";
import { useSocket } from "../socketContext";
import { useNavigate } from "react-router";

function Lobby() {

	const [topic, setTopic] = useState("")

	const [html, setHtml] = useState<JSX.Element[]>([])
	const [roomList, setRoomList] = useState([])

	const {setMyRoom, rooms, myRoom} = useSocket();
	const navigate = useNavigate();

	useEffect(() => {
		let list : any = [];
		for (const [room] of Object.entries(rooms)) {
			if (room !== 'lobby') {
			list.push(room)             
		}}
		setRoomList(list)
	},[rooms])

	useEffect(() => {
		let rooms = roomList.map((room, i) => {
			return <li key={i} onClick={() => {setMyRoom(room); navigate(`/room`)}} >{room}</li>
		})
		setHtml(rooms)
	}, [roomList] ) 

	return (
		<div>
			<h1>Lobby</h1>
           
			<div>
				<h3>Create Room</h3>
			<input type="text" placeholder="Topic" onChange={(e) => {setTopic(e.target.value)}} />
			<button onClick={() => {setMyRoom(topic); navigate('/room')} }>CREATE</button>
			</div>

			<div>
			<h2>Alla Rum</h2>
            <ul>
				{html}
			</ul>
			</div>
			
		</div>
	);
}
export default Lobby;
