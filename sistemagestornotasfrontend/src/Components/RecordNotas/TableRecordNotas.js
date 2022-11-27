import React from 'react'

const TableRecordNotas = React.forwardRef(({datos}, ref) => {

  return (
    <div className='px-2' ref={ref}>
        <div className='bg-teal-700 rounded px-5 py-3 text-white mt-5 text-sm'>
            <h2 className='text-md pb-1 mb-2 font-bold'>Nombre: {datos.info_alumno.nombre_alumno} {datos.info_alumno.apellido_alumno}</h2>
            <h2 className='text-md border-b pb-1 mb-2 font-bold'>Carnet: {datos.info_alumno.codigo_alumno}</h2>
            <h2 className='text-right font-semibold'>Periodo: {datos.info_periodo.codigo_periodo}</h2>
        </div>
        <table className="table-custom text-xs text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-100 uppercase bg-teal-700">
            <tr>
                <th scope='col' className="px-6 py-3">Código</th>
                <th scope='col' className="px-6 py-3">Materia</th>
                <th scope='col' className="px-6 py-3">Nivel</th>
                <th scope='col' className="px-6 py-3">Nota</th>
                <th scope='col' className="px-6 py-3">Estado</th>
            </tr>
        </thead>
        <tbody className='text-gray-900 font-medium'>
        {
                datos.info_carga_academica.map(cargaAcademica => (
                    <tr className="bg-gray-300 border-b dark:border-gray-400 py-10"
                    key={cargaAcademica.id_carga_academica}>
                        <th scope="row"
                            className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap"
                        >{cargaAcademica.codigo_curso}</th>
                        <td className="px-6 py-4">{cargaAcademica.nombre_curso}</td>
                        <td className="px-6 py-4">{cargaAcademica.nivel_curso}</td>
                        <td className="px-6 py-4">{cargaAcademica.calificacion_final}</td>
                        <td className={`px-6 py-4 ${parseFloat(cargaAcademica.calificacion_final) >= 5.95 ? "text-teal-800" : "text-red-800"}`}>{
                           parseFloat(cargaAcademica.calificacion_final) >= 5.95 ? "AP" : "RP"
                        }</td>
                    </tr>
                ))
        }
        </tbody>
    </table>
    </div>
  )
});

export { TableRecordNotas }