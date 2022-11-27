function CursoTable({cursos, handleClickDelete, handleClickUpdate})
{
    return (
        <table 
            className= "table-custom text-sm text-left text-gray-500 dark:text-gray-400"
        >
        <thead
            className = "text-xs text-gray-100 uppercase bg-teal-800"
        >
            <tr>
                <th scope = "col" className = "px-6 py-3">Código de Curso</th>
                <th scope = "col" className = "px-6 py-3">Nombre del Curso</th>
                <th scope = "col" className = "px-6 py-3">Opciones</th>
            </tr>
        </thead>

        <tbody className="text-gray-800">
            {
                cursos.map( (curso) => {
                    return (
                        <tr key = {curso.id} 
                            className = "bg-gray-300 border-b py-10"
                        >
                            <th 
                                scope = "row"
                                className = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >{curso.codigo_curso}</th>
                            <td className = "px-6 py-4">{curso.nombre_curso}</td>
                            <td className = "px-6 py-4">
                                        <button 
                                            className = "formCustom__button mx-2"
                                            onClick = {() => handleClickUpdate(curso.index)}
                                        >Editar
                                        </button> 

                                        <button 
                                            className = "formCustom__button formCustom__button--red"
                                            onClick = {() => handleClickDelete(curso.index)}
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

export {CursoTable}