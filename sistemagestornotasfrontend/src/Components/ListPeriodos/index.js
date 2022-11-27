import React from "react";
import { Outlet } from "react-router-dom";
import { usePeriodo } from "Hooks/usePeriodo";
import { Item } from "./Item";
import { Loader } from "Components/Loader";
import "./index.css";

const style = {
	"fontSize": "30px",
	"fontWeight": "bold",
	"textAlign": "center",
	"marginTop": "40px",

}
function ListPeriodos() {
  const { periodo, loading } = usePeriodo();
  
  if(loading){
      return <Loader/>
  }

  if(periodo.length === 0){
    return <p style={style}>No tiene periodos asignados</p>
  }

  return (
    <div className="Periodo-container">
      <div className="List-periodo">
        {periodo
          ? periodo.map((per) => (
              <Item
                key={per.id}
                id_periodo={per.id}
                codigo_periodo={per.codigo_periodo}
              />
            ))
          : ""}
      </div>
      <Outlet />
    </div>
  );
}

export { ListPeriodos };
