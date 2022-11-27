import { useCurso } from 'Hooks/useCurso';
import { useState, useEffect, useContext } from 'react'; 
import {CursoTable} from './CursoTable';
import {FormularioCurso} from './FormularioCurso';
import { AlertMessage } from 'Components/AlertMessage/alertMessage';
import Modal from 'Components/Modal';
import { Loader } from 'Components/Loader';

function Curso() {

    //Declaración de los UseState
    const [childrenModal, setChildrenModal] =  useState(null);
    const [heightC, setHeigtC] = useState("");
    const [widthC, setWidthC] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { cursos, errorPermission,errorServer, setErrorServer, storeCurso, updateCurso,
            saveSuccess, setLoading, deleteCurso, loading} = useCurso();

    function onClose(e)
    {
        setShowModal(false);
        setErrorServer(false);
    }

    const handleClick = () => {
        setHeigtC("320px");
        setWidthC("600px");
        setChildrenModal(
            <FormularioCurso onClose = {onClose}
                onStore = {storeCurso}
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
        const cursoEliminar = cursos[id];
        const dataUpdate = {
            // "codigo_curso": false,//Preguntar
            "id": cursoEliminar.id
        }
        setChildrenModal(
            <AlertMessage 
                title = "Eliminar Curso"
                descripction = "Desea eliminar el curso, seleccionado"
                onClose = { onClose }
                onEvent = { deleteCurso }
                dataUpdate = { dataUpdate }
            />
        )
        setShowModal(true)
    }//Fin de la función.

    const verifiedCurso = () => {//Inicio de la función
        return cursos.some((curso) =>  curso.codigo_curso === 1 );
    }//Fin de la función.

    const handleClickUpdate = (id) => {//Inicio de la función.
        setWidthC("600px");
        const cursoUpdate = cursos[id];
        const dataUpdate = {
            "nombre_curso": cursoUpdate.nombre_curso,
            "codigo_curso": cursoUpdate.codigo_curso,
            "id": cursoUpdate.id
        }
        setChildrenModal(
            <FormularioCurso
                onStore = {updateCurso}
                dataUpdate = {dataUpdate}
                saveSuccess = { saveSuccess }
                onClose = { onClose }
                loading = { setLoading }
            />
        )
        setShowModal(true);
    }//Fin de la función.

	/* const onClose = () => {//Inicio de la función.
		setShowModal(false);
		setErrorServer(false);
	}//Fin de la función. */

    if(loading) {
        return <Loader />
    }

    return (
        <div className = "main">
            <h1 
                className = "text-lg font-bold mt-10 text-center periodo-title"
            >Gestión de Cursos</h1>
            <div className="buttonRegisterContainer mt-5">
                {
                    !verifiedCurso() ? 
                    <button 
                        className="Actividad-btn rounded-lg bg-lime-600 px-10 py-1 
                        text-gray-100 cursor-pointer hover:bg-line-800
                        mt-10"
                        onClick={handleClick}
                    >
                        Registrar Curso
                    </button>
                    : ""
                }
            </div>

            <CursoTable cursos={cursos} handleClickDelete={handleClickDelete} 
                        handleClickUpdate={handleClickUpdate}>
            </CursoTable>
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

export { Curso };