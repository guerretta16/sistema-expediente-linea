/**
 * @author RO Andrés
 */
 import { useState, useEffect, useContext, useRef } from 'react';
 import { useReactToPrint } from 'react-to-print';

 import { useParams } from 'react-router-dom';
 
 import Context from 'Context/UserContext';
 import ContextPeriodo from 'Context/PeriodoContext';//Preguntar
 import { AsignarCursoTable } from './AsignarCursoAlumnoTable';
 import { FormularioAsignarCurso } from './FormularioAsignarCurso';
 import { AlertMessage } from 'Components/AlertMessage/alertMessage';
 import  Modal  from 'Components/Modal';
 import { getAsignarCursoAlumno,storeAsignarCursoAlumno,updateAsignarCursoAlumno,deleteAsignarCursoAlumno
 } from 'Service/CargaAcademicaService';
 import {AsignarCursoAlumnoPdf} from './AsignarCursoAlumnoPdf';
 import { Loader } from 'Components/Loader';
 import {getCursoNivel} from 'Service/CursoNivelService';
 
 
 function AsignarCursoAlumno() {

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,

    });

     const  { idPeriodo, idCursoNivel }  = useParams();
 
     const [showModal, setShowModal] = useState(false);
     const [register, setRegister] = useState([]);
     const [cursoNivel, setCursoNivel] = useState({});
     const { jwt } = useContext(Context);
     const { periodo } = useContext(ContextPeriodo);
     const [, setButtonActive] = useState(false);
     const [loading, setLoading] = useState(false);
     const [, setSuccess] = useState(false);
 
     const [heightC, setHeigtC] = useState("");
     const [widthC, setWidthC] = useState("");
     const [children, setChildren] = useState("");
    
     const getCursoNivelById = () => {
        getCursoNivel({id: idCursoNivel, jwt})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setCursoNivel(data);
        });
     };

     const getData = () => {
        const data = {
            id_periodo: idPeriodo,
            id_curso_nivel: idCursoNivel,
        }
        setLoading(true);
        getAsignarCursoAlumno({ jwt, data })
            .then(response => {
                return response.json()
            })
            .then(data => {
                data.forEach((data, index) => {
                    data['index'] = index;
                    return data
                });
                setRegister(data);
                buttonActiveSet();
                setLoading(false);
                console.log(data);
            })

    }
     useEffect(() => {
         getData();
         getCursoNivelById();
     },[] )
 
 
     const storeAsignarCursoAlu = ({ data }) => {
        storeAsignarCursoAlumno({ data, jwt,idPeriodo,idCursoNivel })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.codeError === 0) {
            setSuccess(true);
            onClose();
            getData();
            }
      });
     };//Fin de storeAsignarCursoAlu
 
     const deleteAsignarCursoAlu = ( { data } ) => {
         return (deleteAsignarCursoAlumno({ data , jwt })
         .then(response => {
             if(response.status === 401 || response.status === 403 || response.status === 500) {
                 return;
             }
             return response.json();
         })
         .then(data => {
             if(data.message === "Error") {
                 return {
                     "type": data.message,
                     "descripcion": data.descripcionMessage
                 }
             }
             if(data.message === "Ok") {
                 getData();
                 onClose();
                 return {
                     "type": data.message,
                     "descripcion": data.descripcionMessage
                 }
             }
         }));
     }
 
 
     const onClose = () => {
         setShowModal(false);
     }
 
     const handleClickRegister = () => {
         setHeigtC("400px");
         setWidthC("600px");
         setChildren(
             <FormularioAsignarCurso 
                 title={ "Asignar Curso Alumno" }
                 onClose = { onClose }
                 onEvent = { storeAsignarCursoAlu }
                 />
         );
         setShowModal(true);
 
     }
 
     const handleClickDelete = (id) => {
         setHeigtC("200px");
         setWidthC("600px");
         const data = {
             id: register[id].id
         }
         setChildren(
             <AlertMessage 
                 title =  "Eliminar Curso Alumno "
                 descripction =  "Desea eliminar el alumno del curso asignado"
                 onClose={onClose}
                 onEvent = { deleteAsignarCursoAlu }
                 dataUpdate = {data}
             />
         )
         setShowModal(true);
     }
 
     const handleClickUpdate = (id) => {
         const registerTemp = register[id];
         const data = {
             idCursoNivel: registerTemp.cursoNivel.id,
             //rol: registerTemp.rol,
             id: registerTemp.id
         }
         setHeigtC("400px");
         setWidthC("600px");
         setChildren( 
             <FormularioAsignarCurso
                 title = { "Editar Curso Alumno" }
                 onClose = { onClose }
                 dataUpdate = { data }
                 onEvent = { updateAsignarCursoAlumno }
             />
         );
 
         setShowModal(true);
 
     }
     const buttonActiveSet = () => {
         if(periodo === idPeriodo) {
             setButtonActive(true)
             return;
         }
         setButtonActive(false);
     }
 
     if(loading) {
         return <Loader />
     }
 
     return (
         <div className= "main mt-10" >
            <div class = "grid grid-cols-3 mb-10">
             <h1 
                 className= "text-3xl font-bold text-center"
             >Asignación de Alumnos</h1>
                <button 
                    className="w-fit bg-teal-700 text-white m-auto px-2 py-3 rounded hover:bg-teal-900 transition"
                    onClick={handleClickRegister}
                >
                    Asignar
                </button>
                <button 
                className="w-fit bg-teal-700 text-white m-auto px-2 py-3 rounded hover:bg-teal-900 transition"
                onClick={handlePrint}>
                    Descargar PDF
                </button>
             </div>
             <AsignarCursoTable register={ register }  handleClickDelete = { handleClickDelete} handleClickUpdate = { handleClickUpdate} />
 
             { showModal && <Modal heightC = {heightC} widthC = { widthC } children = {children} />}
             

             <div hidden>
                <AsignarCursoAlumnoPdf 
                    asignarCursoAlumno={ register }  
                    cursoNivel = { cursoNivel }
                    ref = {componentRef}/>
             </div>
         </div>
     );
 }
 
 
 export { AsignarCursoAlumno };
 