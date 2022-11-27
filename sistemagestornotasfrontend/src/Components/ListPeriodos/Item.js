import React from "react";
import { Link } from "react-router-dom";

const Item = ({ id_periodo, codigo_periodo }) => {
  return (
    <Link to={`${id_periodo}`} className="List-periodo-item">
      {codigo_periodo}
    </Link>
  );
};

export { Item };
