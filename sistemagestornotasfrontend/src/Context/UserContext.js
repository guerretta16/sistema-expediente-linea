import React, { useState } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
    const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('jwt'));
    const [nombreRol, setNombreRol] = useState(() => window.sessionStorage.getItem('nombreRol'));
    const [idRol, setIdRol] = useState(() => window.sessionStorage.getItem('idRol'));
    const [idUser, setIdUser] = useState(() => window.sessionStorage.getItem('id'));

    return <Context.Provider 
            value = {{ jwt, setJWT, nombreRol, setNombreRol, idRol, setIdRol, idUser, setIdUser }}
        >
        {children}
    </Context.Provider>
}

export default Context;