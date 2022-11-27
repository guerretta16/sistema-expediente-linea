import { useState, useContext, useEffect } from 'react'
import Context from 'Context/UserContext';
import { getAllCursos, storeCursos, updateCursos, deleteCursos } from 'Service/CursoService'

function useCurso() {

    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorPermission, setErrorPermission] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [updateDate, setUpdateData] = useState(false);
    const { jwt } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        getAllCursos({ jwt })
        .then(response => {
            if(response.status === 500) {
                setErrorServer(true);
            }
            if(response.status === 401) {
                setErrorServer(true);
            }
            if(response.status === 403) {
                setErrorServer(true);
            }
            return response.json();
        })
        .then(data => {
            data.forEach( (cu, index) => {
                cu.index= index;
                return data;
            })
            setCursos(data);
            setLoading(false);
        });

    }, [jwt, setErrorPermission, setLoading, setCursos, updateDate]);

    const getCurso = () =>{
        setLoading(true);
        getAllCursos({jwt})
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
                setCursos(data);
                setLoading(false);
            }
        });
    }

    const storeCurso = ({data})=>{
        storeCursos({data, jwt})
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

    const updateCurso =({data}) => {
        updateCursos({data,jwt})
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

    const deleteCurso = ({data, onClose}) =>{
        deleteCursos({data, jwt})
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
            console.log(updateCurso);
            setUpdateData(!updateDate);
            console.log(updateCurso);
            onClose()
        })
    }

    return {
        cursos,
        errorServer,
        loading,
        errorPermission,
        saveSuccess,
        setCursos,
        setLoading,
        setErrorServer,
        setErrorPermission,
        setSaveSuccess,
        getCurso,
        storeCurso,
        updateCurso,
        deleteCurso
    }


}

export { useCurso}