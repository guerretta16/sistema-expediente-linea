import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { actividadData } from "Service/actividadData";
import "./css/Formulario.css";

const Formulario = ({
  onClose,
  onStore,
  onUpdate,
  loading,
  errorMessage,
  dataUpdate,
}) => {
  
  const {idPeriodo, idCursoNivel} = useParams();

  const [dataForm, setDataFrom] = useState(() => {
    return dataUpdate
      ? {
          id: dataUpdate.id,
          nombre_actividad: dataUpdate.nombre_actividad,
          codigo_actividad: dataUpdate.codigo_actividad,
          porcentaje_actividad: parseInt(dataUpdate.porcentaje_actividad),
          id_curso_nivel: dataUpdate.id_curso_nivel,
          id_periodo: dataUpdate.id_periodo,
          numero_actividades: "",
        }
      : {
          nombre_actividad: "",
          codigo_actividad: "",
          porcentaje_actividad: "",
          id_curso_nivel: idCursoNivel,
          id_periodo: idPeriodo,
          numero_actividades: "",
        };
  });

  const handleChange = (e) => {
    setDataFrom({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    if (e.target.value === "") {
      return;
    } else {
      setDataFrom({
        ...dataForm,
        nombre_actividad: actividadData[e.target.selectedOptions[0].getAttribute('dbindex')].nombre,
        codigo_actividad: actividadData[e.target.selectedOptions[0].getAttribute('dbindex')].codigo,
      });
    }
  };

  const setData = () => {
    return actividadData.map((data, index) => {
      return (
        <option key={data.id} value={data.codigo} dbindex={index}>
          {data.nombre}
        </option>
      );
    });
  };

  const handleKeyUp = (e) => {
    const code = e.charCode ? e.charCode : e.keyCode;
    if ((code >= 48 && code <= 57) || code === 8) {
      return;
    } else {
      e.preventDefault();
      return;
    }
  };

  const handleSubmit = () => {
    console.log(dataForm);
    onStore(dataForm);
  };

  const handleUpdate = () => {
    onUpdate(dataForm);
  };

  return (
    <div className="Actividad-form-container">
      <h1 className="Actividad-form-title">
        {!dataUpdate ? "Registrar actividad" : "Editar actividad"}
      </h1>
      <form className="Form-actividad">
        <div className="form-group">
          <select
            name="nombre_actividad"
            className="form-input"
            onChange={handleSelect}
            defaultValue={dataUpdate ? `${dataForm.codigo_actividad}` : ""}
          >
            <option value="" dbindex="">Seleccione un tipo</option>
            {setData()}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="porcentaje_actividad"
            className="form-input"
            placeholder="Porcentaje general"
            value={dataForm.porcentaje_actividad}
            onChange={handleChange}
            onKeyDown={handleKeyUp}
          />
        </div>
        <div className="form-group">
          {!dataUpdate && (
            <input
              type="text"
              name="numero_actividades"
              className="form-input"
              placeholder="Número de actividades"
              value={dataForm.numero_actividades}
              onChange={handleChange}
              onKeyDown={handleKeyUp}
            />
          )}
        </div>
        {errorMessage && <p className="formCustom__error">{errorMessage}</p>}
        <div className="form-group btns">
          <button
            type="button"
            className="btn-form btn-sub"
            onClick={!dataUpdate ? handleSubmit : handleUpdate}
          >
            {loading ? "Cargando..." : "Guardar"}
          </button>
          <button type="button" className="btn-form btn-can" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export { Formulario };
