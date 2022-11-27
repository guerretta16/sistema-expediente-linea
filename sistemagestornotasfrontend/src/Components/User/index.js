/**
 * @author JS Martinez
 */
import { useEffect, useState, useContext } from 'react';
import Context from 'Context/UserContext';
import './index.css';
import { ListCardUser } from './ListCardUser';
import { selectOption } from 'Service/OptionNavbar';
import { Loader } from 'Components/Loader';
import  Modal  from 'Components/Modal';
import { FormRegisterUser } from './FormRegisterUser';
import {
    storeUser,
    getAllUsersByStudents, 
    deleteUser,
    changePasswordService
} from 'Service/UserService'
import { AlertMessage } from 'Components/AlertMessage/alertMessage';


function User() {

    const CODESUCCESS = 0;
    const CODEERROR = 1;


    const { jwt } = useContext(Context);
    const [option, setOption] = useState("students");
    const [showModal, setShowModal] = useState(false);
    const [heightC, setHeigtC] = useState("");
    const [widthC, setWidthC] = useState("");
    const [children, setChildren] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);
    const options = selectOption({value: 'userFilter'});
    

    const onClose = () => {
        setShowModal(false);
    }
    useEffect(() =>{
        getData();
    },[success, option]);



    const getData = () => {
        setSuccess(false);
        setLoading(true);
        getAllUsersByStudents({jwt, option})
        .then(response => response.json())
        .then(data => {
            setUsers(data)
            setLoading(false);

        });
    }


    const handleOption = (e, optionSelected) => {
        document.querySelector('.filter__button--active').classList.remove('filter__button--active');
        e.target.classList.add('filter__button--active');
        setOption(optionSelected);
    };


    const storeUserTest = ({jwt, dataSend}) => {
        return(
            storeUser({jwt, user: dataSend})
            .then(response => response.json()) 
            .then(data => {
                if(data.codeError === 0) {
                    onClose();
                    setSuccess(true);
                    return {
                        "type": CODESUCCESS ,
                        "description": data.descripcionMessage
                    }
                } else {
                    setSuccess(false);
                    return {
                        "type": CODEERROR,
                        "description": data.descripcionMessage
                    }
                }
            })
        );

    };
    
    const handleShowModal = (e) => {
        setShowModal(true);
        setWidthC("400px")
        setHeigtC("400px")
        setChildren(
            <FormRegisterUser 
                onClose={onClose}
                title = {"Registro de usuario"} 
                onEvent = {storeUserTest}
            />
        )
    };

    const handleClickChangePassword = ({dataSend}) => {
        setHeigtC("200px");
        setWidthC("600px");
        setChildren(
            <AlertMessage
                dataUpdate={dataSend}
                title = "Cambiar contraseña"
                descripction={"¿Esta seguro que desea cambiar la contraseña del usuario?"}
                onClose = {onClose}
                onEvent={changePassword}
            />
        );
        setShowModal(true);

    };

    const changePassword = ({data}) => {
        changePasswordService({jwt, dataSend: data})
        .then(response => response.json())
        .then(data => {
            if(data.codeError === 0) {
                onClose();
                setSuccess(true);
            }
        })
    };

    const handleClickDelete = ({dataSend}) => {
        setHeigtC("200px");
        setWidthC("600px");
        setChildren(
            <AlertMessage 
                dataUpdate={dataSend}
                title = {"Eliminar usuario"}
                descripction = {"¿Está seguro que desea eliminar el usuario?"}
                onClose = {onClose}
                onEvent = {deleteUserHandle}
                />
        )
        setShowModal(true);
    }

    const deleteUserHandle = ({data}) => {
        deleteUser({jwt, dataSend: data})
        .then(response => response.json())
        .then(data => {
            if(data.codeError === 0) {
                onClose();
                setSuccess(true);
            } 
        });
    };

    return (
        <div className = "managment-user">
            <h1 className = "text-lg font-bold mt -10 user__title">
                Gestión de Usuarios
            </h1>
            <div className = "container__button">
                <button 
                    className = "rounded-lg bg-lime-600 px-10 py-1 text-gray-100 cursor-pointer hover:bg-line-800 mt-10 user__button"
                    onClick={handleShowModal}
                >
                    Registrar
                </button>
            </div>
            <div className = "user__filter">
                {
                    options.map((option) => (
                        <button 
                            onClick={(e) => handleOption(e, option.option)}
                            key = {option.id}
                            className = { `filter__button ${option.active? 'filter__button--active': ''}` }
                            active = "{option.active}"
                        >
                            {option.name}
                        </button>
                    ))
                }
            </div>
            {
                loading ? <Loader />: <ListCardUser users = { users } handleClickDelete = {handleClickDelete} handleClickChangePassword = {handleClickChangePassword} />
            }

            {showModal && <Modal heightC = {heightC} widthC = { widthC } children = {children} />}

            
        </div>
    );

}

export {User}
