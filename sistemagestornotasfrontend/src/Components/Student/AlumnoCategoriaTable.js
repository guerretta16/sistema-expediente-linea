import { Link } from 'react-router-dom'

function AlumnoCTable({ alumnosCategorias}) {

    return (
        <table
            className="table-custom text-sm text-left text-gray-800 dark:text-gray-400 w-10/12"
        >
            <thead className="text-xs text-gray-100 uppercase bg-gray-50 dark:bg-teal-800 dark:text-gray-100">
                <tr>
                    <th scope="col" className="px-6 py-3">Nombre</th>
                    <th scope="col" className="px-6 py-3">Apellido</th>
                    <th scope = "col" className="px-5 py-3">Categoría</th>
                    {/* <th scope = "col" className="px-5 py-3">Opciones</th> */}
                </tr>
            </thead>
            <tbody className='text-gray-800'>
                {
                    alumnosCategorias.map((alumnoC) => { 
                        return (
                            
                            <tr key={alumnoC.id} className="bg-white border-b dark:bg-gray-300 dark:border-gray-700 py-10">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap"
                                >
                                    {alumnoC.nombre_alumno}
                                </th>
                                <td
                                    className="px-6 py-4"
                                >
                                    {alumnoC.apellido_alumno}
                                </td>
                                <td
                                    className="px-6 py-4"
                                >
                                    {alumnoC.nombre_categoria_alumno}
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>

        </table>
    );
}

export { AlumnoCTable };
