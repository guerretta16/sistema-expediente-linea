import { useState, useEffect, useContext } from "react";
import Context from "Context/UserContext";
import { useParams } from "react-router-dom";
import { getMesesByCursoNivelMes } from 'Service/CursoNivelMesService';

function useCursoNivelMes(){

    const { jwt } = useContext(Context);
    const { idCargaAcademica } = useParams();
    const [meses, setMeses] = useState([]);
    const [loading, setLoading] = useState(null);
    const [errorPermission, setErrorPermission] = useState(null);
    const [errorLog, setErrorLog] = useState(null);

    const datCarga = {cargaAcademica: idCargaAcademica};

    useEffect(() => {
        setLoading(true);
        setErrorPermission(false);
        setErrorLog(false);
        getMesesByCursoNivelMes({data: datCarga, jwt})
        .then(data => {
            if(data.status){
                if(data.status === 401){
                    setErrorPermission(true);
                    return;
                }
                if(data.status === 403 || data.status === 500){
                    setErrorLog(true);
                    return;
                }
            }
            else{
                setErrorLog(false);
                setErrorPermission(false);
                setLoading(false);
                setMeses(data);
            }
        })
    }, [jwt])

    return {
        meses,
        loading,
        errorPermission,
        errorLog,
        idCargaAcademica
    }
}

export {useCursoNivelMes}