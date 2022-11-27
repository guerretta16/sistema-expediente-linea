import { ENDPOINT } from "Config/EndPoint";


const getAllCategoriaAlumno = ({jwt}) => {
    return (
        fetch(`${ENDPOINT}/getAllCategoriaAlumno`, {
            method: 'GET',
            headers: {
                "Authorization": jwt ? `Bearer ${jwt}` : ""
            }
        }).then(response => response)
    )
};

const storeCategoriaAlumnoService = ({jwt, dataSend}) => {
    return (
        fetch(`${ENDPOINT}/storeCategoriaAlumno`, {
            method: 'POST',
            headers: {
                "Authorization": jwt ? `Bearer ${jwt}` : ""
            },
            body: JSON.stringify(dataSend)
        })
        .then(response => response)
    )
}

const deleteCategoriaAlumnoService = ({jwt, id}) => {
    return (
        fetch(`${ENDPOINT}/deleteCategoriaAlumno/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": jwt ? `Bearer ${jwt}` : ""
            }
        }).then(response => response)
    )
}

const updateCategoriaAlumnoService = ({jwt, dataSend}) => {
    return (
        fetch(`${ENDPOINT}/updateCategoriaAlumno`, {
            method: 'POST',
            headers: {
                "Authorization": jwt ? `Bearer ${jwt}` : ""
            },
            body: JSON.stringify(dataSend)
        })
        .then(response => response)
    )
};

export {
    getAllCategoriaAlumno,
    storeCategoriaAlumnoService,
    deleteCategoriaAlumnoService,
    updateCategoriaAlumnoService
}
