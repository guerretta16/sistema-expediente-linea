import { useState, useContext, useEffect } from "react";
import {
  getAllActividad,
  storeActividad,
  updateActividad,
  deleteActividad,
} from "../Service/ActividadService";
import Context from "Context/UserContext";
import { useParams } from "react-router-dom";

function useActividad() {
  const { jwt } = useContext(Context);
  const [infoGeneral, setInfoGeneral] = useState({});
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorBool, setErrorBool] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(null);
  const {idPeriodo, idCursoNivel} = useParams();

  const dataParams = {
    idPeriodo: idPeriodo,
    idCursoNivel: idCursoNivel
  }

  useEffect(() => {
    setLoading(true);
    getAllActividad({ data: dataParams , jwt }).then((data) => {
      if (data.status) {
        if (data.status === 500 || data.status === 401 || data.status === 403) {
          setErrorBool(true);
          return;
        }
      } else {
        setErrorBool(false);
        setInfoGeneral(data);
        setLoading(false);
      }
    });
  }, [jwt, saveSuccess]);

  //Select
  const traerActividades = () => {
    setLoading(true);
    getAllActividad({ jwt }).then((data) => {
      if (data.status) {
        if (data.status === 500 || data.status === 401) {
          setErrorBool(true);
          return;
        }
      } else {
        setInfoGeneral(data);
        setLoading(false);
        setErrorBool(false);
      }
    });
  };

  //Insert
  const guardarActividad = ({ data }) => {
    setLoading(true);
    storeActividad({ data, jwt })
      .then((data) => {
        if (data.status === 500 || data.status === 401 || data.status === 403) {
          setErrorBool(true);
          setSaveSuccess(false);
          return;
        }
        return data.json();
      })
      .then((data) => {
        if (data.message === "Error") {
          setLoading(false);
          setSaveSuccess(false);
          setErrorMessage(data.descripcionMessage);
          return;
        }
        if (data.message === "Ok") {
          setErrorBool(false);
          setSaveSuccess(true);
          setLoading(false);
          setErrorMessage(data.descripcionMessage);
          setTimeout(() => {
            setErrorMessage(null);
            setSaveSuccess(false);
          }, 1000);
          return;
        }
      });
  };

  //Actualizar
  const actualizarActividad = ({ data }) => {
    setLoading(true);
    updateActividad({ data, jwt })
      .then((data) => {
        if (data.status === 500 || data.status === 401 || data.status === 403) {
          setErrorBool(true);
          setSaveSuccess(false);
          return;
        }
        return data.json();
      })
      .then((data) => {
        if (data.message === "Error") {
          setLoading(false);
          setSaveSuccess(false);
          setErrorMessage(data.descripcionMessage);
          return;
        }
        if (data.message === "Ok") {
          setErrorBool(false);
          setSaveSuccess(true);
          setLoading(false);
          setErrorMessage(data.descripcionMessage);
          setTimeout(() => {
            setErrorMessage(null);
            setSaveSuccess(false);
          }, 1000);
          return;
        }
      });
  };

  //Delete
  const borrarActividad = ({ data, onCLose }) => {
    setLoading(true);
    setErrorMessage("");

    deleteActividad({ data, jwt })
      .then((response) => {
        if (response.status === 500 || response.status === 401 || response.status === 403) {
          setErrorBool(true);
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "Error") {
          setLoading(false);
          setSaveSuccess(false);
          setErrorMessage(data.descripcionMessage);
          return;
        }
        if (data.message === "Ok") {
          setLoading(false);
          setSaveSuccess(true);
          setErrorMessage(data.descripcionMessage);
          setTimeout(() => {
            setErrorMessage(null);
            setSaveSuccess(false);
          }, 1000);
          return;
        }
      });

  };

  return {
    infoGeneral,
    guardarActividad,
    borrarActividad,
    actualizarActividad,
    loading,
    errorBool,
    errorMessage,
    saveSuccess,
  };
}

export { useActividad };
