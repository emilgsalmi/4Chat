import { PropsWithChildren, createContext, useState, useContext, useEffect } from "react";
import { io } from 'socket.io-client';

interface ISocketContext {
 username : string,
 room : string
 enterLobby : () => void,
 setUsername : React.Dispatch<React.SetStateAction<string>>
 setRoom : React.Dispatch<React.SetStateAction<string>>
}

// Default values for Context
const defaultValues = {
 username : "",
 room : "",
 enterLobby : () => {},
 setUsername : () => {},
 setRoom : () => {}

}

// Context to access socketinfo
const SocketContext = createContext<ISocketContext>(defaultValues);

// Function for using context
export const useSocket = () => useContext(SocketContext);

const socket = io('http://localhost:2500', { autoConnect: false });

	// useEffect(() => {
	// 	socket.on('new-connection', (username) => {
	// 		console.log(username);
	// 	});
	// }, []);

	

// Provide Context to children components to give them access
const SocketProvider = ({children}:PropsWithChildren) => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const enterLobby = () => {
		socket.connect();

		socket.emit('user-connected', username);
	};

   

    // Listen to changes to room and join room on change
    useEffect(() => {
        socket.emit("join-room", room)

    }, [room])

    return (
        <SocketContext.Provider value={ {username, room, enterLobby, setUsername, setRoom} }>
           {children}
        </SocketContext.Provider>
    )

}

export default SocketProvider