import { useContext, useState, useRef, useEffect } from 'react';
import Context from "Context/UserContext";
import { getUsersFilter } from 'Service/UserService';
import { Option } from './Option';
import { useRol } from 'Hooks/useRol';

function FormRegisterUser({title, onClose, onEvent}) {

    const STUDENT = "1";
    const TEACHER = "2";
    const STUDENTROL = "3";
    const { jwt } = useContext(Context);
    const [filter, setFilter] = useState(""); 
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState("");
    const [rol, setRol] = useState("");
    const [typeUser, setTypeUser] = useState(false);
    const selet = useRef(null);
    const { rols } = useRol();
    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        setRoles(rols.filter(rol => rol.codigo_rol !== "3"));
    }, [rols]);

    const handleOnChange = (e) => {
        setValue(e.target.value);
        if(value.length >= 2) {
            setFilter(e.target.value);
            getUser()
        }
    }

    const getUser = () => {
        getUsersFilter({jwt, filter})
        .then(response => response.json())
        .then(data =>{
            setUsers(data);
        })
        .catch(error => console.log(error));
    }


    const handleOnChangeSelect = (e) => {
        setRol(e.target.value);
    }

    const handleOnChangeTypeUser = (e) => {
        setTypeUser(e.target.checked);
        if(e.target.checked) {
            setRoles(rols.filter((role) => role.codigo_rol === STUDENTROL));
            console.log(rols);
        } else {
            setRoles(rols.filter((role) => role.codigo_rol !== STUDENTROL));
        }
    }

    const handleOnSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        if(value === "" || rol === "") {
            setMessageError("Debe llenar todos los campos");
        } else {
            setMessageError("");
            const dataSend = {
                "id_person": value,
                "user_rol": rol,
                "user_type": typeUser ? STUDENT: TEACHER
            }
            onEvent({jwt, dataSend})
            .then(data => {
                if(data.type === 1) {
                    setMessageError(data.descripcion);
                }
                setLoading(false);
            });
        }
    }

    return (
        <form className="formCustom">
            <h2 className = "formCustom__title">{title}</h2>
            <div className="formCustom__container">
                <label className="formCustom__label">Persona
                </label>
                    <input 
                        list="users" 
                        className="formCustom__input" 
                        onChange={handleOnChange}
                    />
                <datalist id = "users">
                    {
                        users.map((user, index) => (
                                <Option key = {index} value = {user.codigo} valueVisible = {user.nombre}/>
                            ))
                    }
                </datalist>
            </div>
            <div className="formCustom__container">
                <label className="formCustom__label formCustom__label--displayInline">Alumno</label>
                <input 
                    type = "checkbox" 
                    className="formCustom__input formCustom__input--displayInline"
                    onChange = {handleOnChangeTypeUser}
                />
            </div>
            <div className = "formCustom__container">
                <label className = "formCustom__label ">Rol</label>
                <select 
                    className = "formCustom__input formCustom__input--width" 
                    ref = {selet} 
                    onChange = {handleOnChangeSelect}
                    value = {rol}
                    >
                    <option value = "" disabled>--Selected--</option>
                    {
                        roles.map( (rol) => (
                            <option value = { rol.id } key = { rol.id }>{rol.nombre_rol}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                {
                    <>
                        <p className = "formCustom__error">
                            {messageError}
                        </p>
                    </>
                }
            </div>
            <div className='formCustom__container--button'>
                <button 
                    className='formCustom__button'
                    onClick={handleOnSubmit}
                >
                    {
                        loading ? "Cargando..." : "Registrar"

                    }
                    </button>
                <button 
                    className='formCustom__button formCustom__button--red'
                    onClick={onClose}
                >Cancelar</button>
            </div>
        </form>
    )

}

export {FormRegisterUser};