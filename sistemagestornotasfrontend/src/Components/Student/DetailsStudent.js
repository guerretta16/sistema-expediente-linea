import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById, updateStudent } from 'Service/StudentService';
import { getAllCategoriaAlumno } from 'Service/CategoriaAlumnoService';
import Context from 'Context/UserContext';
import { ENDPOINTIMAGE } from 'Config/EndPoint';
import { Loader } from 'Components/Loader';
import './index.css';

function DetailsStudent() {

    const history = useNavigate();
    const { jwt } = useContext(Context);
    const [student, setStudent] = useState({});
    const {idStudent} = useParams();
    const [categorias, setCategorias] = useState([]);
    const [isEdit, setIsEdit] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStudentById({ jwt, id: idStudent }).then(response => response.json())
        .then(data => {
            setStudent(data);
            setLoading(false);
        });
    }, [idStudent]);

    useEffect(() => {
        
        getAllCategoriaAlumno({ jwt }).then(response => response.json())
        .then(data => {
            setCategorias(data);
        })

    }, []);

    const handleAvaibleEdit = () => {
        setIsEdit(!isEdit);
        if(!isEdit) {
            updateStudent({jwt, student})
            .then(response =>response.json())
            .then(data => {
                if(data.codeError === 0) {
                    history('/gestionAlumnos');
                }
            });
        

        }
    }

    if(loading) {
        return <Loader />
    }


    return (
        <div className='main'>
            <h1 className='text-lg font-bold mt-10 user__title'>
                Detalles del estudiante {student.codigo_alumno}
            </h1>
            <div className='buttonRegisterContainer mt-5'>
                <button 
                    className='Actividad-btn rounded-lg bg-lime-600 px-10 py-1 text-gray-100 cursor-pointer hover:bg-line-800 mt-10'
                    onClick={ handleAvaibleEdit }
                >
                    {
                        !isEdit ? "Guardar": "Editar"
                    }

                </button>
            </div>
            <div className='formCustom__container'>
                <img src={
                    (student.photo_alumno || student.photo_alumno === null) ?
                    `${ENDPOINTIMAGE}/storage/avatar.png` :
                    `${ENDPOINTIMAGE}/${student.photo_alumno}`
                    } 
                    className = "article__img"
                    alt='foto' 
                />
            </div>
                {
                    !isEdit ?
                    (
                        <div className='formCustom__container'>
                            <label className='formCustom__label'>Foto</label>
                            <input 
                                onChange={(e) => {
                                    setStudent({...student, photo_alumno: e.target.value})
                                }}
                                type = "file" className='formCustom__input'
                            />
                        </div>
                    ) : ''

                }
            <form className='formCustom formCustom__double' onSubmit={handleAvaibleEdit}>
                <div className='formCustom__container'>
                    <label 
                        className='formCustom__label'
                    >
                        Codigo Alumno
                    </label>
                    <input 
                        onChange={(e) => {
                            setStudent({...student, codigo_alumno: e.target.value});
                        }}
                        className='formCustom__input' 
                        type='text' 
                        value={student.codigo_alumno} 
                        disabled={isEdit}
                    />
                </div>
                <div className='formCustom__container'>
                    <label 
                        className='formCustom__label'
                    >
                        Nie Alumno
                    </label>
                    <input 
                        onChange={(e) => {
                            setStudent({...student, nie_alumno: e.target.value});
                        }}
                        className='formCustom__input' 
                        type='text' 
                        value={student.nie_alumno} 
                        disabled={isEdit}
                    />
                </div>
                <div className='formCustom__container'>
                    <label 
                        className='formCustom__label'
                    >
                        Nombre
                    </label>
                    <input 
                        onChange={(e) => {
                            setStudent({...student, nombre_alumno: e.target.value})
                        }}
                        className='formCustom__input' 
                        type='text' 
                        value={student.nombre_alumno} 
                        disabled={isEdit}
                        />
                </div>
                <div className='formCustom__container'>
                    <label 
                        className='formCustom__label'
                    >
                        Apellido
                    </label>
                    <input 
                        onChange={(e)=> {
                            setStudent({...student, apellido_alumno: e.target.value})
                        }}
                        className='formCustom__input' 
                        type='text' 
                        value={student.apellido_alumno} 
                        disabled={isEdit}
                    />
                </div>
                <div className='formCustom__container'>
                    <label 
                        className='formCustom__label'
                    >
                        Fecha de Nacimiento
                    </label>
                    <input 
                        onChange={(e) => {
                            setStudent({...student, fecha_nacimiento_alumno: e.target.value})
                        }}
                        className='formCustom__input' 
                        type='date' 
                        value={student.fecha_nacimiento_alumno} 
                        disabled={isEdit}
                    />
                </div>
                <div className='formCustom__container'>
                    <label 
                        className='formCustom__label'
                    >
                        Email
                    </label>
                    <input 
                        onChange={(e) => {
                            setStudent({...student, email_alumno: e.target.value})
                        }}
                        className='formCustom__input' 
                        type='text' 
                        value={student.email_alumno} 
                        disabled={isEdit}
                    />
                </div>
                <div className='formCustom__container'>
                    <label className='formCustom__label'>Categoria Alumno</label>
                    <select 
                        onChange={(e) => {
                            setStudent({...student, id_categoria_alumno: e.target.value})
                        }}
                        value = {student.id_categoria_alumno} 
                        className='formCustom__input'
                        disabled={isEdit}
                    >
                        <option disabled value = "">--Selected--</option>
                        {
                            categorias.map((categoria) => (
                                <option 
                                key ={categoria.id}
                                    value = {categoria.id}
                                >{categoria.nombre_categoria_alumno}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='formCustom__container'>
                    <label 
                        className='formCustom__label'
                    >
                        Nombre Encargado
                    </label>
                    <input 
                        onChange={(e) => {
                            setStudent({...student, nombre_encargado_alumno: e.target.value})
                        }}
                        className='formCustom__input' 
                        type='text' 
                        value={student.nombre_encargado_alumno} 
                        disabled={isEdit}
                    />
                </div>
            </form>
        </div>
    )
}

export {
    DetailsStudent
}