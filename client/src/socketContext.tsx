import { PropsWithChildren, createContext, useState } from "react";

interface ISocketContext {
 username : string
}

const defaultValues = {
 username : ""

}

const SocketContext = createContext<ISocketContext>(defaultValues);

const SocketProvider = ({children}:PropsWithChildren) => {

    const [username, setUsername] = useState("");

    return (
        <SocketContext.Provider value={ {username} }>
           {children}
        </SocketContext.Provider>
    )

}