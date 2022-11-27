import React, { useEffect } from "react";
import { useBoletaSabatina } from "Hooks/useBoletaSabatina";
import { Loader } from "Components/Loader";
import uesLogo from 'assets/image/uesLogo.png';
import pjtLogo from 'assets/image/pjtLogo.png';
import firmaLic from 'assets/image/firmaLic.png'

const BoletaSabatinaPDF = React.forwardRef(({boleta}, ref) => {

  const fecha = new Date();
  const mes = fecha.toLocaleString('default', { month: 'long' });
   
  return (
    <div className="bg-white p-8" ref={ref}>

      {/* Información General */}

      <div className="grid grid-cols-3 items-center text-center p-2">
        <img className="w-1/2 m-auto" src={uesLogo} alt="uesLogo"/>
        <div className="text-2xl font-semibold">
          <h2>Universidad de El Salvador</h2>
          <h2>Programa Jovenes Talento</h2>
        </div>
        <img className="w-1/2 m-auto" src={pjtLogo} alt="pjtLogo"/>
      </div>
      
      <div className="my-6 px-12 text-base text-justify">
      La infrascrita Directora del Programa Jóvenes Talento de la Universidad de El Salvador, por medio de la presente hace constar que:
      </div>

      <div className="text-center">
        <h2 className="text-4xl font-semibold">{boleta.info_alumno && boleta.info_alumno.nombre_alumno} {boleta.info_alumno && boleta.info_alumno.apellido_alumno}</h2>
      </div>

      <div className="my-6 px-12 text-base text-justify">
        formó parte de la Academia Sabatina {boleta.info_periodo && boleta.info_periodo.codigo_periodo} modalidad virtual, componente
        del Programa Jóvenes Talento que convocó todos los días sábados comprendidos
        entre las fechas {boleta.info_periodo && boleta.info_periodo.fecha_inicio_periodo} hasta {boleta.info_periodo && boleta.info_periodo.fecha_fin_periodo} a los estudiantes más
        sobresalientes del sistema educativo nacional, en horario de 9:00 a.m. a 4:00 p.m. y
        tiene como objetivo introducir a los estudiantes al maravilloso mundo de la Ciencia y
        Tecnología. Obteniendo los siguientes resultados:
      </div>

      {/* Tablas con las notas */}
      <div className="my-2 text-xs">
      {
        boleta.info_carga_academica && boleta.info_carga_academica.map((carga_academica, index) => {
          return (
            <div key={index} className="my-2">

              <div className="font-semibold p-2 text-xl rounded text-center m-auto my-2 w-3/4">
                {carga_academica.curso_nivel}
              </div>

              <div className="flex flex-wrap justify-center">

                {/* Meses */}
                <div>
                  <div className="bg-teal-900 text-white text-center p-1 font-semibold">
                    Meses
                  </div>
                  {
                    carga_academica.meses.map((mes, indexDos) => {
                      return(
                        <div key={indexDos} className="bg-white border border-teal-900 text-teal-800 text-center p-1 font-semibold">
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
                          <div className="bg-teal-900 text-white text-center p-1 font-semibold">
                            {actividad.nombre_actividad}
                          </div>
                          <div className="w-auto">
                            {
                              actividad.nota_acumulada.map((nota, indexCuatro) => {
                                return(
                                  <div key={indexCuatro} className="bg-white border border-teal-900 text-teal-800 text-center p-1 font-semibold">
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

                  <div className="bg-teal-900 text-white text-center p-1 font-semibold">
                    Calificacion Final
                  </div>

                  {
                    carga_academica.calificacion_final.map((calificacion, indexCinco) => {
                      return(
                        <div key={indexCinco} className="bg-teal-900 border border-teal-900 text-white text-center p-1 font-semibold">
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

      <div className="mt-10 px-12 text-base text-center">
        Para los usos que se estime conveniente se extiende y firma la presente el {fecha.getDate()} del mes de {mes} de {fecha.getFullYear()}
      </div>

      <div className="my-8">
        <img className="m-auto" src={firmaLic} alt="firma"/>
        <p className="text-center text-xl font-bold">Licda. Jennifer Beatriz Chávez Zamora</p>
        <p className="text-center text-xl">Directora Programa Jóvenes Talento</p>
      </div>

    </div>
  );
});

export { BoletaSabatinaPDF };
