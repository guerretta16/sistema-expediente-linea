import React from "react";

const TableNotasActividades = React.forwardRef(({ datos }, ref) => {
  return (
    <div className="px-2" ref={ref}>
      <div className="bg-teal-700 rounded px-5 py-3 text-white mt-5 text-sm">
        <h2 className="text-md pb-1 mb-2 font-bold">
          Nombre: {datos.info_alumno.nombre_alumno}{" "}
          {datos.info_alumno.apellido_alumno}
        </h2>
        <h2 className="text-md border-b pb-1 mb-2 font-bold">
          Carnet: {datos.info_alumno.codigo_alumno}
        </h2>
        <h2 className="text-right font-semibold">
          Periodo: {datos.info_periodo.codigo_periodo}
        </h2>
      </div>
      {datos.cargas_academicas.map((carga, index) => {
        return (
          <table
            key={index}
            className="table-custom text-xs text-left text-gray-500 dark:text-gray-400"
          >
            <thead className="text-xs text-gray-100 uppercase bg-teal-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Código
                </th>
                <th scope="col" className="px-6 py-3">
                  Materia
                </th>
                <th scope="col" className="px-6 py-3">
                  Nivel
                </th>
                {carga.meses.map((mes, indexDos) => {
                  return (
                    <th key={indexDos} scope="col" className="px-6 py-3 bg-teal-800">
                      {mes.nombre_mes}
                    </th>
                  );
                })}
                <th scope="col" className="px-6 py-3">
                  Prom
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900 font-medium">
              <tr className="bg-gray-300 border-b dark:border-gray-400 py-10">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap"
                >
                  {carga.codigo_curso}
                </th>
                <td className="px-6 py-4">{carga.nombre_curso}</td>
                <td className="px-6 py-4">{carga.nivel_curso}</td>
                {carga.promedio_mensual.map((nota, indexTres) => {
                  return (
                    <td key={indexTres} className="px-6 py-4">
                      {nota}
                    </td>
                  );
                })}
                <td className="px-6 py-4">{carga.promedio_actual}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
});

export { TableNotasActividades };
