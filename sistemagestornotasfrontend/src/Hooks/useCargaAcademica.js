import { useState, useEffect, useContext } from "react";
import Context from "Context/UserContext"
import { useParams } from "react-router-dom";
import {getAllAlumnosFromCarga, getAllAlumnosForBoleta} from 'Service/CargaAcademicaService';
import { data } from "autoprefixer";

function useCargaAcademica () {

    const {jwt} = useContext(Context);
    const {idPeriodo, idCursoNivel} = useParams();
    const [listaAlumnos, setListaAlumnos] = useState([]);
    const [alumnosBoleta, setAlumnosBoleta] = useState([]);
    const [loading, setLoading] = useState(null);
    const [errorPermission, setErrorPermission] = useState(null);
    const [errorLog, setErrorLog] = useState(null);

    const daPer = {
        id_periodo: idPeriodo,
        id_curso_nivel: idCursoNivel
    }

    useEffect(() => {
        setLoading(true);
        setErrorPermission(false);
        getAllAlumnosFromCarga({data:daPer, jwt})
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
                setListaAlumnos(data);
            }
        })
    }, [jwt])

    function consultarAlumnosForBoleta (){
        setErrorLog(false);
        setLoading(true);
        getAllAlumnosForBoleta({idPeriodo})
        .then(data => {
            if(data.length > 0){
                setAlumnosBoleta(data);
                setLoading(false);
            }
            else{
                setErrorLog(true);
                setLoading(false);
            }
        })
    }

    return{
        listaAlumnos,
        alumnosBoleta,
        loading,
        errorLog,
        errorPermission,
        consultarAlumnosForBoleta
    }
}

export {useCargaAcademica}