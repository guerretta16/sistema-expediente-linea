import { useState, useEffect, useContext } from "react";
import Context from "Context/UserContext"
import { useParams } from "react-router-dom";
import {deleteAsignarCursoAlumno, getAsignarCursoAlumno, storeAsignarCursoAlumno, updateAsignarCursoAlumno} from 'Service/CargaAcademicaService';

function useCargaAcademicaAlumno () {

    const {jwt} = useContext(Context);
    const {idPeriodo, idCursoNivel,idAlumno} = useParams();
    const [loading, setLoading] = useState(null);
    const [errorPermission, setErrorPermission] = useState(null);
    const [errorLog, setErrorLog] = useState(null);
    const [alumnosCursos,setAlumnosCursos] = useState([]);
    const [errorServer, setErrorServer] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [updateDate, setUpdateData] = useState(false);

    const daPer2 = {
        id_periodo: idPeriodo,
        id_curso_nivel: idCursoNivel,
        id_alumno: idAlumno,
    }

    useEffect(() => {
        setLoading(true);
        setErrorPermission(false);
        //Obtener alumnos de los cursos asignados
        getAsignarCursoAlumno({jwt, data:daPer2})
        .then(data => {
            if(data.status){
                if(data.status === 401){
                    setErrorPermission(true);
                    return;
                }
                if(data.status === 500){
                    setErrorLog(true);
                    return;
                }
            }
            else {
                setLoading(false);
                setErrorLog(false);
                setErrorPermission(false);
                data.forEach((da, index) => (da.index = index));
                setAlumnosCursos(data);
            }
        })

    }, [jwt])
    //Función GET
    const getCursoAlumno = () =>{
        setLoading(true);
        getAsignarCursoAlumno({jwt, data:daPer2})
        .then ( (data) => {
            if(data.status){
                if(data.status === 401){
                    setErrorPermission(true);
                }
            }else{
                data.forEach( (cu, index) => {
                    cu.index= index;
                    return data;
                })
                setAlumnosCursos(data);
                setLoading(false);
            }
        });
    }
    //Función Store
    const storeCursoAlumno = ({data})=>{
        storeAsignarCursoAlumno({data:daPer2, jwt})
        .then( (data) =>{
            if(data.status === 500){
                setErrorServer(true);
                return;
            }
            
            if(data.status === 401){
                setErrorPermission(true);
                return;
            }
            
            setErrorPermission(false);
            setSaveSuccess(true);
            return data.json();
        })
        .then(data => {
            if(data.message === 'Ok'){
                setLoading(false);
                setSaveSuccess(true);
                setUpdateData(!updateDate);
            }
        })
    }
    //Función Update
    const updateCursoAlumno =({data}) => {
        updateAsignarCursoAlumno({data:daPer2,jwt})
        .then( (data) => {
            if(data.status === 500){
                setSaveSuccess(false);
                setErrorServer(true);
                return;
            }
            if( data.status === 401){
                setSaveSuccess(false);
                setErrorPermission(true);
                return;
            }

            setErrorPermission(false);
            setErrorServer(false);
            setSaveSuccess(true);
            return data.json();
        })
        .then( (data) => {
            console.log("Prueba");
            if(data.message === 'Ok'){
                console.log(loading)
                setLoading(false);
                console.log(loading)
                setSaveSuccess(true);
                setUpdateData(!updateDate);
            }
        })
    }
    //Función Delete
    const deleteCursoAlumno = ({data, onClose}) =>{
        deleteAsignarCursoAlumno({jwt,data:daPer2})
        .then (data => {
            if(data.status === 500){
                setSaveSuccess(false);
                setErrorServer(true);
                return;
            }
            if(data.status === 401){
                setSaveSuccess(false);
                setErrorPermission(true);
                return;
            }
            setErrorPermission(false);
            setErrorServer(false);
            setSaveSuccess(true);
            return data.json();
        })
        .then( (data) => {
            setLoading(false);
            setSaveSuccess(true);
            setUpdateData(!updateDate);
            onClose()
        })
    }

    return{
        loading,
        errorLog,
        errorPermission,
        alumnosCursos,
        errorServer,
        saveSuccess,
        setAlumnosCursos,
        setLoading,
        setErrorServer,
        setErrorPermission,
        setSaveSuccess,
        getCursoAlumno,
        storeCursoAlumno,
        updateCursoAlumno,
        deleteCursoAlumno
    }
}

export {useCargaAcademicaAlumno}