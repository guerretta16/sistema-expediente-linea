import React, {useEffect, useState} from "react";
import { useRegistroNota } from "Hooks/useRegistroNota";
import { useCursoNivelMes } from "Hooks/useCursoNivelMes";
import { Loader } from "Components/Loader";
import { LineasActividadList } from "./LineasActividadList";
import { Formulario } from "./Formulario";
import Modal from "../Modal";
import './index.css';
import { InfoGeneral } from "./InfoGeneral";

function CargaNotas() {
  const { lineasActividad, registrerNota, loading, loadingForm, messageLog, saveSucces } =
    useRegistroNota();

  const { meses, idCargaAcademica } =
    useCursoNivelMes();

  const [showModal, setShowModal] = useState(false);
  const [heightC, setHeigtC] = useState("");
  const [widthC, setWidthC] = useState("");
  const [idLinea, setIdLinea] = useState(0);
  const [mes, setMes] = useState(0);

  const handlePost = (valueArray) => {
    setHeigtC("300px");
    setWidthC("470px");
    setShowModal(true);
    setIdLinea(valueArray[0]);
    setMes(valueArray[1]);
  };

  const handleRegister = d =>{
    registrerNota({data: d, id: idLinea});
  }

  const onClose = () =>{
    setShowModal(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setShowModal(false);
    }, 2200);
  }, [saveSucces])

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="Carga-notas-container">
      {
          showModal?(
            <Modal
              heightC={heightC}
              widthC={widthC}
            >
              <Formulario
                meses={meses}
                mes={mes}
                idCargaAcademica={idCargaAcademica}
                idLinea={idLinea} 
                onClose={onClose}
                onStore={handleRegister}
                messageLog={messageLog}
                loading={loadingForm}
              />
            </Modal>
          ):""
      }
        <InfoGeneral info={lineasActividad.infoGeneral}/>
        <LineasActividadList 
          data={lineasActividad}
          handlePost={handlePost}
        />
    </div>
  );
}

export { CargaNotas };
