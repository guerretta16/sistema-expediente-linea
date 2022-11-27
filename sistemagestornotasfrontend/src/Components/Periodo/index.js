/**
 * @author JS Martinez
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { Formulario } from './formulario';
import { usePeriodo } from 'Hooks/usePeriodo';
import { AlertMessage } from '../AlertMessage/alertMessage';
import { PeriodTable } from './periodTable';
import Modal from 'Components/Modal';
import { Loader } from 'Components/Loader';

import "./index.css";

function Periodo() {
    const [showModal, setShowModal] = useState(false);

    const { periodo, errorPermission, 
        storePeriod, errorSave, setErrorSave, updatePeriod, 
        saveSuccess, setLoading, changeState, loading} = usePeriodo();
    const [childrenModal, setChildrenModal] =  useState(null);
    const [heightC, setHeigtC] = useState("");
    const [widthC, setWidthC] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(errorPermission) {
            navigate('/error403');
        }
    },[errorPermission, navigate]);


    const handleClick = () => {
        setHeigtC("320px");
        setWidthC("600px");
        setChildrenModal(
            <Formulario onClose = {onClose}
                onStore = {storePeriod}
                errorSave = {errorSave}
                saveSuccess = { saveSuccess }
                loading = { setLoading }
            />
        )
        setShowModal(true);
    }

    const handleClickDelete = (id) => {
        setHeigtC("200px");
        setWidthC("600px");
        const periodoActive = periodo[id];
        const dataUpdate = {
            "periodActive": false,
            "id": periodoActive.id
        }
        setChildrenModal(
            <AlertMessage 
                title = "Cierre de periodo" 
                descripction = "Desea cerrar el periodo evaluativo actual" 
                onClose = { onClose }
                onEvent = { changeState }
                dataUpdate = { dataUpdate }
            />
        )
        setShowModal(true)
    }

    const verifiedPeriodActive = () => {
        return periodo.some((peri) =>  peri.activo_periodo === 1 );
    }

    const handleClickUpdate = (id) => {
        setHeigtC("320px");
        setWidthC("600px");
        const periodUpdate = periodo[id];
        const dataUpdate = {
            "fechaFin": periodUpdate.fecha_fin_periodo,
            "fechaInicio": periodUpdate.fecha_inicio_periodo,
            "id": periodUpdate.id
        }
        setChildrenModal(
            <Formulario 
                onStore = {updatePeriod}
                dataUpdate = {dataUpdate}
                saveSuccess = { saveSuccess }
                onClose = { onClose }
                loading = { setLoading }
            />
        )
        setShowModal(true);
    }

    const onClose = () => {
        setShowModal(false);
        setErrorSave(false);
    }
    if(loading) {
        return <Loader />
    }

    return (
        <div className="main">
            {
                showModal ? 
                    <Modal 
                        heightC = {heightC}
                        widthC = {widthC}
                    >
                        {childrenModal}
                    </Modal> : 
                ""
            }
            <h1 
                className = "text-lg font-bold mt-10 text-center periodo-title"
            >Gestión de periodos</h1>
            <div className= "buttonRegisterContainer mt-5">
                
                {
                    !verifiedPeriodActive() ? 
                    <button 
                        className="Actividad-btn rounded-lg bg-lime-600 px-10 py-1 
                        text-gray-100 cursor-pointer hover:bg-line-800
                        mt-10 btn-periodo"
                        onClick={handleClick}
                    >
                        Registrar
                    </button>
                    : ""
                }
            </div>
            <PeriodTable 
                handleClickDelete = { handleClickDelete }
                handleClickUpdate = { handleClickUpdate }
                periodo = {periodo}
            />
        </div>
    );
}
export { Periodo };
