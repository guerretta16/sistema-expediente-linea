import React, { useState } from 'react'

const FormularioDocente = ({closeModal, newDocente, loading, error}) => {

  const [data, setData] = useState({
    nombre_profesor: "",
    apellido_profesor: "",
    fecha_nacimiento_profesor: "",
    dui_profesor: "",
    email_profesor: ""
  })

  const handleChange = e => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    });
  } 

  const handleSubmit = e =>{
    e.preventDefault();
    newDocente({data})
  }

  return (
    <form onSubmit={handleSubmit} className="m-auto w-3/5 py-5">
        <h2 className='text-center text-lg font-bold mb-5'>Formulario de registro</h2>
        <div className='my-5'>
            <input type="text" name="nombre_profesor" placeholder='Ingresar Nombre' className='bg-gray-100 px-3 py-1 w-full placeholder:text-gray-500 rounded' onChange={handleChange}/>
        </div>
        <div className='my-5'>
            <input type="text" name="apellido_profesor" placeholder='Ingresar Apellido' className='bg-gray-100 px-3 py-1 w-full placeholder:text-gray-500 rounded' onChange={handleChange}/>
        </div>
        <div className='my-5'>
            <label>Fecha de Nacimiento</label>
            <input type="date" name="fecha_nacimiento_profesor"  className='bg-gray-100 px-3 py-1 w-full rounded' onChange={handleChange}/>
        </div>
        <div className='my-5'>
            <input type="text" name="dui_profesor" placeholder='Ingresar DUI' className='bg-gray-100 px-3 py-1 w-full placeholder:text-gray-500 rounded' onChange={handleChange}/>
        </div>
        <div className='my-5'>
            <input type="email" name="email_profesor" placeholder='Ingresar Email' className='bg-gray-100 px-3 py-1 w-full placeholder:text-gray-500 rounded'  onChange={handleChange}/>
        </div>
        <div className='w-3/5 grid grid-cols-2 m-auto gap-5'>
            <button type="submit" className='bg-green-600 text-white rounded p-2'>Guardar</button>
            <button type="button" className='bg-red-600 text-white rounded p-2' onClick={closeModal}>Cancelar</button>
        </div>
    </form>
  )
}

export { FormularioDocente }