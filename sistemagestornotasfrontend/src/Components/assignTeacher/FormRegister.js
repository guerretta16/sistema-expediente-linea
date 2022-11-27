/**
 * @author JS Martinez
 */
import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { rolesDocente } from 'Service/RoleTeacher';
import { useDocente } from 'Hooks/useDocente';

function FormRegister( { dataUpdate, onEvent, onClose, title } ) {

    const { docentes } = useDocente();
    const  { idPeriodo, idCursoNivel }  = useParams();
    const [docente, setDocente] = useState( () =>  dataUpdate ? dataUpdate.idDocente: "" );
    const [rolDocente, setRolDocente] = useState( () => dataUpdate ? dataUpdate.rol: "");

    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit =  (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            "idNivelCurso": idCursoNivel,
            "idPeriodo": idPeriodo,
            "rol": rolDocente,
            "idDocente": docente,
            "id": dataUpdate ? dataUpdate.id: ""
        }
        if(rolDocente === "" && docente === "") {
        } else {
            onEvent({ data })
                .then(data => {
                    if(data.type === "Error") {
                        setMessageError(data.descripcion);
                        setLoading(false);
                    }
                    if(data.type === "Ok") {
                        setMessageError("");
                        setLoading(false);
                    }
                });
        }
    }


    const onChangeRolSelect = (e) => {
        setRolDocente(e.target.value)
    }

    const onChangeDocente = (e) => {
        setDocente(e.target.value);
    }

    return (

        <form 
            className = "formCustom"
        >
            <h2 className = "formCustom__title">{ title }</h2>
            <div className = "formCustom__container">
                <label className = "formCustom__label">Docente</label>
                <select value={docente} onChange = { onChangeDocente } className = "formCustom__input">
                    <option disabled value = "">--Selected--</option>
                    {
                        docentes.map( (docente) => (
                            <option value = { docente.id } key = {docente.id}> { docente.nombre_profesor }</option>
                        ))
                    }
                </select>
            </div>
            <div className = "formCustom__container">
                <label className = "formCustom__label">Rol</label>
                <select value = { rolDocente } onChange = {onChangeRolSelect} className = "formCustom__input">
                    <option disabled value = "">--Selected--</option>
                    {
                        rolesDocente.map( (rol) => (
                            <option value = { rol.value } key = { rol.id }>{rol.nombre}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                {
                    <>
                    <p className = "formCustom__error">{ messageError }</p>
                    </>
                }
            </div>
            <div className = "formCustom__container--button">
                <button
                    onClick={handleSubmit}
                    className = "formCustom__button"
                >
                    {
                        loading ? "Cargando...": "Aceptar"
                    }
                </button>
                <button
                    className = "formCustom__button formCustom__button--red"
                    onClick={onClose}
                >Cancelar</button>
            </div>
        </form>
    );
}

export { FormRegister }
