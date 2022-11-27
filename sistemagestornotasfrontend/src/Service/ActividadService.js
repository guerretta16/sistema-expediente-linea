import { ENDPOINT } from "Config/EndPoint";

const getAllActividad = ({data, jwt}) =>{
    return (
        fetch(`${ENDPOINT}/actividad/${data.idPeriodo}/${data.idCursoNivel}`, {
            method: 'GET',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : ""
            }
        })
        .then(response => response.json())
        .then(data => data)
    );
}

const storeActividad = ({data, jwt}) =>{
    return (
        fetch(`${ENDPOINT}/actividad`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response)
    );
}

const updateActividad = ({data, jwt}) =>{
    return (
        fetch(`${ENDPOINT}/actividad/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response)
    );
}

const deleteActividad = ({data, jwt}) => {
    return(
        fetch(`${ENDPOINT}/actividad/${data.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(response => response)
    );
}

export {getAllActividad, storeActividad, updateActividad, deleteActividad};
