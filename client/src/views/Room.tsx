import { useEffect, useState } from "react";
import { IRoomObject, useSocket } from "../socketContext";
import { useNavigate } from "react-router";



function Room() {
	const {rooms, myRoom, leaveRoom} = useSocket();

	const [participantList, setParticipantList] = useState([])
	const [html, setHtml] = useState<JSX.Element[]>([])

	
	
	const navigate = useNavigate();

	
	useEffect(() => {
		
		for (const [key, value] of Object.entries(rooms)) {
			if (key === myRoom) {
				let list : any = [];	
				for(let i =0; i<value.length; i++) {
					list.push(value[i]);
				}
				console.log(list.length)
				setParticipantList(list);
			}
			
		  }
		
	}, [rooms])

	useEffect(() => {
		console.log(participantList);
		console.log(participantList.length)
         let names = 
			participantList.map((name, i) => {
				console.log(name)
				return <li key={i}>{name}</li>
			});
			setHtml(names)
      
	}, [participantList])


	


	return (
		<div>
			<h1>{myRoom}</h1>

			<div className="chatbox"></div>

	        <ul>

				{
					html
				}

				</ul>

	

			<button onClick={() => {leaveRoom(myRoom); navigate(-1)}}>LEAVE CHAT</button>
		</div>
	);
}
export default Room;
