import {
	PropsWithChildren,
	createContext,
	useState,
	useContext,
	useEffect,
} from 'react';
import { io } from 'socket.io-client';

interface ISocketContext {
	username: string;
	myRoom: string;
	enterLobby: (username: string) => void;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setMyRoom: React.Dispatch<React.SetStateAction<string>>;
	rooms: {};
	leaveRoom: (room: string) => void;
	isTyping: (user: string, room: string) => void;
	userTyping: string;

	messages: IMessageObject[];
	sendMessage: (message: string) => void;
}

export interface IRoomObject {
	room: string;
	participants: string[];
}

export interface IMessageObject {
	message: string;
	username: string;
	room: string;
}

// Default values for Context

const defaultValues = {
	username: '',
	myRoom: '',
	enterLobby: () => {},
	setUsername: () => {},
	setMyRoom: () => {},
	rooms: {},
	leaveRoom: () => {},
	isTyping: () => {},
	userTyping: '',

	messages: [],
	sendMessage: () => {},
};

// Context to access socketinfo
const SocketContext = createContext<ISocketContext>(defaultValues);

// Function for using context
export const useSocket = () => useContext(SocketContext);

const socket = io('http://localhost:2500', { autoConnect: false });

// Provide Context to children components to give them access
const SocketProvider = ({ children }: PropsWithChildren) => {
	const [messages, setMessages] = useState<IMessageObject[]>([]);
	const [username, setUsername] = useState('');
	const [myRoom, setMyRoom] = useState('');
	const [rooms, setRooms] = useState({});
	const [userTyping, setUserTyping] = useState('');

	const [skipRun, setSkipRun] = useState(true);

	// Connect to socket & enter lobby
	const enterLobby = (username: string) => {
		socket.connect();
		setUsername(username);
		socket.emit('new-user', username);
		socket.emit('join-room', 'lobby');
	};

	//Listen to if a user is typing & update state
	useEffect(() => {
		if (skipRun) setSkipRun(false);
		if (!skipRun) {
			socket.on('user-typing', (user: string) => {
				// console.log(username);
				if (user !== username) {
					setUserTyping(user + ' is typing...');
					setTimeout(() => {
						setUserTyping('');
					}, 2250);
				}
			});
		}
	}, [username]);

	useEffect(() => {
		// Listen to changes to rooms & update state
		socket.on('rooms', (roomList: IRoomObject[]) => {
			setRooms(roomList);
		});

		socket.on('recieve-message', (data: IMessageObject) => {
			setMessages((prev) => [...prev, data]);
		});
	}, []);

	// Listen to changes to user's room and join room on change
	useEffect(() => {
		if (myRoom !== '') {
			socket.emit('join-room', myRoom);
		}
	}, [myRoom]);

	// Listen to messages from server
	const sendMessage = (message: string) => {
		const data: IMessageObject = {
			message: message,
			username: username,
			room: myRoom,
		};
		socket.emit('send-message', { data });
	};

	// Leave room function
	const leaveRoom = (room: string) => {
		setMyRoom('');
		socket.emit('leave-room', room);
	};

	// Function to let server know that a user is typing

	const isTyping = (user: string, room: string) => {
		socket.emit('is-typing', { user, room });
	};

	return (
		<SocketContext.Provider
			value={{
				username,
				myRoom,
				enterLobby,
				setUsername,
				setMyRoom,
				rooms,
				leaveRoom,
				isTyping,
				userTyping,
				messages,
				sendMessage,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
