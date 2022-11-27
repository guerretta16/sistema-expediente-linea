import { useNivel } from 'Hooks/useNiveles';
import { useState, useEffect, useContext } from 'react'; 
import {NivelTable} from './NivelTable';
import {FormularioNivel} from './FormularioNivel';
import { AlertMessage } from 'Components/AlertMessage/alertMessage';
import Modal from 'Components/Modal';
import { Loader } from 'Components/Loader';

function Nivel() {

    //Declaración de los UseState
    const [childrenModal, setChildrenModal] =  useState(null);
    const [heightC, setHeigtC] = useState("");
    const [widthC, setWidthC] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { niveles, errorPermission,errorServer, setErrorServer, storeNivel, updateNivel,
            saveSuccess, setLoading, deleteNivel, loading} = useNivel();


    //Funciones.
    function onClose(e)
    {
        // e.preventDefault();
        setShowModal(false);
        setErrorServer(false);
    }

    const handleClick = () => {
        setHeigtC("320px");
        setWidthC("600px");
        setChildrenModal(
            <FormularioNivel onClose = {onClose}
                onStore = {storeNivel}
                errorServer = {errorServer}
                saveSuccess = { saveSuccess }
                loading = { setLoading }
            />
        )
		setShowModal(true);
	}

    const handleClickDelete = (id) => {//Inicio de la función.
        setHeigtC("200px");
        setWidthC("600px");
        const nivelEliminar = niveles[id];
        const dataUpdate = {
            // "codigo_curso": false,//Preguntar
            "id": nivelEliminar.id
        }
        setChildrenModal(
            <AlertMessage 
                title = "Eliminar Nivel"
                descripction = "Desea eliminar el nivel, seleccionado"
                onClose = { onClose }
                onEvent = { deleteNivel }
                dataUpdate = { dataUpdate }
            />
        )
        setShowModal(true)
    }//Fin de la función.

    const verifiedNivel = () => {//Inicio de la función
        return niveles.some((nivel) =>  nivel.codigo_nivel === 1 );
    }//Fin de la función.

    const handleClickUpdate = (id) => {//Inicio de la función.
        setWidthC("600px");
        const nivelUpdate = niveles[id];
        const dataUpdate = {
            "nombre_nivel": nivelUpdate.nombre_nivel,
            "codigo_nivel": nivelUpdate.codigo_nivel,
            "id": nivelUpdate.id
        }
        setChildrenModal(
            <FormularioNivel
                onStore = {updateNivel}
                dataUpdate = {dataUpdate}
                saveSuccess = { saveSuccess }
                onClose = { onClose }
                loading = { setLoading }
            />
        )
        setShowModal(true);
    }//Fin de la función.

    if(loading) {
        return <Loader />

    }

    return (
        <div className = "main">
            <h1 
                className = "text-lg font-bold mt-10 text-center periodo-title"
            >Gestión de Niveles</h1>
            <div className="buttonRegisterContainer mt-5">
                {
                    !verifiedNivel() ? 
                    <button 
                        className="Actividad-btn rounded-lg bg-lime-600 px-10 py-1 
                        text-gray-100 cursor-pointer hover:bg-line-800
                        mt-10"
                        onClick={handleClick}
                    >
                        Registrar Nivel
                    </button>
                    : ""
                }
            </div>

            <NivelTable niveles={niveles} handleClickDelete={handleClickDelete} 
                        handleClickUpdate={handleClickUpdate}>
            </NivelTable>
            {
                showModal ?
                <Modal
                    heightC={heightC} 
                    widthC={widthC} >
                    {childrenModal}
                </Modal>
                :''
            }


        </div>
    )
}

export { Nivel };