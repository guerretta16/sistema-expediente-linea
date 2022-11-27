import { useState } from "react";
import { useNivel } from "Hooks/useNiveles";
import CursoList from "./CursoList";
import { ListNivel } from "Components/CursoCard/ListNivel";
import { useCursoNivel } from "Hooks/useCursoNivel";
import "./css/index.css";
import { Loader } from "Components/Loader";

function CursosNivel() {
  const { niveles } = useNivel();
  const { cursoNivel, getCursosNivel, loading } = useCursoNivel();

  function handleClick(e) {
    getCursosNivel({ id: e.target.value });
  }

  return (
    <div className="Curso-Nivel">
      {loading ? (
        <Loader />
      ) : (
        <>
          <nav className="Nivel-List_container">
            <ListNivel handleClick={handleClick} niveles={niveles} />
          </nav>
          <div className="Curso-List_container">
            {cursoNivel ? <CursoList cursoNivel={cursoNivel} /> : ""}
          </div>
        </>
      )}
    </div>
  );
}

export { CursosNivel };
