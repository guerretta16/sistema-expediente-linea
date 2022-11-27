import { useEffect, useContext, useState } from 'react';
import Context from 'Context/UserContext';
import { getAllDocentes, storeDocente } from 'Service/docenteService';

function useDocente() {

    const { jwt } = useContext(Context);
    const [docentes, setDocentes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect( () => {
        setLoading(true);
        getAllDocentes( { jwt } )
        .then(response => {
            if(response.status === 500 || response.status === 401 || response.status === 403) {
                setError(true);
                setLoading(false);
                return;
            }

            return response.json();
        })
        .then(data => {
            if(data.length > 0) {
                setDocentes(data);
                setError(false);
                setLoading(false);
            }
        })
    }, [saveSuccess])

    const newDocente = ({ data }) => {
        setLoading(true);
        setError(false);
        storeDocente({ jwt, data})
        .then(res => {
            if(res.status === 200)
            {
                setSaveSuccess(true);
                setLoading(false);
            }
            else{
                setLoading(false);
                setSaveSuccess(false);
                setError(true);
            }
        })
    }

    return {
        docentes,
        newDocente,
        error,
        loading,
        saveSuccess
    }
}

export { useDocente };