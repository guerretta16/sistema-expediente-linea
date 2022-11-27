import React, { useRef, useEffect } from "react";
import { useConsultarNotas } from "Hooks/useConsultarNotas";
import { TableRecordNotas } from "./TableRecordNotas";
import { Loader } from "Components/Loader";
import { useReactToPrint } from 'react-to-print';

const RecordNotas = () => {
  const { consultaRecordNotas, datos, loading, error } = useConsultarNotas();

  useEffect(() => {
    consultaRecordNotas();
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
      <div className="grid grid-cols-2 gap-5 text-sm px-2">
        <button className="w-fit bg-teal-500 text-white rounded px-5 py-3 font-semibold" onClick={ handlePrint }>Descargar Comprobante</button>
      </div>
      {Object.keys(datos).length !== 0 ? <TableRecordNotas datos={datos} ref={componentRef}/> : ""}
    </div>
  );
};

export { RecordNotas };
