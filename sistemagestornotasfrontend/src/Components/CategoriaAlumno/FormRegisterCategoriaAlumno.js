import { useState } from 'react';

function FormRegisterCategoriaAlumno({onClose, onEvent, dataUpdate}) {
    const [codigoCategoria, setCodigoCategoria] = useState(dataUpdate ? dataUpdate.codigo_categoria_alumno : "");
    const [nombreCategoria, setNombreCategoria] = useState(dataUpdate ? dataUpdate.nombre_categoria_alumno : "");
    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChangeCodigoCategoria = (e) => {
        setCodigoCategoria(e.target.value.toUpperCase());
    }

    const handleChangeNombreCategoria = (e) => {
        setNombreCategoria(e.target.value);
    }

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        if(codigoCategoria === "" || nombreCategoria === "") {
            setMessageError("Hay campos vacios");
        } else {
            const dataSend = {
                "codigo_categoria_alumno": codigoCategoria,
                "nombre_categoria_alumno": nombreCategoria
            }
            if(dataUpdate) {
                dataSend.id = dataUpdate.id;
            }
            onEvent({dataSend})
            .then(response => {
                if(response.type === 1) {
                    setMessageError(response.description);
                }
                setLoading(false);
            })

        }
    }

    return (
        <form
            className='formCustom'
        >
            <h2 className='formCustom__title'>Registrar Nueva Categoría Alumno</h2>
            <div className='formCustom__container'>
                <label className='formCustom__label'>Codigo Categoría</label>
                <input 
                    className='formCustom__input'
                    type= "text"
                    value = { codigoCategoria }
                    onChange = { handleChangeCodigoCategoria }
                />
            </div>
            <div className = "formCustom__container">
                <label className = "formCustom__label">Nombre Categoría</label>
                <input 
                    className = "formCustom__input"
                    type= "text"
                    value = {nombreCategoria}
                    onChange = {handleChangeNombreCategoria}
                />
            </div>
            <div>
                {
                    <>
                        <p className = "formCustom__error">{ messageError }</p>
                    </>
                }
            </div>
            <div className='formCustom__container--button'>
                <button 
                    className = 'formCustom__button'
                    onClick={handleSubmit}
                >
                        {
                            loading ? 'Cargando...' : 'Aceptar'
                        }
                </button>
                <button 
                    onClick={ onClose }
                    className = 'formCustom__button formCustom__button--red'
                    >
                        Cancelar
                </button>
            </div>
        </form>

    );
}

export {FormRegisterCategoriaAlumno};