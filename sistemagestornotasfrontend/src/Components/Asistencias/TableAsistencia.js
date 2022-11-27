import React from "react";

const TableAsistencia = React.forwardRef(
  ({ info_asistencia, updateAsistencias, asistencia }, ref) => {
    const handleUpdate = (e) => {
      updateAsistencias({ id_asistencia: e.target.value });
    };

    return (
      <div className="px-5" style={{ fontSize: "9.5px" }} ref={ref}>

        <div className="bg-teal-700 rounded px-5 py-3 text-white mt-5 text-sm">
          <h2 className="text-md border-b pb-1 mb-2 font-bold">
            Materia:{" "}
            {Object.values(asistencia).length != 0 &&
              asistencia.info_curso_nivel}
          </h2>
          <h2 className="text-right font-semibold">
            Periodo:{" "}
            {Object.values(asistencia).length != 0 &&
              asistencia.info_periodo.codigo_periodo}
          </h2>
        </div>

        <table className="table-custom text-gray-500 dark:text-gray-400">
          <thead className="text-gray-100 uppercase bg-teal-700">
            <tr>
              <th scope="col" className="px-3 py-3">
                Carnet
              </th>
              <th scope="col" className="px-3 py-3">
                Nombre
              </th>
              <th scope="col" className="px-3 py-3">
                Apellido
              </th>
              {info_asistencia[0].asistencias.map((asistencia, index) => {
                return (
                  <th
                    key={index}
                    scope="col"
                    className="px-1 py-3"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {asistencia.fecha_asistencia}
                  </th>
                );
              })}
              <th scope="col" className="px-3 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-900 font-medium">
            {info_asistencia.map((info, indexDos) => {
              return (
                <tr
                  key={indexDos}
                  className="bg-gray-300 border-b dark:border-gray-400 py-10"
                >
                  <th
                    scope="row"
                    className="px-3 py-4 font-bold text-gray-900 whitespace-nowrap"
                  >
                    {info.alumno.codigo_alumno}
                  </th>
                  <td className="px-3 py-4">{info.alumno.nombre_alumno}</td>
                  <td className="px-3 py-4">{info.alumno.apellido_alumno}</td>
                  {info.asistencias.map((asistencia, indexTres) => {
                    return (
                      <td key={indexTres} className="px-1 py-4">
                        <input
                          onChange={handleUpdate}
                          type="checkbox"
                          name="asistencia"
                          value={asistencia.id_asistencia}
                          checked={asistencia.asistencia == "1" && true}
                        />
                      </td>
                    );
                  })}
                  <td className="px-3 py-4 font-bold">{info.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);

export { TableAsistencia };
