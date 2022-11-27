import React, { useRef, useEffect } from "react";
import { useConsultarNotas } from "Hooks/useConsultarNotas";
import { TableNotasAcumuladas } from "./TableNotasAcumuladas";
import { Loader } from "Components/Loader";
import { useReactToPrint } from 'react-to-print';

const NotasAcumuladas = () => {
  const { consultaNotasAcumuladas, datos, loading, error } = useConsultarNotas();

  useEffect(() => {
    consultaNotasAcumuladas();
  }, [])

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if(loading){
    return <Loader />
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 text-sm px-5">
        <button className="w-fit bg-blue-500 text-white rounded px-5 py-3 font-semibold" onClick={ handlePrint }>Generar Reporte</button>
      </div>
      {Object.keys(datos).length !== 0 ? <TableNotasAcumuladas datos={datos} ref={componentRef}/> : ""}
    </div>
  );
};

export { NotasAcumuladas };
