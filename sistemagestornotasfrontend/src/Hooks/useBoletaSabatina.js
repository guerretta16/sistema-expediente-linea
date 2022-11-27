import { useState, useContext, useEffect } from "react";
import Context from "Context/UserContext";
import { useParams } from "react-router-dom";
import { consultarBoletaSabatina } from "Service/BoletaSabatinaService";

function useBoletaSabatina(){
    const { jwt } = useContext(Context);
    const {idPeriodo, idAlumno} = useParams();
    const [boleta, setBoleta] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    function getBoletaSabatina (){
        setError(false);
        setLoading(true);
        consultarBoletaSabatina({jwt, idPeriodo, idAlumno})
        .then(data => {
            setBoleta(data);
            setError(false);
            setLoading(false);
        });
    }

    return {
        boleta,
        error,
        loading,
        getBoletaSabatina
    }
}

export { useBoletaSabatina }