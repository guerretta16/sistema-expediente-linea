import { useState, useContext, useEffect } from 'react';
import Context from "Context/UserContext";
import { getAllRol } from "Service/RolService";

function useRol() {
    const [roles, setRoles] = useState([]);


    const { jwt } = useContext(Context);


    useEffect(() => {
        getAllRol({jwt})
        .then(response =>response.json())
        .then(data => {
            setRoles(data);
        })

    }, [jwt]);

    return {
        rols: roles
    }
}

export { useRol };