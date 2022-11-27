import { useState, useRef } from 'react';

function FormularioCurso({onClose, loading, dataUpdate, onStore, errorSave, saveSuccess})
{
    const [nombreCurso,SetNombreCurso] = useState( () => {
        return dataUpdate ? dataUpdate.nombre_curso : ""
    });

    const [codigoCurso,setCodigoCurso] = useState( () => {
        return dataUpdate ? dataUpdate.codigo_curso : ""
    });

    /* const [dateNombreCurso, setDateNombreCurso]  = useState(() => {
        return dataUpdate ? dataUpdate.nombre_curso : ""
    });
    const [dateCodigoCurso, setdateCodigoCurso] = useState(() => {
        return dataUpdate ? dataUpdate.codigo_curso : ""
    }); */

    const [messageError, setMessageError] = useState("");
    const dateNombreCursoRef = useRef(null);
    const dateCodigoCursoRef = useRef(null);

    //Funciones.
    function handleChangeNombreCurso(e){

        SetNombreCurso(e.target.value);
    }

    function handleChangeCodigoCurso(e){

        setCodigoCurso(e.target.value);
    }

    function handleSubmit(e){
        console.log("Entra aqui");
        loading(true);
        e.preventDefault();
        printErrorInput();
        if(nombreCurso === "" || codigoCurso === "")  {
            setMessageError("Los campos indicados, son obligatorios");
        }else {
            setMessageError("");
            const data = {
                "nombre_curso": nombreCurso,
                "codigo_curso": codigoCurso
            }
            data.id = dataUpdate ? dataUpdate.id: "";
            onStore({data});
            onClose();
            if(errorSave) {
                setMessageError("No se ha podido guardar el Nuevo Curso");
            }
            if(saveSuccess) {
                setMessageError("Guardado con éxito");
            }
        }
    }

    const printErrorInput = ()=>{
        if(nombreCurso === "") {
            dateNombreCursoRef.current.style.border = "solid 1px red";
        } else {
            dateNombreCursoRef.current.style.border = "";
        }

        if(codigoCurso === "") {
            dateCodigoCursoRef.current.style.border = "solid 1px red";
        } else {
            dateCodigoCursoRef.current.style.border = "";
        }
    }

    return (
        //Inicio del form
        <form
            className = "formCustom"
        >
            <h2 className = "formCustom__title">Registrar Nuevo Curso</h2>

            <div className = "formCustom__container">
                    <label className = "formCustom__label">Código del Curso</label>
                    <input
                        className = "formCustom__input"
                        type= "text"
                        onChange={handleChangeCodigoCurso}
                        ref = { dateCodigoCursoRef }
                        value = { codigoCurso }
                    />
            </div>

            <div className = "formCustom__container">
                <label className = "formCustom__label">Nombre del Curso</label>
                <input
                    className = "formCustom__input"
                    type= "text"
                    onChange={handleChangeNombreCurso}
                    ref = { dateNombreCursoRef }
                    value = { nombreCurso }
                />
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
                >Aceptar</button>
                <button
                    className = "formCustom__button formCustom__button--red"
                    onClick={onClose}
                >Cancelar</button>
            </div>
        </form>//Fin del form

);
}

export {FormularioCurso}