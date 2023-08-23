import { useEffect, useState } from "react";
import { useSocket } from "../socketContext";
import { useNavigate } from "react-router";

function Room() {
	const {rooms, myRoom, leaveRoom} = useSocket();
	const [html, setHtml] = useState<any>([])

	const navigate = useNavigate();

	const partic : string[] = rooms[myRoom];


	return (
		<div>
			<h1>{myRoom}</h1>

			<div className="chatbox"></div>

			<ul className="participant-list">

			{/* {
			   partic.map((name) => {

				return <li key={name}>{name}</li>
			  })
			} 	 */}

			</ul>

			<button onClick={() => {leaveRoom(myRoom); navigate(-1)}}>LEAVE CHAT</button>
		</div>
	);
}
export default Room;
