import { useEffect, useState } from "react";
import { useSocket } from "../socketContext";
import { useNavigate } from "react-router";



function Room() {
	const {rooms, myRoom, leaveRoom, username, isTyping, userTyping} = useSocket();

	const [participantList, setParticipantList] = useState([])
	const [html, setHtml] = useState<JSX.Element[]>([])
	const [message, setMessage] = useState("")
	const [whoIsTyping, setWhoIsTyping] = useState("")

	
	
	const navigate = useNavigate();

	
	useEffect(() => {
		
		for (const [room, names] of Object.entries(rooms)) {
			console.log(room);
			if (room === myRoom) {
				let list : any = [];	
				for(let i =0; i<names.length; i++) {
					list.push(names[i]);
				}
				setParticipantList(list);
			}
			
		  }
		
	}, [rooms])

	useEffect(() => {
         let names = 
			participantList.map((name, i) => {
				return <li key={i}>{name}</li>
			});
			setHtml(names)
      
	}, [participantList])

	useEffect(() => {
         setWhoIsTyping(userTyping)
	}, [userTyping])


	


	return (
		<div>
			<h1>{myRoom}</h1>

			<div className="chatbox">

				<p>{whoIsTyping}</p>
				<input type="text" onChange={(e) => {
					setMessage(e.target.value);
					isTyping(username, myRoom);
				}}/>
			</div>

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
