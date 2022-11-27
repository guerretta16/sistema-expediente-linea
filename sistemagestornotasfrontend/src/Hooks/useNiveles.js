import { useState, useEffect, useContext } from "react";
import { getAllNivels, storeNiveles, updateNiveles, deleteNiveles } from "Service/NivelService";
import Context from "Context/UserContext";

function useNivel() {
    const {jwt} = useContext(Context);

    const [niveles, setNiveles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorPermission, setErrorPermission] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllNivels({jwt})
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
            data.forEach( (ni, index) => {
                ni.index= index;
                return data;
            })
            setNiveles(data);
            setLoading(false);
        });
    }, [jwt, setErrorPermission, setLoading, setNiveles, updateData]);

    const getNivel = () => {
        setLoading(true);
        getAllNivels({ jwt })
        .then((data) => {
            if(data.status) {
                if(data.status === 401) {
                    setErrorPermission(true);
                }
            }else {
                data.forEach((ni, index) => {
                    ni.index = index
                    return data;
                }) 
                setNiveles(data);
                setLoading(false);
            }
        });

    }

    const storeNivel = ({data})=>{
        storeNiveles({data, jwt})
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
                setUpdateData(!updateData);
            }
        })
    }

    const updateNivel =({data}) => {
        setLoading(true);
        updateNiveles({data,jwt})
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
            if(data.message === 'Ok'){
                setLoading(false);
                setSaveSuccess(true);
                setUpdateData(!updateData);
            }
        })
    }

    const deleteNivel = ({data, onClose} ) =>{
        deleteNiveles({data, jwt})
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
            setUpdateData(!updateData);
            onClose();
            setLoading(false);
            setSaveSuccess(true);

        })
    }

    return {
        niveles,
        loading,
        errorServer,
        errorPermission,
        saveSuccess,
        setNiveles,
        setLoading,
        setErrorPermission,
        setSaveSuccess,
        setErrorServer,
        getNivel,
        storeNivel,
        updateNivel,
        deleteNivel
    }
}

export {useNivel};
