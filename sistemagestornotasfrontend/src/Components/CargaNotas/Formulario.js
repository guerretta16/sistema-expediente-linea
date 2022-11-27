import React, {useState} from "react";
import './Formulario.css';

function Formulario ({meses, mes, idCargaAcademica, idLinea, onClose, onStore, messageLog, loading}) {

    const [dataForm, setDataForm] = useState({
        id_carga_academica: idCargaAcademica,
        id_linea_actividad: idLinea,
        id_curso_nivel_mes: "",
        nota: 0.00
    })

    const [nomMes, setNomMes] = useState("");

    function handleClick(){
        onStore(dataForm);
    }

    function handleChange(e){
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    React.useEffect(() => {
        meses && meses.map(mesInfo => (
            mes.toString() === mesInfo.id_mes.toString() && setDataForm({...dataForm, "id_curso_nivel_mes": mesInfo.id})
        ))
        meses && meses.map(mesInfo => (
            mes.toString() === mesInfo.id_mes.toString() && setNomMes(mesInfo.meses[0].nombre_mes)
        ))
    }, [])

    return(
        <form className="Form-notas">
            <h2 className="Form-title">Registro de nota</h2>
            <div className="Form-group">
                <label className="Form-input block font-semibold">
                    {
                        nomMes != "" ? nomMes : ""
                    }
                </label>
            </div>
            <div className="Form-group">
                <input type="text" className="Form-input" name="nota" onChange={handleChange} placeholder="Ingrese la nota"/>
            </div>
            <div className="Form-group">
                <p className="errorMesage">{messageLog?messageLog:""}</p>
            </div>
            <div className="Form-group btn-group">
                <button type="button" className="Form-btn btn-gr" onClick={handleClick}>{loading?"Cargando...":"Guardar"}</button>
                <button type="button" className="Form-btn btn-cn" onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );

}

export {Formulario}