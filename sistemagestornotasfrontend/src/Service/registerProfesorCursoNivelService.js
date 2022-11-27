/**
 * @author JS Martinez
 */
import { ENDPOINT } from 'Config/EndPoint';

function getAllRegisterByNivelCursoAndPeriodo({ idPeriodo, idCursoNivel, jwt }) {
    return (
        fetch(`${ENDPOINT}/registroDocenteCurso/showRegister?idNivelCurso=${idCursoNivel}&idPeriodo=${idPeriodo}`, {
            method: 'GET',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : ""
            }
        })
        .then(response => response)
    );
}


async function storeRegister({ data, jwt }) {
    const response = await fetch(`${ENDPOINT}/registroDocenteCurso/storeRegister`, {
            method: 'POST',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : "",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    return response;
}

function deleteRegister({ id, jwt }) {
    return (
        fetch(`${ENDPOINT}/registroDocenteCurso/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : "",
                'Content-Type': 'application/json'
            }
        })
        .then(response => response)
    );
}

const updateRegister = ( { data, jwt } ) => {
    return ( 
        fetch(`${ENDPOINT}/registroDocenteCurso/update/${data.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : "",
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
        })
        .then(response => response)
    )
    
}

const getAllRegisterByDocente = ({ jwt, idPeriodo }) => {
    return (
        fetch(`${ENDPOINT}/getAllCursosNivelByDocente?idPeriodo=${idPeriodo}`, {
            method: 'GET',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : ""
            }
        })
        .then(response => response)
    );
}


export {
    getAllRegisterByNivelCursoAndPeriodo, 
    storeRegister, 
    deleteRegister, 
    updateRegister ,
    getAllRegisterByDocente
};
