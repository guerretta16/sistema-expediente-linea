import React, { useRef, useEffect } from "react";
import { useAsistencia } from "Hooks/useAsistencia";
import { TableAsistencia } from "./TableAsistencia";
import { Loader } from "Components/Loader";
import { useReactToPrint } from 'react-to-print';

const Asistencias = () => {
  const {
    asistencia,
    loading,
    error,
    saveSuccess,
    consultarAsistencias,
    storeAsistencias,
    updateAsistencias,
  } = useAsistencia();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    storeAsistencias();
    consultarAsistencias();
  }, []);

  useEffect(() => {
    consultarAsistencias();
  }, [saveSuccess]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
        <button className="w-fit bg-teal-500 text-white rounded px-5 py-3 font-semibold text-sm" onClick={ handlePrint }>Generar Reporte</button>
      
      {Object.values(asistencia).length != 0 && (
        <TableAsistencia
          info_asistencia={asistencia.info_asistencia}
          updateAsistencias={updateAsistencias}
          asistencia={asistencia}
          ref={componentRef}
        />
      )}
    </div>
  );
};

export { Asistencias };
