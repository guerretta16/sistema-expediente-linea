import { useEffect } from "react";
import { useUser } from "Hooks/useUser";
import { useNavigate } from "react-router-dom";
import './index.css';

function Home() {
    const { isLogged } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLogged) {
            navigate("/login");
        } 
    }, [isLogged, navigate]);

    return(
        <div className="Home-container">
            <h1 className="Home-title">Bienvenido</h1>
            <div className="Home-info">
                Plataforma de expediente en línea del Programa Jovenes Talento.
            </div>
        </div>
    ) 
}

export {Home};