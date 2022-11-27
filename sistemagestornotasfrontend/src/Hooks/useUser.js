/**
 * @author JS Martinez
 */
import { useContext, useCallback, useState } from "react";
import Context from "Context/UserContext";
import ContextPeriodo from "Context/PeriodoContext";
import { useNavigate } from "react-router-dom";

import { loginService } from 'Service/loginService';
import { searchPeriodoActivo } from 'Service/periodoService';

function useUser() {
    const { jwt, setJWT, nombreRol, setNombreRol, idRol, setIdRol, setIdUser } = useContext(Context);
    const { setPeriodo } = useContext(ContextPeriodo);
    const [state, setState] = useState({loading: false, error: false});
    const [messageError, setMessageError] = useState("");
    const navigate = useNavigate();

    const login = useCallback(({ username, password }) => {
        setState({loading: true, error: false});
        loginService({username, password})
        .then(data => {
            if(data.message) {
                window.sessionStorage.removeItem('jwt');
                setState({loading: false, error: true})
                setMessageError(data.message);
            } else {
                window.sessionStorage.setItem('jwt', data.jwt);
                window.sessionStorage.setItem('nombreRol', data.nombreRol);
                window.sessionStorage.setItem('idRol', data.idRol);
                window.sessionStorage.setItem('id', data.id);
                setJWT(data.jwt);
                setIdRol(data.idRol);
                setNombreRol(data.nombreRol);
                setIdUser(data.id);
                setState({loading: false, error: false});
                //searchPeriodo({jwt})
            }
        })
    }, [setJWT, setIdRol, setNombreRol, setIdUser]);

    const searchPeriodo = () => {
        searchPeriodoActivo({jwt})
        .then(response => {
            if(response.status ===401) {
                return;
            }
            if(response.status === 403) {
                return;
            }
            if(response.status === 500) {
                return;
            }
            return response.json();
        })
        .then(data => {
            if(data.message) {
                setPeriodo(0);
                window.sessionStorage.setItem('periodo', 0);
            }
            else {
                setPeriodo(data.id);
                window.sessionStorage.setItem('periodo', data.id);
            }
        })

    }

    const logout = useCallback(() => {
        setJWT(null);
        setIdRol(null);
        setNombreRol(null);
        setIdUser(null)
        window.sessionStorage.removeItem('jwt');
        window.sessionStorage.removeItem('nombreRol');
        window.sessionStorage.removeItem('idRol');
        window.sessionStorage.removeItem('id');
        navigate('/login');
    }, [setJWT, setIdRol, setNombreRol, setIdUser]);

    return {
        logout,
        login,
        idRol,
        nombreRol,
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        isLoginError: state.error,
        messageError
    }
}
export {useUser};
