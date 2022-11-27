import React from "react";
import { Link } from "react-router-dom";

function AlumnosTable({ listaAlumnos }) {
    
  return (
    <table className="table-auto text-sm text-left text-gray-500 dark:text-gray-400 w-full">
      <thead className="text-xs text-gray-100 uppercase dark:bg-teal-700 text-center">
        <tr>
          <th scope="col" className="px-6 py-3">
            Código
          </th>
          <th scope="col" className="px-6 py-3">
            Nombres
          </th>
          <th scope="col" className="px-6 py-3">
            Apellidos
          </th>
          <th scope="col" className="px-6 py-3">
            Opciones
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-900 font-medium">
        {listaAlumnos.map((alumno) => {
          return (
            <tr
              key={alumno.id_alumno}
              className="bg-gray-300 border-b dark:border-gray-400 py-10"
            >
              <td className="px-6 py-4">{alumno.alumno[0].codigo_alumno}</td>
              <td className="px-6 py-4">{alumno.alumno[0].nombre_alumno}</td>
              <td className="px-6 py-4">{alumno.alumno[0].apellido_alumno}</td>
              <td className="px-6 py-4">
                <Link to={`${alumno.id}`} className="bg-teal-700 px-3 py-1 rounded text-white hover:bg-teal-500 transition-all">
                  Gestionar notas
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export { AlumnosTable };
