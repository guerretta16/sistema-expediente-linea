import { ENDPOINT } from "Config/EndPoint";

const consultarBoletaSabatina = ({jwt, idPeriodo, idAlumno}) => {
    return fetch(`${ENDPOINT}/boletaSabatina/${idPeriodo}/${idAlumno}`, {
        method: 'GET',
        headers: {
            "Authorization": jwt ? `Bearer ${jwt}` : ""
        }
    })
    .then(resultado => resultado.json())
}

export {consultarBoletaSabatina};