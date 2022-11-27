import React from "react";

const TableNominaNotas = React.forwardRef(({ datos }, ref) => {
  return (
    <div className="px-5" style={{fontSize: "9.5px"}} ref={ref}>
      <div className="bg-teal-700 rounded px-5 py-3 text-white mt-5">
        <h2 className=" border-b pb-1 mb-2 font-bold">
          {datos.infoGeneral.Curso.nombre_curso} -{" "}
          {datos.infoGeneral.Nivel.codigo_nivel}
        </h2>
        <h2 className="text-right font-semibold">
          Periodo: {datos.infoGeneral.Periodo}
        </h2>
        <h2 className="text-right font-semibold">{datos.infoGeneral.Mes}</h2>
      </div>
      <table className="table-custom text-center text-gray-500 dark:text-gray-400">
        <thead className="text-gray-100 uppercase bg-teal-700">
          <tr>
            <th scope="col" className="px-1 py-3">
              Carnet
            </th>
            <th scope="col" className="px-1 py-3">
              Apellidos
            </th>
            <th scope="col" className="px-1 py-3">
              Nombres
            </th>
            {datos.cargasAcademicas[0].actividades.map((actividad) => (
              <th scope="col" className="px-1 py-3" key={actividad.id}>
                <tr className="flex justify-between items-center">
                  <th className="px-1 py-1">
                    <div>
                      {actividad.codigo_actividad}
                    </div>

                    <tr className="flex justify-center">
                      {actividad.linea_actividad.map((linea) => {
                        return (
                          <th className="mx-1" key={linea.id}>
                            {linea.codigo_linea_actividad}
                          </th>
                        );
                      })}
                    </tr>
                  </th>
                  <th className="w-10 px-1 py-1 border-b-2 border-white mx-1">
                    PC
                  </th>
                </tr>
              </th>
            ))}
            <th scope="col" className="px-1 py-3 bg-teal-900">
              PA
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-900 font-medium">
          {datos.cargasAcademicas.map((cargaAcademica) => (
            <tr
              className="bg-gray-300 border-b dark:border-gray-400 py-10"
              key={cargaAcademica.id}
            >
              <th
                scope="row"
                className="px-3 py-4 font-bold text-gray-900 whitespace-nowrap"
              >
                {cargaAcademica.codigo_alumno}
              </th>
              <td className="px-1 py-4">{cargaAcademica.apellido_alumno}</td>
              <td className="px-1 py-4">{cargaAcademica.nombre_alumno}</td>
              {cargaAcademica.actividades.map((actividad) => (
                <td className="px-1 py-3" key={actividad.id}>
                  <tr className="flex justify-between items-center">
                    <td className="flex justify-center">
                      {actividad.linea_actividad.map((linea) => {
                        return (
                          <td className="mx-1">
                            {linea.nota}
                          </td>
                        );
                      })}
                    </td>
                    <td className="w-10 py-1 border-b-2 border-teal-700 mx-1">{actividad.notaTotal}</td>
                  </tr>
                </td>
              ))}
              <td className="px-3 py-4 bg-teal-900 text-white">
                {cargaAcademica.promedioActual}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export { TableNominaNotas };
