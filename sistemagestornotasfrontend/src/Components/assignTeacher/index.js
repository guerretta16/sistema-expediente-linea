/**
 * @author JS Martinez
 */
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Context from 'Context/UserContext';
import ContextPeriodo from 'Context/PeriodoContext';
import { AssignTeacheTable } from './AssignTeacherTable';
import { FormRegister } from './FormRegister';
import { AlertMessage } from 'Components/AlertMessage/alertMessage';
import  Modal  from 'Components/Modal';
import { getAllRegisterByNivelCursoAndPeriodo,
    storeRegister,
    deleteRegister,
    updateRegister
} from 'Service/registerProfesorCursoNivelService';
import { Loader } from 'Components/Loader';


function AssignTeacher() {
    const  { idPeriodo, idCursoNivel }  = useParams();

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [register, setRegister] = useState([]);
    const { jwt } = useContext(Context);
    const { periodo } = useContext(ContextPeriodo);
    const [errorLogic, setErrorLogic] = useState(false);
    const [messageErrorLogic, setMessageErrorLogic] = useState("");
    const [buttonActive, setButtonActive] = useState(false);
    const [loading, setLoading] = useState(false);


    const [heightC, setHeigtC] = useState("");
    const [widthC, setWidthC] = useState("");
    const [children, setChildren] = useState("");

    useEffect(() => {
        getData();

    },[] )


    const updateRegisterDocenteCurso = ({ data }) => {
        return (updateRegister({data, jwt})
            .then(response => {
                if( response.status === 500) {
                    setErrorLogic(true);
                    return
                }
                if(response.status === 401) {
                    navigate('/login');
                }
                if(response.status === 403) {
                    navigate('/error403');
                }
                return response.json();
            })
            .then(data => {
                if(data.message === "Error") {
                    return {
                        "type" : data.message,
                        "descripcion": data.descripcionMessage
                    }
                }
                if(data.message === "Ok") {
                    getData();
                    onClose();
                    return {
                        "type": data.message,
                        "descripcion": data.descripcionMessage
                    };
                }
            })
        );
        

    }

    const storeRegisterDocenteCurso = ({ data }) => {
        return (storeRegister({data, jwt})
        .then(response => response.json())
            .then(dataResponse => {
                if(dataResponse.message === "Error") {
                    setErrorLogic(true);
                    setMessageErrorLogic(dataResponse.descripcionMessage);
                    return {
                        "type": dataResponse.message,
                        "descripcion": dataResponse.descripcionMessage
                    }
                }
                if(dataResponse.message === 'Ok') {
                    getData();
                    onClose();
                    return {
                        "type": data.message,
                        "descripcion": data.descripcionMessage
                    }
                }
            }))
    }

    const deleteRegisterDocenteCurso = ( { data } ) => {
        const id = data.id
        return (deleteRegister({ id , jwt })
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
                onClose()
                return {
                    "type": data.message,
                    "descripcion": data.descripcionMessage
                }
            }
        }));
    }

    const getData = () => {
        setLoading(true);
        getAllRegisterByNivelCursoAndPeriodo({ idPeriodo, idCursoNivel, jwt })
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
            })

    }

    const verifiedButton = () => {
        if(register.length >= 3) {
            return true;
        } else {
            return false;
        }
    }

    const onClose = () => {
        setShowModal(false);
    }

    const handleClickRegister = () => {
        setHeigtC("400px");
        setWidthC("600px");
        setChildren(
            <FormRegister 
                title={ "Registro docente curso" }
                onClose = { onClose }
                onEvent = { storeRegisterDocenteCurso }

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
                title =  "Eliminar Docente"
                descripction =  "Desea eliminar al docente de este curso"
                onClose={onClose}
                onEvent = { deleteRegisterDocenteCurso }
                dataUpdate = {data}
            />
        )
        setShowModal(true);
    }

    const handleClickUpdate = (id) => {
        const registerTemp = register[id];
        const data = {
            idDocente: registerTemp.profesor.id,
            rol: registerTemp.rol,
            id: registerTemp.id
        }
        setHeigtC("400px");
        setWidthC("600px");
        setChildren( 
            <FormRegister
                title = { "Editar docente curso" }
                onClose = { onClose }
                dataUpdate = { data }
                onEvent = { updateRegisterDocenteCurso }
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
        <div className= "main">
            <h1 
                className= "text-lg font-bold text-center mt-10"
            >Asignación de profesores</h1>
            <div className="buttonRegisterContainer">
                {
                    !verifiedButton() ?
                        <button 
                            className="rounded-lg bg-lime-600 px-10 py-1 
                            text-gray-100 cursor-pointer hover:bg-line-800
                            mt-10"
                            onClick={handleClickRegister}
                        >
                            Registrar
                        </button>
                        : ""
                }
            </div>
            <AssignTeacheTable register={ register }  handleClickDelete = { handleClickDelete} handleClickUpdate = { handleClickUpdate} />

            { showModal && <Modal heightC = {heightC} widthC = { widthC } children = {children} />}
            
        </div>
    );
}


export { AssignTeacher };
