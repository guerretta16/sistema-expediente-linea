/**
 * @author JS Martinez
 */
import { useState, useRef } from 'react';
function Formulario({onClose, onStore, errorSave, dataUpdate, saveSuccess, loading}) {

    const [dateStart, setDateStart]  = useState(() => {
        return dataUpdate ? dataUpdate.fechaInicio : ""
    });
    const [dateEnd, setDateEnd] = useState(() => {
        return dataUpdate ? dataUpdate.fechaFin : ""
    });
    const [messageError, setMessageError] = useState("");
    const dateStartRef = useRef(null);
    const dateEndRef = useRef(null);



    const handleChangeDateStart = (e) => {
        setDateStart(e.target.value);
    }

    const handleChangeDateEnd = (e) => {
        setDateEnd(e.target.value);
    }

    const handleSubmit = (e) => {
        loading(true);
        e.preventDefault();
        printErrorInput();
        if(dateStart === "" || dateEnd === "")  {
            setMessageError("No puede dejar campos vacios");
        } else {
            setMessageError("");
            const data = {
                "fechaInicio": dateStart,
                "fechaFin": dateEnd
            }
            data.id = dataUpdate ? dataUpdate.id: "";
            onStore({data});
            onClose();
            if(errorSave) {
                setMessageError("No se ha podido guardar el periodo");
            } 
            if(saveSuccess) {
                setMessageError("Guardado con exito");
            }
        }
    }
    const printErrorInput = () => {
        if(dateStart === "") {
            dateStartRef.current.style.border = "solid 1px red";
        } else {
            dateStartRef.current.style.border = "";
        }
        
        if(dateEnd === "") {
            dateEndRef.current.style.border = "solid 1px red";
        } else {
            dateEndRef.current.style.border = "";
        }

    }

    return (
        <form 
            className = "formCustom"
        >
            <h2 className = "formCustom__title">Registro Nuevo Periodo</h2>
            <div className = "formCustom__container">
                <label className = "formCustom__label">Fecha de Inicio</label>
                <input 
                    className = "formCustom__input"
                    type= "date"
                    onChange={handleChangeDateStart}
                    ref = { dateStartRef }
                    value = { dateStart }
                />
            </div>
            <div className = "formCustom__container">
                <label className = "formCustom__label">Fecha de Fin</label>
                <input 
                    className = "formCustom__input"
                    type= "date"
                    onChange={handleChangeDateEnd}
                    ref = { dateEndRef }
                    value = { dateEnd }
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
        </form>

    );
}

export { Formulario };
