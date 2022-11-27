import React from "react";
import { Link } from "react-router-dom";
import "./css/CursoCard.css";

function CursoCard({id_curso_nivel, nombre, nivel}) {

  return (
    <Link to={`${id_curso_nivel}`}>
      <div className="Card">
        <div className="Card-title">
          {nombre}
        </div>
        <div className="Card-description">{nivel}</div>
      </div>
    </Link>
  );
}

export { CursoCard };
