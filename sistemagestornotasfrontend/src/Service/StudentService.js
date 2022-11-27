import { ENDPOINT } from 'Config/EndPoint';

const getAllStudent = ({ jwt }) => {
    return (
        fetch(`${ENDPOINT}/alumno`, {
            method: 'GET',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : '',
            }
        }).then(response => response)
    )
}

const getStudentById = ({ jwt, id }) => {
    return (
        fetch(`${ENDPOINT}/alumno/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : '',
            }
        }).then(response => response)
    )
}

const updateStudent = ({ jwt, student }) => {
    return (
        fetch(`${ENDPOINT}/alumno/${student.id}`, {
            method: "PUT",
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        .then(response => response)
    )

}

const deleteStudent = ({ jwt, id }) => {
    return (
        fetch(`${ENDPOINT}/alumno/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : '',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response)
    )
}

const insertStudents = ({jwt, data}) => {
    const formData = new FormData();
    console.log(data);
    formData.append('prueba', data);
    return (
        fetch(`${ENDPOINT}/alumno/store`, {
            method: "POST",
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : ''
            },
            body: formData

        })
        .then(response => response)
    )
}

//Funcion de visualizar alumnos con la catgoría que pertenece. @Andrés
function getAlumnoCategoria({ jwt }) {
    return(
        fetch(`${ENDPOINT}/obtenerAlumnoCategoria`, {
            method: 'GET',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}`: ""
            }
        })
        .then(response =>  response)
    );
}

export {
    getAllStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    insertStudents,
    getAlumnoCategoria,
}