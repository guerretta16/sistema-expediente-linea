import React from "react";
import { useCargaAcademica } from "Hooks/useCargaAcademica";
import { Loader } from "Components/Loader";
import { AlumnosTable } from "./AlumnosTable";

function CargaAlumnos() {
  const { listaAlumnos, loading, errorLog, errorPermission } =
    useCargaAcademica();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="Carga-alumnos-container">
      <div className="my-5 border-b-2 border-solid border-teal-800 pb-2 px-5 font-semibold text-sm">
        Seleccione el alumno al cual desea gestionar las notas de las diferentes actividades
      </div>
      {listaAlumnos != [] ? (
          <AlumnosTable listaAlumnos={listaAlumnos} />
      ) : ""}
    </div>
  );
}

export { CargaAlumnos };
