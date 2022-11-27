import { useState, useContext } from "react";
import {
  consultarRendimientoAcademicoService,
  consultarNominaNotasService,
  consultaNotasAcumuladasService,
  consultaRecordNotasService,
  consultaNotasActividadesService
} from "../Service/ConsultarNotasService";
import Context from "Context/UserContext";
import { useParams } from "react-router-dom";

function useConsultarNotas() {
  const { jwt, idUser } = useContext(Context);
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const {idPeriodo, idCursoNivel} = useParams();

  const dataParams = {
    idPeriodo: idPeriodo,
    idCursoNivel: idCursoNivel
  }

  //Select
  const consultarRendimientoAcademico = ({id_mes}) => {
    setLoading(true);
    consultarRendimientoAcademicoService({jwt, dataParams, id_mes})
    .then(res => {
        setDatos(res);
        setLoading(false);
        setError(false);
    })
  };

  const consultarNominaNotas = ({id_mes}) => {
    setLoading(true);
    consultarNominaNotasService({jwt, dataParams, id_mes})
    .then(res => {
        setDatos(res);
        setLoading(false);
        setError(false);
    })
  };

  const consultaNotasAcumuladas = () => {
    setLoading(true);
    consultaNotasAcumuladasService({jwt, dataParams})
    .then(res => {
        setDatos(res);
        setLoading(false);
        setError(false);
    })
  };

  const consultaRecordNotas = () => {
    setLoading(true);
    consultaRecordNotasService({jwt, idPeriodo, idUser})
    .then(res => {
        setDatos(res);
        setLoading(false);
        setError(false);
    })
  };

  const consultaNotasActividades = () => {
    setLoading(true);
    consultaNotasActividadesService({jwt, idPeriodo, idUser})
    .then(res => {
        setDatos(res);
        setLoading(false);
        setError(false);
    })
  };

  return {
    consultarRendimientoAcademico,
    consultarNominaNotas,
    consultaNotasAcumuladas,
    consultaRecordNotas,
    consultaNotasActividades,
    datos,
    loading,
    error
  };

}

export { useConsultarNotas };