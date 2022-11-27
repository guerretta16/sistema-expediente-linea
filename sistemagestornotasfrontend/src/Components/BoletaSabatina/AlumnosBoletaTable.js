import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useCargaAcademica } from "Hooks/useCargaAcademica";
import { Loader } from "Components/Loader";

function AlumnosBoletaTable() {
  
  const {alumnosBoleta, loading, consultarAlumnosForBoleta} = useCargaAcademica();
  
  useEffect(() => {
    consultarAlumnosForBoleta();
  }, [])

  if(loading){
    return <Loader/>
  }

  return (
    <table className="table-auto text-sm text-left text-gray-500 dark:text-gray-400 w-3/4">
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
      <tbody className="text-gray-900 font-medium text-center">
        {alumnosBoleta.map((alumno) => {
          return (
            <tr
              key={alumno.id}
              className="bg-gray-300 border-b dark:border-gray-400 py-10"
            >
              <td className="px-6 py-4">{alumno.codigo_alumno}</td>
              <td className="px-6 py-4">{alumno.nombre_alumno}</td>
              <td className="px-6 py-4">{alumno.apellido_alumno}</td>
              <td className="px-6 py-4">
                <Link to={`${alumno.id}`} className="bg-teal-700 px-3 py-1 rounded text-white hover:bg-teal-500 transition-all">
                  Consultar Boleta
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export { AlumnosBoletaTable };
