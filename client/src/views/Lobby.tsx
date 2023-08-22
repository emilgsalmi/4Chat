import { useState } from "react";
import { useSocket } from "../socketContext";
import { useNavigate } from "react-router";

function Lobby() {

	const [topic, setTopic] = useState("")

	const {setMyRoom} = useSocket();
	const navigate = useNavigate();
	return (
		<div>
			<h1>Lobby</h1>

			<div>
				<h3>Create Room</h3>
			<input type="text" placeholder="Topic" onChange={(e) => {setTopic(e.target.value)}} />
			<button onClick={() => {setMyRoom(topic); navigate('/room')} }>CREATE</button>
			</div>
			
		</div>
	);
}
export default Lobby;
