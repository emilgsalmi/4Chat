import { useState } from "react";
import { useSocket } from "../socketContext";

function Lobby() {

	const [topic, setTopic] = useState("")

	const {setMyRoom} = useSocket();
	return (
		<div>
			<h1>Lobby</h1>

			<div>
				<h3>Create Room</h3>
			<input type="text" placeholder="Topic" onChange={(e) => {setTopic(e.target.value)}} />
			<button onClick={() => {setMyRoom(topic)}}>CREATE</button>
			</div>
			
		</div>
	);
}
export default Lobby;
