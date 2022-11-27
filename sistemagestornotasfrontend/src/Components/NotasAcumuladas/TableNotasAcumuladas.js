import React from 'react'

const TableNotasAcumuladas = React.forwardRef(({datos}, ref) => {

  return (
    <div className='px-5' ref={ref}>
        <div className='bg-teal-700 rounded px-5 py-3 text-white mt-5 text-sm'>
            <h2 className='text-md border-b pb-1 mb-2 font-bold'>{datos.infoGeneral.Curso.nombre_curso} - {datos.infoGeneral.Nivel.codigo_nivel}</h2>
            <h2 className='text-right font-semibold'>Periodo: {datos.infoGeneral.Periodo}</h2>
        </div>
        <table className="table-custom text-xs text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-100 uppercase bg-teal-700">
            <tr>
                <th scope='col' className="px-6 py-3">Carnet</th>
                <th scope='col' className="px-6 py-3">Apellidos</th>
                <th scope='col' className="px-6 py-3">Nombres</th>
                {
                    datos.meses.map((mes, index) => {
                        return(
                            <th key={index} scope='col' className='px-6 py-3'>{mes.nombre_mes}</th>
                        )
                    })
                }
                <th scope='col' className="px-6 py-3 bg-teal-900">PA</th>
            </tr>
        </thead>
        <tbody className='text-gray-900 font-medium'>
        {
                datos.cargasAcademicas.map(cargaAcademica => (
                    <tr className="bg-gray-300 border-b dark:border-gray-400 py-10"
                    key={cargaAcademica.id}>
                        <th scope="row"
                            className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap"
                        >{cargaAcademica.codigo_alumno}</th>
                        <td className="px-6 py-4">{cargaAcademica.apellido_alumno}</td>
                        <td className="px-6 py-4">{cargaAcademica.nombre_alumno}</td>
                        {
                            cargaAcademica.promedioMensual.map((promedio, indexDos) => (
                                <td className="px-6 py-4" key={indexDos}>{promedio}</td>
                            ))
                        }
                        <td className="px-6 py-4 bg-teal-900 text-white">{cargaAcademica.promedioActual}</td>
                    </tr>
                ))
        }
        </tbody>
    </table>
    </div>
  )
});

export { TableNotasAcumuladas }