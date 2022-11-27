import { ENDPOINT } from "Config/EndPoint";

const consultarAsistenciasService = ({ data, jwt }) => {
  return fetch(`${ENDPOINT}/consultarAsistencias/${data.idPeriodo}/${data.idCursoNivel}`, {
    method: "GET",
    headers: {
      Authorization: jwt ? `Bearer ${jwt}` : "",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};

const storeAsistenciasService = ({ id_periodo, id_curso_nivel, jwt }) => {
  return fetch(`${ENDPOINT}/storeAsistencia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({id_periodo, id_curso_nivel}),
  }).then((response) => response);
};

const updateAsistenciasService = ({ id_asistencia, jwt }) => {
  return fetch(`${ENDPOINT}/updateAsistencia/${id_asistencia}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((response) => response);
};

export {
  consultarAsistenciasService,
  storeAsistenciasService,
  updateAsistenciasService,
};
