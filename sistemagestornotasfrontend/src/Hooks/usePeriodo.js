/**
 * @author JS Martinez
 */
import { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';

import {
    getAllPeriod, 
    storeOnePeriod, 
    updateOnePeriodo, 
    changeStatePeriod,
    getPeriodoByUsers
} from 'Service/periodoService';
import Context from 'Context/UserContext';


function usePeriodo() {

    const { jwt } = useContext(Context);
    const navigate = useNavigate();
    const [periodo, setPeriodo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorPermission, setErrorPermission] = useState(false);
    const [errorSave, setErrorSave] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPeriodosByUser({ jwt });
    }, [jwt, setErrorPermission, setLoading, setPeriodo, updateData])
    
    const getPeriod = () => {
        setLoading(true);
        getAllPeriod({ jwt })
        .then((data) => {
            if(data.status) {
                if(data.status === 401) {
                    navigate('/login');
                }
            }else {
                data.forEach((da, index) => {
                    da.index = index
                    return data;
                }) 
                setPeriodo(data);
                setLoading(false);
            }
        });

    }


    const storePeriod = ({data}) => {
        setLoading(true);
        storeOnePeriod({data, jwt})
        .then(data => {
            if(data.status === 500) {
                setErrorSave(true);
                return;
            }
            if(data.status === 401) {
                navigate('/login');
                return;
            }
            if(data.status === 403) {
                navigate('/error403');
                return;
            }
            setErrorPermission(false);
            setSaveSuccess(true);
            return data.json()
        })
        .then(data => {
            if(data.message === 'Ok') {
                setLoading(false)
                setSaveSuccess(true);
                setUpdateData(!updateData);
            }
        });
    };

    const updatePeriod = ({data}) => {
        setLoading(true);
        updateOnePeriodo({data, jwt})
        .then(data => {
            if(data.status === 500) {
                setSaveSuccess(false);
                setErrorSave(true);
                return;
            }
            if(data.status === 401) {
                navigate('/login')
                return;
            }
            if(data.status === 401) {
                navigate('/error403')
                return;
            }
            setErrorPermission(false);
            setErrorSave(false);
            setSaveSuccess(true);
            return data.json();
        })
        .then(data => {
            if(data.message === 'Ok') {
                setLoading(false);
                setSaveSuccess(true);
                setUpdateData(!updateData);
            }
        })
    }

    const changeState = ({ data, onClose }) => {

        changeStatePeriod({ data, jwt })
        .then(data => {

            if(data.status === 500) {
                setSaveSuccess(false);
                setErrorSave(true);
                return;
            }
            if(data.status === 401) {
                navigate('/login');
            }
            if(data.status === 403) {
                navigate('/error403');
            }
            setErrorPermission(false);
            setErrorSave(false);
            setSaveSuccess(true);
            return data.json();
        })
        .then(data => {
            if(data.message === 'Ok') {
                setLoading(false);
                setSaveSuccess(true);
                setUpdateData(!updateData);
                onClose()
            }
        })
    }

    const getPeriodosByUser = ({ jwt }) => {
        setLoading(true)
        getPeriodoByUsers({ jwt })
        .then(response => {
            if(response.status === 401) {
                navigate('/login');
            }
            if(response.status === 403) {
                navigate('/error403');
            }
            if(response.status === 500) {
                setErrorSave(true);
                setSaveSuccess(false);
                return;
            }
            return response.json();
        })
        .then(data => {
            setPeriodo(data);
            setLoading(false);
        });
    }
    

    return {
        periodo,
        loading,
        errorPermission,
        storePeriod,
        errorSave,
        setErrorSave,
        updatePeriod,
        saveSuccess,
        setLoading,
        setPeriodo,
        getPeriod,
        changeState,
        getPeriodosByUser
    }

}
export {usePeriodo};
