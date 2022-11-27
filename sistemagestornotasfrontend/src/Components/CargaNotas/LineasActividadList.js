import React from "react";

function LineasActividadList({ data, handlePost }) {
  function handleClickRegister(e) {
    const valueArray = e.target.value.split(',');
    handlePost(valueArray);
  }

  return (
    <div className="Carga-listActividad-table">
      {data.actividades.map((actividad, index) => (
        <div key={index}>
          <h4 className="ListActividad-title">{actividad.nombre_actividad}</h4>
          <div className="Carga-listActividad-table-head">
            <h4 className="Carga-listActividad-h">Nombre</h4>
            {data.meses.map((mes) => (
              <h4 key={mes.id} className="Carga-listActividad-h">
                {mes.codigo_mes}
              </h4>
            ))}
          </div>
          <div className="ListActividad-table">
            {actividad.lineaActividad.map((linea, index1) => (
              <div key={index1}>
                <div className="ListActividad-table-name">
                  <div className="ListActividad-table-lname">
                    {linea.nombre_linea_actividad}
                  </div>
                  {linea.registro_notas.map((nota, index3) => (
                    <React.Fragment key={index3}>
                      <div className="ListActividad-table-nota">
                        {nota.nota}
                      </div>
                      <div className="ListActividad-table-options">
                        <button
                          className="ListActividad-table-btn list-btn-reg"
                          value={[nota.id, nota.id_mes]}
                          onClick={handleClickRegister}
                        >
                          +
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { LineasActividadList };
