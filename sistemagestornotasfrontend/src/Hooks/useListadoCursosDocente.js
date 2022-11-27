/**
 * @author JS Martinez
 */
import { getAllRegisterByDocente } from 'Service/registerProfesorCursoNivelService';
import { useContext, useState } from 'react';
import Context from 'Context/UserContext';
import {useNavigate} from 'react-router-dom';

function useListadoCursosDocentes() {
    const {jwt} = useContext(Context);

    const [errorLogic, setErrorLogic] = useState(false);
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getAllCursos = ({ idPeriodo }) => {

        setLoading(true);
        getAllRegisterByDocente({ jwt, idPeriodo }) 
        .then(response => {
            if(response.status === 500) {
                setErrorLogic(true);
                return;
            }
            if(response.status === 403) {
                navigate('/error403');
                return;
            }
            if(response.status === 401) {
                navigate('/login')
                return;
            }
            return response.json();
        })
        .then(data => {
            setCursos(data);
            setLoading(false);
        });
        
    }

    return {
        getAllCursos,
        cursos,
        errorLogic,
        loading
    }
}

export {
    useListadoCursosDocentes
}