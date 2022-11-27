import { useState, useContext, useEffect } from "react";
import {
  consultarAsistenciasService,
  storeAsistenciasService,
  updateAsistenciasService,
} from "../Service/AsistenciaService";
import Context from "Context/UserContext";
import { useParams } from "react-router-dom";

function useAsistencia() {

  const { jwt } = useContext(Context);
  const [asistencia, setAsistencia] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { idPeriodo, idCursoNivel } = useParams();

  const dataParams = {
    idPeriodo: idPeriodo,
    idCursoNivel: idCursoNivel
  }

  //Select
  const consultarAsistencias = () => {
    setLoading(true);
    setError(false);
    consultarAsistenciasService({ data: dataParams, jwt }).then((data) => {
      if (data.status) {
        if (data.status === 500 || data.status === 401) {
          setError(true);
          setLoading(false);
          return;
        }
      } else {
        setAsistencia(data);
        setLoading(false);
        setError(false);
      }
    });
  };

  //Insert
  const storeAsistencias = () => {
    setLoading(true);
    storeAsistenciasService({ id_periodo: idPeriodo, id_curso_nivel: idCursoNivel, jwt })
      .then((data) => {
        if (data.status === 500 || data.status === 401 || data.status === 403) {
          setError(true);
          setSaveSuccess(false);
          return;
        }
        return {};
      })
      .then((data) => {
        if (data.message === "Error") {
          setLoading(false);
          setSaveSuccess(false);
          setError(true);
          return;
        }
        if (data.message === "Ok") {
          setError(false);
          setSaveSuccess(true);
          setLoading(false);
          setTimeout(() => {
            setSaveSuccess(false);
          }, 1000);
          return;
        }
      });
  };

  //Actualizar
  const updateAsistencias = ({ id_asistencia }) => {
    setLoading(true);
    setSaveSuccess(false);
    updateAsistenciasService({ id_asistencia, jwt })
      .then((data) => {
        if (data.status === 200) {
          setError(false);
          setLoading(false);
          setSaveSuccess(true);
          return;
        }
        return;
      })
  };

  return {
    asistencia,
    consultarAsistencias,
    storeAsistencias,
    updateAsistencias,
    loading,
    error,
    saveSuccess
  };
}

export { useAsistencia };
