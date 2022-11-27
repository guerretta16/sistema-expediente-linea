import React, { useRef } from "react";
import { useConsultarNotas } from "Hooks/useConsultarNotas";
import { TableNominaNotas } from "./TableNominaNotas";
import { Loader } from "Components/Loader";
import { useReactToPrint } from 'react-to-print';

const NominaNotas = () => {
  const { consultarNominaNotas, datos, loading, error } = useConsultarNotas();

  const componentRef = useRef(null);

  const handleChange = e => {
    e.preventDefault();
    consultarNominaNotas({id_mes: e.target.value});
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if(loading){
    return <Loader />
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 text-sm px-2">
        <select className="rounded px-5 py-2 bg-teal-900 text-white font-semibold" onChange={handleChange}>
          <option value="0">Seleccione un mes</option>
          <option value="1">Mes 1</option>
          <option value="2">Mes 2</option>
          <option value="3">Mes 3</option>
          <option value="4">Mes 4</option>
          <option value="5">Mes 5</option>
          <option value="6">Mes 6</option>
        </select>
        <button className="w-fit bg-blue-500 text-white rounded px-5 mx-auto font-semibold" onClick={ handlePrint }>Generar Nómina de Notas</button>
      </div>
      {Object.keys(datos).length !== 0 ? <TableNominaNotas datos={datos} ref={componentRef}/> : ""}
    </div>
  );
};

export { NominaNotas };
