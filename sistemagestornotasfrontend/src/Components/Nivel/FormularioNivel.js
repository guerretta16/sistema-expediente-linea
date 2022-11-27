import { useState, useRef } from 'react';

function FormularioNivel({onClose, loading, dataUpdate, onStore, errorSave, saveSuccess})
{
    const [nombreNivel,setNombreNivel] = useState( () => {
        return dataUpdate ? dataUpdate.nombre_nivel : ""
    });

    const [codigoNivel,setCodigoNivel] = useState( () => {
        return dataUpdate ? dataUpdate.codigo_nivel : ""
    });

    const [messageError, setMessageError] = useState("");
    const dateNombreNivelRef = useRef(null);
    const dateCodigoNivelRef = useRef(null);

    //Funciones.
    function handleChangeNombreNivel(e){

        setNombreNivel(e.target.value);
    }

    function handleChangeCodigoNivel(e){

        setCodigoNivel(e.target.value);
    }

    function handleSubmit(e){
        loading(true);
        e.preventDefault();
        printErrorInput();
        //Inicio del if.
        if(nombreNivel === "" || codigoNivel === "")  {
            setMessageError("Los campos indicados, son obligatorios");
        }//Fin del if
         else {//Inicio del else.
            setMessageError("");
            const data = {
                "nombre_nivel": nombreNivel,
                "codigo_nivel": codigoNivel
            }
            data.id = dataUpdate ? dataUpdate.id: "";
            onStore({data});
            onClose();
            if(errorSave) {
                setMessageError("No se ha podido guardar el Nuevo Nivel");
            }
            if(saveSuccess) {
                setMessageError("Guardado con éxito");
            }
        }//Fin del else
    }

    const printErrorInput = ()=>{
        if(nombreNivel === "") {
            dateNombreNivelRef.current.style.border = "solid 1px red";
        } else {
            dateNombreNivelRef.current.style.border = "";
        }

        if(codigoNivel === "") {
            dateCodigoNivelRef.current.style.border = "solid 1px red";
        } else {
            dateCodigoNivelRef.current.style.border = "";
        }
    }

    return (
        //Inicio del form
        <form
            className = "formCustom"
        >
            <h2 className = "formCustom__title">Registrar Nuevo Nivel</h2>

            <div className = "formCustom__container">
                    <label className = "formCustom__label">Código del Nivel</label>
                    <input
                        className = "formCustom__input"
                        type= "text"
                        onChange={handleChangeCodigoNivel}
                        ref = { dateCodigoNivelRef }
                        value = { codigoNivel }
                    />
            </div>

            <div className = "formCustom__container">
                <label className = "formCustom__label">Nombre del Nivel</label>
                <input
                    className = "formCustom__input"
                    type= "text"
                    onChange={handleChangeNombreNivel}
                    ref = { dateNombreNivelRef }
                    value = { nombreNivel }
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

export {FormularioNivel}