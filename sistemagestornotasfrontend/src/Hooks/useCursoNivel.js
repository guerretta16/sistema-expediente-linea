import { useState, useContext } from "react";
import { getCursosByNivel } from "Service/CursoNivelService";
import Context from "Context/UserContext";

function useCursoNivel() {
  const { jwt } = useContext(Context);

  const [cursoNivel, setCusroNivel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorPermission, setErrorPermission] = useState(false);

  const getCursosNivel = ({ id }) => {
    if (id !== undefined || id !== 0) {
      setLoading(true);
      getCursosByNivel({ jwt, id }).then((data) => {
        if (data.status) {
          if (data.status === 401) {
            setErrorPermission(true);
          }
        } else {
          data.forEach((da, index) => {
            da.index = index;
            return data;
          });
          setCusroNivel(data);
          setLoading(false);
        }
      });
    }
  };

  return {
    cursoNivel,
    loading,
    getCursosNivel,
  };
}

export { useCursoNivel };
