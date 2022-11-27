import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { AlumnoCTable } from "Components/Student/AlumnoCategoriaTable";
import Context from 'Context/UserContext';
import {
    getAlumnoCategoria,
  } from "Service/StudentService";
function AlumnoCate()
{   
    const[alumnosCa,setAlumnosCa] = useState([]);
    const { jwt } = useContext(Context);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getAlumnosCa();
    },[]);

    //Función Obtener.
  const getAlumnosCa = () => {
    setSuccess(false);
    getAlumnoCategoria({ jwt })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlumnosCa(data);
      });
  };
    return(
      <div className="main">
        <div className=" items-center">
          <h1 className="font-bold mt-10 user__title" >Estudiantes - Categoria</h1>
        </div>
        <AlumnoCTable alumnosCategorias={alumnosCa}/>
      </div>
    )
    
}

export {AlumnoCate}