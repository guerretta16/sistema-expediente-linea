import { ENDPOINT } from "Config/EndPoint";

function getAllNivels({jwt}){
    return(
        fetch(`${ENDPOINT}/nivels/index`, {
            method: 'GET',
            headers:{
                'Authorization': jwt ? `Bearer ${jwt}` : ""
            }
        })
        .then(response =>  {
            return response;
        })
    );
}

const storeNiveles = ({data,jwt}) =>{
    return(
        fetch(`${ENDPOINT}/nivels/store`,{
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

const updateNiveles = ({data, jwt}) =>{
    return(
        fetch(`${ENDPOINT}/nivels/update/${data.id}`, {
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

const deleteNiveles = ({data, jwt})=>{
    return (
        fetch(`${ENDPOINT}/nivels/delete/${data.id}`,{
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


export {getAllNivels, storeNiveles, updateNiveles, deleteNiveles};