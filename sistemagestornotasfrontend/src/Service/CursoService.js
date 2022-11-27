import { ENDPOINT } from "Config/EndPoint";

//Todas las funciones para las peticiones al backend


function getAllCursos({ jwt }) {
    return(
        fetch(`${ENDPOINT}/curso/index`, {
            method: 'GET',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}`: ""
            }
        })
        .then(response =>  response)
    );
}

const storeCursos = ({data,jwt}) =>{
    return(
        fetch(`${ENDPOINT}/curso/store`,{
            method:'POST',
            headers: {
                'ContentType': 'application/json',
                'Authorization' : `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response;
        })
    )
}

const updateCursos = ({data, jwt}) =>{
    return(
        fetch(`${ENDPOINT}/curso/update/${data.id}`, {
            method: 'PUT',
            headers: {
                'ContentType': 'application/json',
                'Authorization' : `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(response =>{
            return response;
        })
    )
}

const deleteCursos = ({data, jwt})=>{
    return (
        fetch(`${ENDPOINT}/curso/delete/${data.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${jwt}`
            },
            body:JSON.stringify(data)
        })
        .then( (response) => {
            return response;
        })
    )
}

export { getAllCursos,storeCursos, updateCursos,deleteCursos};
