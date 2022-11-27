import { Link } from 'react-router-dom'

function StudentTable({ students, handleDelete }) {

    return (
        <table
            className="table-custom text-sm text-left text-gray-800 dark:text-gray-400 w-10/12"
        >
            <thead className="text-xs text-gray-100 uppercase bg-gray-50 dark:bg-teal-800 dark:text-gray-100">
                <tr>
                    <th scope="col" className="px-6 py-3">Codigo Alumno</th>
                    <th scope="col" className="px-6 py-3">Nie Alumno</th>
                    <th scope = "col" className="px-5 py-3">Nombre Alumno</th>
                    <th scope = "col" className="px-5 py-3">Opciones</th>
                </tr>
            </thead>
            <tbody className='text-gray-800'>
                {
                    students.map((student) => { 
                        return (
                            <tr key={student.id} className="bg-white border-b dark:bg-gray-300 dark:border-gray-700 py-10">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap"
                                >
                                    {student.codigo_alumno}
                                </th>
                                <td
                                    className="px-6 py-4"
                                >
                                    {student.nie_alumno}
                                </td>
                                <td
                                    className="px-6 py-4"
                                >
                                    {student.nombre_alumno}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to = { `/gestionAlumnos/${student.id}` }
                                        className="formCustom__button mx-2"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        className="formCustom__button formCustom__button--red"
                                        onClick={() => {
                                            handleDelete({id: student.id})
                                        }}
                                    >
                                        Eliminar
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

export { StudentTable };
