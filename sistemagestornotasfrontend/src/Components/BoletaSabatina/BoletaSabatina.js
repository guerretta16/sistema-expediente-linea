import React, { useEffect, useRef } from "react";
import { useBoletaSabatina } from "Hooks/useBoletaSabatina";
import { Loader } from "Components/Loader";
import { useReactToPrint } from 'react-to-print';
import { BoletaSabatinaPDF } from "./BoletaSabatinaPDF";

const BoletaSabatina = () => {
  const { boleta, loading, getBoletaSabatina } = useBoletaSabatina();
  
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    getBoletaSabatina();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-3/4 text-sm">

      {/* Información del periodo y el alumno */}
      <div className="w-3/4 m-auto my-5">
        <div className="grid grid-cols-2 text-center bg-teal-700 text-white p-2 rounded-t font-semibold">
          <p>
            <b>Carnet: </b>{" "}
            {boleta.info_alumno && boleta.info_alumno.codigo_alumno}
          </p>
          <p>
            <b>Nombre: </b>{" "}
            {boleta.info_alumno && boleta.info_alumno.nombre_alumno}{" "}
            {boleta.info_alumno && boleta.info_alumno.apellido_alumno}
          </p>
        </div>
        <div className="grid grid-cols-2 text-center bg-white text-teal-700 p-2 pr-5 rounded-b font-semibold">
          <p></p>
          <p>
            <b>Periodo: </b>{" "}
            {boleta.info_periodo && boleta.info_periodo.codigo_periodo}
          </p>
        </div>
        <button className="bg-teal-900 text-white p-3 rounded font-semibold mt-8 hover:bg-teal-700 transition-all" onClick={handlePrint}>Generar Boleta de Notas</button>
      </div>
      {/* Tablas con las notas */}
      <div className="my-5">
      {
        boleta.info_carga_academica && boleta.info_carga_academica.map((carga_academica, index) => {
          return (
            <div key={index} className="my-8">
              
              <div className="bg-teal-700 text-white p-2 text-xl rounded text-center m-auto my-2 w-3/4">
                {carga_academica.curso_nivel}
              </div>

              <div className="flex flex-wrap justify-center">

                {/* Meses */}
                <div>
                  <div className="bg-teal-900 border-r-4 border-x-white text-white text-center p-3 px-8 font-semibold">
                    Meses
                  </div>
                  {
                    carga_academica.meses.map((mes, indexDos) => {
                      return(
                        <div key={indexDos} className="bg-white border-r-4 border-x-white text-teal-800 text-center p-3 font-semibold">
                          {mes.nombre_mes}
                        </div>
                      )
                    })
                  }
                </div>

                {/* Actividades y notas */}
                <div className="flex flex-wrap">
                  {
                    carga_academica.actividades.map((actividad, indexTres) => {
                      return(
                        <div key={indexTres} className="">
                          <div className="bg-teal-900 text-white text-center p-3 px-8 font-semibold">
                            {actividad.nombre_actividad}
                          </div>
                          <div className="w-auto">
                            {
                              actividad.nota_acumulada.map((nota, indexCuatro) => {
                                return(
                                  <div key={indexCuatro} className="bg-white text-teal-800 text-center p-3">
                                    {nota != '0' ? nota : '---'}
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                
                {/* Calificación final */}
                <div>

                  <div className="bg-teal-900 border-l-4 border-x-white text-white text-center p-3 font-semibold">
                    Calificacion Final
                  </div>

                  {
                    carga_academica.calificacion_final.map((calificacion, indexCinco) => {
                      return(
                        <div key={indexCinco} className="bg-teal-900 border-l-4 border-x-white text-white text-center p-3">
                          {calificacion != '0' ? calificacion : '---'}
                        </div>
                      )
                    })
                  }

                </div>
              </div>

            </div>
          )
        })

      }
      </div>

      {/* To print */}
      <div hidden>
        <BoletaSabatinaPDF boleta={boleta} ref={componentRef}/>
      </div>
    </div>
  );
};

export { BoletaSabatina };
