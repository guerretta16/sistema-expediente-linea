import { Link } from "react-router-dom";
import {selectOption } from 'Service/OptionNavbar';
import { useContext } from 'react';
import Context from "Context/UserContext";

function ListOptions() {
  const { nombreRol } = useContext(Context);
  const values = selectOption({ value: nombreRol});

  return values.map((rut) => (
    <Link to={rut.ruta} key={rut.id} className="NavBar-item-content">
      <li className="NavBar-item">{rut.nombre}</li>
    </Link>
  ));
}

export { ListOptions };
