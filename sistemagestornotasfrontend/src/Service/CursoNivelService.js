import { ENDPOINT } from "Config/EndPoint";

const getCursosByNivel = ({jwt, id}) =>{
    return(
        fetch(`${ENDPOINT}/cursos/${id}`, {
            method: 'GET',
            headers:{
                'Authorization': jwt ? `Bearer ${jwt}` : ""
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
    );
}

const getCursoNivel = ({id, jwt}) => {
    return (
        fetch(`${ENDPOINT}/getCursoNivel/${id}`,{
            method: 'GET',
            headers:{
                'Authorization': jwt ? `Bearer ${jwt}` : ""
            }
        })
    );
};

export {getCursosByNivel, getCursoNivel};