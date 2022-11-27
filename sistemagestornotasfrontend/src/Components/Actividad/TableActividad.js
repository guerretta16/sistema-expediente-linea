import React from "react";
import "./css/TableActividad.css";

const TablaActividad = ({
  infoGeneral,
  handleClickDelete,
  handleClickUpdate,
}) => {
  const handleClickTable = (e) => {
    if (e.target.getAttribute("op") === "edit") {
      handleClickUpdate(e.target.getAttribute("index"));
      console.log(e.target.getAttribute("index"))
    }
    if (e.target.getAttribute("op") === "close") {
      handleClickDelete(e.target.getAttribute("index"));
    }
  };

  return (
    <table
      className="table-custom text-sm text-left text-gray-500 dark:text-gray-400"
      onClick={handleClickTable}
    >
      <thead className="text-xs text-gray-100 uppercase dark:bg-teal-700">
        <tr className="Actividad-t-tr">
          <th scope="col" className="px-6 py-3">
            Codigo
          </th>
          <th scope="col" className="px-6 py-3">
            Nombre
          </th>
          <th scope="col" className="px-6 py-3">
            Porcentaje
          </th>
          <th scope="col" className="px-6 py-3">
            Cantidad actividades
          </th>
          <th scope="col" className="px-6 py-3">
            Opciones
          </th>
        </tr>
      </thead>
      <tbody className="Actividad-t-tbody text-gray-900 font-medium">
        {infoGeneral.actividades
          ? infoGeneral.actividades.map((actividad, index) => (
              <tr
                className="bg-gray-300 border-b dark:border-gray-400 py-10"
                key={actividad.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {actividad.codigo_actividad}
                </th>
                <td className="px-6 py-4">{actividad.nombre_actividad}</td>
                <td className="px-6 py-4">
                  {parseInt(actividad.porcentaje_actividad)}%
                </td>
                <td className="px-6 py-4">{actividad.numero_actividades}</td>
                <td className="px-6 py-4 td-grid">
                  <button
                    op="edit"
                    index={index}
                    className="formCustom__button mx-2"
                  >
                    Editar
                  </button>
                  <button
                    index={index}
                    op="close"
                    className="formCustom__button formCustom__button--red"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          : <tr>
              <td>
                "No hay actividades"
              </td>
            </tr>}
      </tbody>
    </table>
  );
};

export { TablaActividad };
