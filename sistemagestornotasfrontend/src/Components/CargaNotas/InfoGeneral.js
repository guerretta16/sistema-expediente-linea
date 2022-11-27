import { indigo } from '@mui/material/colors'
import React from 'react'
import './InfoGeneral.css'

const InfoGeneral = ({info}) => {
  return (
    <div className='w-85 my-5 text-sm'>
        <div className='grid grid-cols-2 text-center bg-emerald-800 p-5 text-white rounded-t'>
            <div>
                <b>Periodo:</b> {info.codigo_periodo}
            </div>
            <div>
                <b>Materia:</b> {info.nombre_curso} {info.nombre_nivel}
            </div>
        </div>
        <div className='grid grid-cols-2 text-center bg-gray-300 p-3 rounded-b'>
            <div>
                <b>Carnet: </b>  {info.codigo_alumno}
            </div>
            <div>
                <b>Nombre: </b>  {info.nombre_alumno} {info.apellido_alumno}
            </div>
        </div>
    </div>
  )
}

export { InfoGeneral }