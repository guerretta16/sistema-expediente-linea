import React from 'react'

const TableDocente = ({docentes}) => {
  return (
    <table className="table-custom text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-100 uppercase dark:bg-teal-700">
            <tr>
                <th scope='col' className="px-6 py-3">Codigo</th>
                <th scope='col' className="px-6 py-3">Nombre</th>
                <th scope='col' className="px-6 py-3">Apellido</th>
                <th scope='col' className="px-6 py-3">DUI</th>
                <th scope='col' className="px-6 py-3">Opciones</th>
            </tr>
        </thead>
        <tbody className='text-gray-900 font-medium'>
            {
                docentes &&
                docentes.map(docente => (
                    <tr className="bg-gray-300 border-b dark:border-gray-400 py-10"
                    key={docente.id}>
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >{docente.codigo_profesor}</th>
                        <td className="px-6 py-4">{docente.nombre_profesor}</td>
                        <td className="px-6 py-4">{docente.apellido_profesor}</td>
                        <td className="px-6 py-4">{docente.dui_profesor}</td>
                        <td className="px-6 py-4 grid grid-cols-2 gap-3">
                            <button className='p-2 rounded text-white bg-orange-500'>Editar</button>
                            <button className='p-2 rounded text-white bg-red-500'>Eliminar</button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
  )
}

export { TableDocente }