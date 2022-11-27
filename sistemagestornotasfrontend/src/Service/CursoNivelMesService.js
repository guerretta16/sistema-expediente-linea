import { ENDPOINT } from "Config/EndPoint";

function getMesesByCursoNivelMes ({data, jwt}) {
    return(
        fetch(`${ENDPOINT}/cursoNivelMes/mes/${data.cargaAcademica}`, {
            method: 'GET',
            headers: {
                Authorization: jwt ? `Bearer ${jwt}` : ""
            }
        })
        .then(response => response.json())
        .then(data => data)
    );
}

export {getMesesByCursoNivelMes}