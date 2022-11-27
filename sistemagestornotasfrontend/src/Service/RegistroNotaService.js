import { ENDPOINT } from "Config/EndPoint";

const registrarNota = ({ data, jwt, id }) => {
  return(
    fetch(`${ENDPOINT}/registrarNota/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(data),
    }).then((response) => response)
  )
}

export {registrarNota}