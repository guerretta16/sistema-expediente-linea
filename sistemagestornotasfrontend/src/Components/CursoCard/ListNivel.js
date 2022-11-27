import React from "react";
import "./css/ListNivel.css";

function ListNivel({ niveles, handleClick }) {
  return (
    <React.Fragment>
      {niveles ? (
        niveles.map((nivel) => (
          <li 
            key={nivel.id}
            className="Niveles-list_item"
            value={nivel.id}
            onClick={handleClick}
          >{nivel.codigo_nivel}</li>
        ))
      ) : (
        <li className="Niveles-list_item">Vacío</li>
      )}
    </React.Fragment>
  );
}

export { ListNivel };
