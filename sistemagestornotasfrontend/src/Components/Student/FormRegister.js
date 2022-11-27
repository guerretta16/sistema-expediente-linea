import { useState } from 'react';
import example from 'assets/image/excel-ex.png';

function FormRegister( { onClose, handleInsert } ) {

    const [file, setFile] = useState(null);

    return (
        <div className='py-8'>
            <div className='formCustom__container'>
                <label className='text-sm text-center block'>Seleccione un archivo .xlsx o .xls. Debe cumplir con el siguiente formato:</label>
                <label className='text-xs text-center block'><b>id_categoria_alumno:</b> 1 ordinario ó 2 olimpico</label>
                <img src={example} className="px-3 py-8" />
                <input 
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                    type = "file"
                    className='block m-auto text-sm'
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,text/comma-separated-values, text/csv, application/csv"
                />
            </div>
            <div className = "formCustom__container--button">
                <button

                    onClick={() => handleInsert({data: file})}
                    className = "formCustom__button"
                >Aceptar</button>
                <button
                    onClick={ onClose }
                    className = "formCustom__button formCustom__button--red"
                >Cancelar</button>
            </div>
        </div>
    )

}

export {
    FormRegister
}