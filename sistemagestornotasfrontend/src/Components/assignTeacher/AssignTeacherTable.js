/**
 * @author JS Martinez
 */

function AssignTeacheTable({ register, handleClickDelete, handleClickUpdate }) {

    const handleClickTable = (e) => {
        if(e.target.getAttribute('op') === 'edit') {
            handleClickUpdate(e.target.getAttribute('index'));
        }
        if(e.target.getAttribute('op') === 'delete') {
            handleClickDelete(e.target.getAttribute('index'));
        }
    }
    return (
        <table 
            onClick = { handleClickTable }
            className= "table-custom text-sm text-left text-gray-500 dark:text-gray-400"
            id = "table"
        >
        <thead
            className = "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr>
                <th scope = "col" className = "px-6 py-3">Nombre docente</th>
                <th scope = "col" className = "px-6 py-3">Dui</th>
                <th scope = "col" className = "px-6 py-3">Rol</th>
                <th scope = "col" className = "px-6 py-3">Accion</th>
            </tr>
        </thead>
        <tbody>
            {
                register.map( (register) => {
                    return (
                        <tr key = {register.id} 
                            className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 py-10"
                        >
                            <th 
                                scope = "row"
                                className = "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                            >
                                {register.profesor.nombre_profesor}
                            </th>
                            <td className = "px-6 py-4">{register.profesor.dui_profesor}</td>
                            <td className = "px-6 py-4">{register.rol}</td>
                            <td className = "px-6 py-4">
                                {
                                    register.activo === 1 ?
                                    <>
                                        <button 
                                            op = "edit"
                                            index = { register.index }
                                            className = "formCustom__button mx-2"
                                        >Editar</button> 
                                        <button 
                                            op = "delete"
                                            index = {register.index}
                                            className = "formCustom__button formCustom__button--red"
                                        >Eliminar</button> 
                                    </>: ""
                                }
                            </td>
                        </tr>

                    );
                })
            }
        </tbody>
    </table>
    );

}

export {AssignTeacheTable};
