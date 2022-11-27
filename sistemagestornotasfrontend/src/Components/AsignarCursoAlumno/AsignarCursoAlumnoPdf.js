import React from 'react';
import uesLogo from 'assets/image/uesLogo.png';
import pjtLogo from 'assets/image/pjtLogo.png';
const AsignarCursoAlumnoPdf =React.forwardRef( ({ asignarCursoAlumno, cursoNivel }, ref) => {

    return (
        <div className="bg-white p-8" ref={ref}>
            <div className="grid grid-cols-3 items-center text-center p-2">
                <img className="w-1/2 m-auto" src = {uesLogo} alt = "uesLogo" />
                <div className="text-2xl font-semibold">
                    <h2>Universidad de El Salvador</h2>
                    <h2>Programa Jovenes Talento</h2>
                </div>
                <img className="w-1/2 m-auto" src = {pjtLogo} alt = "pjtLogo" />
            </div>

            <div className = "my-6 px-12 text-center font-bold">
                <h2>{cursoNivel.nivel? cursoNivel.nivel.nombre_nivel: ''}</h2>
                <h2>{cursoNivel.curso? cursoNivel.curso.nombre_curso: ''}</h2>
            </div>
            
            <div className = "my-2 text-xs">
                    <table 
                        className= "table-custom text-sm text-left text-gray-500 dark:text-gray-400 w-full"
                    >
                    <thead
                        className = "text-xs text-gray-100 uppercase bg-teal-800"
                    >
                        <tr>
                            <th scope = "col" className='px-6 py-6'>Correlativo</th>
                            <th scope = "col" className = "px-6 py-3">Nombre del Alumno</th>
                            <th scope='col' className='px-6 py-3'>Anotaciones</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-800">
                        {
                            asignarCursoAlumno.map( (alumnoCursoAsignado,index) => {
                                return (
                                    <tr key = {alumnoCursoAsignado.id} 
                                        className = "bg-gray-300 border-b py-10"
                                    >
                                        <td className = "px-6 py-4">{index}</td>
                                        <td className = "px-6 py-4">{alumnoCursoAsignado.nombre_alumno}</td>
                                        <td></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
});
export {AsignarCursoAlumnoPdf};