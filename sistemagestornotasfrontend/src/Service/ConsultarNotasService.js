import { ENDPOINT } from "Config/EndPoint";

const consultarRendimientoAcademicoService = ({ jwt, dataParams, id_mes }) => {
  return fetch(
    `${ENDPOINT}/consultaRendimiento/${dataParams.idPeriodo}/${dataParams.idCursoNivel}/${id_mes}`,
    {
      method: "GET",
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
};

const consultarNominaNotasService = ({ jwt, dataParams, id_mes }) => {
  return fetch(
    `${ENDPOINT}/consultaNomina/${dataParams.idPeriodo}/${dataParams.idCursoNivel}/${id_mes}`,
    {
      method: "GET",
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
};

const consultaNotasAcumuladasService = ({ jwt, dataParams }) => {
  return fetch(
    `${ENDPOINT}/consultaAcumulada/${dataParams.idPeriodo}/${dataParams.idCursoNivel}`,
    {
      method: "GET",
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
};

const consultaRecordNotasService = ({ jwt, idPeriodo, idUser }) => {
  return fetch(`${ENDPOINT}/consultarRecordNotas/${idPeriodo}/${idUser}`, {
    method: "GET",
    headers: {
      Authorization: jwt ? `Bearer ${jwt}` : "",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};

const consultaNotasActividadesService = ({ jwt, idPeriodo, idUser }) => {
  return fetch(`${ENDPOINT}/consultarNotasActividades/${idPeriodo}/${idUser}`, {
    method: "GET",
    headers: {
      Authorization: jwt ? `Bearer ${jwt}` : "",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};

export {
  consultarRendimientoAcademicoService,
  consultarNominaNotasService,
  consultaNotasAcumuladasService,
  consultaRecordNotasService,
  consultaNotasActividadesService,
};
