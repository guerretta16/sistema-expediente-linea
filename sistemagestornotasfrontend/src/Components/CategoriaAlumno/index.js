import { useContext, useEffect, useState } from 'react';
import Context from 'Context/UserContext';
import { 
    getAllCategoriaAlumno,
    storeCategoriaAlumnoService,
    deleteCategoriaAlumnoService,
    updateCategoriaAlumnoService

} from 'Service/CategoriaAlumnoService';
import { CategoriaAlumnoTable } from './CategoriaAlumnoTable';
import { Loader } from 'Components/Loader';
import Modal from 'Components/Modal';
import { FormRegisterCategoriaAlumno } from './FormRegisterCategoriaAlumno';
import { AlertMessage } from 'Components/AlertMessage/alertMessage';
function CategoriaAlumno() {


    const SUCCESS = 0;
    const ERROR = 1;
    const { jwt } = useContext(Context);
    const [categoriaAlumno, setCategoriaAlumno] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [heightC, setHeigtC] = useState("");
    const [widthC, setWidthC] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);
    const [setSuccess] = useState(false);


    useEffect(() => {
        getData();
    },[])

    const onClose = () => {
        setShowModal(false);
    }

    const getData = () => {
        setLoading(true);
        getAllCategoriaAlumno({ jwt })
        .then(response => response.json())
        .then(data => {
            setCategoriaAlumno(data);
            setLoading(false);
        });
    };

    const handleShowModalRegister = () => {
        setHeigtC("350px");
        setWidthC("600px");
        setChildrenModal(
            <FormRegisterCategoriaAlumno
                onClose={onClose}
                onEvent = {storeCategoriaAlumno}
            />
        )
        setShowModal(true);
    }

    const storeCategoriaAlumno = ({dataSend}) => {
        return (
            storeCategoriaAlumnoService({jwt, dataSend})
            .then(response => response.json())
            .then(data => {
                if(data.codeError === SUCCESS) {
                    getData();
                    onClose();
                    return {
                        "type": SUCCESS,
                        "description": data.descripcionMessage
                    }
                } else {
                    return {
                        "type": ERROR,
                        "description": data.descripcionMessage
                    }
                }
            })
        )
    }

    const handleShowModalDelete = ({id}) => {
        console.log("Esta entradando")
        setHeigtC("250px");
        setWidthC("600px");
        const dataUpdate = {
            "id": id
        };
        setChildrenModal(
            <AlertMessage 
                dataUpdate={dataUpdate}
                onClose={onClose}
                title  = "Eliminar Categoria Alumno"
                descripction={"¿Esta seguro que desea eliminar la categoria de alumno?"}
                onEvent = {deleteCategoriaAlumno}
            />
        )
        setShowModal(true);

    };

    const deleteCategoriaAlumno = ({data: dataUpdate}) => {
        deleteCategoriaAlumnoService({jwt, id: dataUpdate.id})
        .then(response => response.json())
        .then(data => {
            if(data.codeError === SUCCESS) {
                getData();
                onClose();
                return {
                    "type": SUCCESS,
                    "description": data.descripcionMessage
                }
            }else {
                return {
                    "type": ERROR,
                    "description": data.descripcionMessage
                }
            }
        })
    };

    const handleShowModalEdit = ({id}) => {
        const categoriaUpdate = categoriaAlumno.find(categoria => categoria.id === id);
        setWidthC("600px");
        setHeigtC("350px");
        setChildrenModal(
            <FormRegisterCategoriaAlumno 
                onClose={onClose}
                onEvent = {updateCategoriaAlumno}
                dataUpdate = {categoriaUpdate}
            />
        );
        setShowModal(true);
    } 

    const updateCategoriaAlumno = ({dataSend: dataUpdate}) => {
        return (
            updateCategoriaAlumnoService({jwt, dataSend: dataUpdate})
            .then(response => response.json())
            .then(data => {
                if(data.codeError === SUCCESS) {
                    getData();
                    onClose();
                    return {
                        "type": SUCCESS,
                        "description": data.descripcionMessage
                    }
                }
                if(data.codeError === ERROR) {
                    return {
                        "type": ERROR,
                        "description": data.descripcionMessage
                    }
                }
            })
        )

    }

    return (
        <div className = "main">
            <h1 className = "text-lg font-bold mt -10 user__title">
                Gestión Categoria Alumno
            </h1>
            <div className = "buttonRegisterContainer mt-5">
                <button 
                    className = "Actividad-btn rounded-lg bg-lime-600 px-10 py-1 text-gray-100 cursor-pointer hover:bg-line-800 mt-10"
                    onClick={handleShowModalRegister}
                    >
                    Registrar
                </button>
            </div>
            {
                loading ? <Loader /> : 
                <CategoriaAlumnoTable 
                    categoriasAlumno = {categoriaAlumno} 
                    handleDeleteCategoriaAlumno = { handleShowModalDelete }
                    handleEditCategoriaAlumno = { handleShowModalEdit }
                />
            }

            {
                showModal ?
                <Modal
                    heightC={heightC}
                    widthC={widthC}
                >
                    {childrenModal}
                </Modal>: ''
            }
        </div>

    );
}

export {CategoriaAlumno};