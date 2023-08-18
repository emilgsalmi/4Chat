import { PropsWithChildren, createContext, useState, useContext } from "react";

interface ISocketContext {
 username : string,
 room : string
}

// Default values for Context
const defaultValues = {
 username : "",
 room : ""

}

// Context to access socketinfo
const SocketContext = createContext<ISocketContext>(defaultValues);

// Function for using context
export const useSocket = () => useContext(SocketContext);

// Provide Context to children components to give them access
const SocketProvider = ({children}:PropsWithChildren) => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    return (
        <SocketContext.Provider value={ {username, room} }>
           {children}
        </SocketContext.Provider>
    )

}

export default SocketProvider