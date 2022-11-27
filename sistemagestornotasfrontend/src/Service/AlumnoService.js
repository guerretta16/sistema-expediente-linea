import  { ENDPOINT } from 'Config/EndPoint';

const registerAlumnoByExcel = ({ file }) => {

    const formData = new FormData();
    formData.append('file', file);

    
    return fetch(`${ENDPOINT}/registroAlumno`, {
        method: 'POST',
        body: formData
    });
}

export {registerAlumnoByExcel};