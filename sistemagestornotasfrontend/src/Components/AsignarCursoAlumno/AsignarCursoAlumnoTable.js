function AsignarCursoTable({register, handleClickDelete, handleClickUpdate})
{
    return (
        <table 
            className= "table-custom text-sm text-left text-gray-500 dark:text-gray-400"
        >
        <thead
            className = "text-xs text-gray-100 uppercase bg-teal-800"
        >
            <tr>
                {/*<th scope = "col" className = "px-6 py-3">Código de Curso</th>*/}                
                <th scope = "col" className = "px-6 py-3">Nombre del Alumno</th>
                <th scope = "col" className = "px-6 py-3">Curso Asignado</th>
                <th scope = "col" className = "px-6 py-3">Opciones</th>
            </tr>
        </thead>

        <tbody className="text-gray-800">
            {
                register.map( (alumnoCursoAsignado) => {
                    return (
                        <tr key = {alumnoCursoAsignado.id} 
                            className = "bg-gray-300 border-b py-10"
                        >
                            
                            <td className = "px-6 py-4">{alumnoCursoAsignado.nombre_alumno}</td>
                            <td className = "px-6 py-4">{alumnoCursoAsignado.nombre_curso}</td>
                            <td className = "px-6 py-4"> 

                                        <button 
                                            className = "formCustom__button formCustom__button--red"
                                            onClick = {() => handleClickDelete(alumnoCursoAsignado.index)}
                                        >Eliminar
                                        </button>
                            </td>
                        </tr>

                    );
                })
            }
        </tbody>
    </table>
    );
}

export {AsignarCursoTable}