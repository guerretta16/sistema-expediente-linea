/**
 * @author JS Martinez
 */
import { ENDPOINT } from 'Config/EndPoint';

function getAllDocentes({ jwt }) {
    return (
        fetch(`${ENDPOINT}/docente/getAll`, {
            method: 'GET',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : ""
            }
        })
        .then(response => response)
    );
}

function storeDocente({ jwt, data }) {
    return (
        fetch(`${ENDPOINT}/docente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt ? `Bearer ${jwt}` : ""
            },
            body: JSON.stringify(data)
        })
        .then(response => response)
    )
}

export { getAllDocentes, storeDocente };