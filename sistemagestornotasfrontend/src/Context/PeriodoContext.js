import React, { useState } from 'react';

const Context = React.createContext({});

export function PeriodoContextProvider({ children }) {
    const [ periodo, setPeriodo ] = useState( () => window.sessionStorage.getItem('periodo') );

    return <Context.Provider 
        value = { { periodo, setPeriodo } }
    >
        {children}
    </Context.Provider>

}

export default Context;