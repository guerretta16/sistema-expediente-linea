import { ENDPOINT } from "Config/EndPoint";

function getAllAlumnosFromCarga({ data, jwt }) {
    return (
        fetch(`${ENDPOINT}/cargaAcademica/${data.id_periodo}/${data.id_curso_nivel}`, {
            method: "GET",
            headers: {
              Authorization: jwt ? `Bearer ${jwt}` : "",
            }
          })
          .then(response => response.json())
          .then(data => data)
    );
}

function getAllLineasActividadFromCurso({data, jwt}){
  return(
    fetch(`${ENDPOINT}/cargaAcademica/lineasActividad/${data.cargaAcademica}`, {
      method: "GET",
      headers:{
        Authorization: jwt ? `Bearer ${jwt}` : "",
      }
    })
    .then(response => response.json())
    .then(data => data)
  )
}


//Funciones de asignar, actualizar, eliminar un curso a un alumno.
//Función Store
const storeAsignarCursoAlumno = ({data,jwt,idPeriodo,idCursoNivel}) =>{

  const formData = new FormData();
  console.log(data);
  formData.append('id_periodo',idPeriodo);
  formData.append('id_curso_nivel',idCursoNivel);
  formData.append('prueba',data);
  return(
      fetch(`${ENDPOINT}/asignarCursoAlumno/store`,{
          method:'POST',
          headers: {
              'ContentType': 'application/json',
              'Authorization' : `Bearer ${jwt}`
          },
          body: formData
      })
      .then(response => {
          return response;
      })
  )
}
//Función Update
const updateAsignarCursoAlumno = ({data, jwt}) =>{
  return(
      fetch(`${ENDPOINT}/actualizarCursoAlumno/${data.id}`, {
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
//Función Delete
const deleteAsignarCursoAlumno = ({jwt,data})=>{
  return (
      fetch(`${ENDPOINT}/eliminarAlumnoCurso/${data.id}`,{
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
//Función GET
const getAsignarCursoAlumno = ({ jwt, data }) => {
  return (
      fetch(`${ENDPOINT}/obtenerAlumno/${data.id_periodo}/${data.id_curso_nivel}`, {
          method: 'GET',
          headers: {
              'Authorization': jwt ?`Bearer ${jwt}` : ""
          }
      })
      .then(response => response)
  );
}

const getAllStudentIncritos = ({jwt,data}) => {
  return (
      fetch(`${ENDPOINT}/obtenerAlumno/${data.id_periodo}/${data.id_curso_nivel}`, {
          method: 'GET',
          headers: {
              'Authorization': jwt ?`Bearer ${jwt}` : ""
          }
      })
      .then(response => response)
  );
}

function getAllAlumnosForBoleta({idPeriodo}){
  return(
    fetch(`${ENDPOINT}/indexGetAlumnos/${idPeriodo}`, {
      method: 'GET',
    })
    .then(response => response.json())
  );
}

export {getAllAlumnosFromCarga, getAllLineasActividadFromCurso, 
        storeAsignarCursoAlumno, 
        updateAsignarCursoAlumno,
        deleteAsignarCursoAlumno,
        getAsignarCursoAlumno,getAllAlumnosForBoleta}
