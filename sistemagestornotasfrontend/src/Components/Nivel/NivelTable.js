function NivelTable({niveles, handleClickDelete, handleClickUpdate})
{
    return (
        <table 
            className= "table-custom text-sm text-left text-gray-500 dark:text-gray-400"
        >
        <thead
            className = "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr>
                <th scope = "col" className = "px-6 py-3">Código de Nivel</th>
                <th scope = "col" className = "px-6 py-3">Nombre del Nivel</th>
                <th scope = "col" className = "px-6 py-3">Opciones</th>
            </tr>
        </thead>

        <tbody>
            {
                niveles.map( (nivel) => {
                    return (
                        <tr key = {nivel.id} 
                            className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 py-10"
                        >
                            <th 
                                scope = "row"
                                className = "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                            >{nivel.codigo_nivel}</th>
                            <td className = "px-6 py-4">{nivel.nombre_nivel}</td>
                            <td className = "px-6 py-4">
                                        <button 
                                            className = "formCustom__button mx-2"
                                            onClick = {() => handleClickUpdate(nivel.index)}
                                        >Editar
                                        </button> 

                                        <button 
                                            className = "formCustom__button formCustom__button--red"
                                            onClick = {() => handleClickDelete(nivel.index)}
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

export {NivelTable}