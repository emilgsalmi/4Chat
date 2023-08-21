import { PropsWithChildren, createContext, useState, useContext, useEffect } from "react";
import { io } from 'socket.io-client';

interface ISocketContext {
 username : string,
 myRoom : string
 enterLobby : () => void,
 setUsername : React.Dispatch<React.SetStateAction<string>>,
 setMyRoom : React.Dispatch<React.SetStateAction<string>>,
 rooms : string[]
}

// Default values for Context
const defaultValues = {
 username : "",
 myRoom : "",
 enterLobby : () => {},
 setUsername : () => {},
 setMyRoom : () => {},
 rooms : []

}

// Context to access socketinfo
const SocketContext = createContext<ISocketContext>(defaultValues);

// Function for using context
export const useSocket = () => useContext(SocketContext);

const socket = io('http://localhost:2500', { autoConnect: true });

	

// Provide Context to children components to give them access
const SocketProvider = ({children}:PropsWithChildren) => {

    const [username, setUsername] = useState("");
    const [myRoom, setMyRoom] = useState("");
    const [rooms, setRooms] = useState<string[]>([]);


// Connect to socket & enter lobby
    const enterLobby = () => {
		socket.connect();

		socket.emit('user-connected', username);
	};

// Listen to changes to rooms & update state 
    useEffect(() => {
        socket.on('rooms', (roomList : string[]) => {
             setRooms(roomList)
        })
    }, [])

    useEffect(() => {
        console.log(rooms);
    }, [rooms])

    // Listen to changes to user's room and join room on change
    useEffect(() => {
        if(myRoom !== "") {
            socket.emit('join-room', myRoom)
            console.log(myRoom)
        }
    }, [myRoom])


    return (
        <SocketContext.Provider value={ {username, myRoom, enterLobby, setUsername, setMyRoom, rooms} }>
           {children}
        </SocketContext.Provider>
    )

}

export default SocketProvider