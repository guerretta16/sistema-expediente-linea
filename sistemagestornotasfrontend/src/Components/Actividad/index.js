import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formulario } from "./Formulario";
import { useActividad } from "Hooks/useActividad";
import { TablaActividad } from "./TableActividad";
import { AlertMessage } from "Components/AlertMessage/alertMessage";
import Modal from "../Modal";
import "./css/index.css";

const Actividad = () => {
  const [showModal, setShowModal] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [heightC, setHeigtC] = useState("");
  const [widthC, setWidthC] = useState("");
  const [idDel, setIdDel] = useState(null);
  const navigate = useNavigate();

  const {
    infoGeneral,
    guardarActividad,
    borrarActividad,
    actualizarActividad,
    loading,
    errorBool,
    errorMessage,
    saveSuccess,
  } = useActividad();

  useEffect(() => {
    if (errorBool) {
      navigate("/error403");
    }
    if(saveSuccess){
      onClose();
    }
  }, [errorBool, navigate, saveSuccess]);

  const handleSubmit = (d) => {
    guardarActividad({ data: d });
  };

  const handleUpdate = (d) =>{
    actualizarActividad({ data:d })
  }

  const onClose = () =>{
    setShowModal(false);
  }

  const handlePost = () => {
    setHeigtC("350px");
    setWidthC("580px");
    setIsForm(true);
    setShowModal(true);
    setIdDel(null);
  };

  const handleClickDelete = (id) => {
    setHeigtC("200px");
    setWidthC("530px");
    setIsForm(false);
    setIdDel(id);
    setShowModal(true);
  };

  const handleClickUpdate = (id) =>{
    setHeigtC("300px");
    setWidthC("530px");
    setIdDel(id);
    setIsForm(true);
    setShowModal(true);
  }


  return (
    <div className="Actividad-container">
      {showModal ? (
        <Modal
          heightC={heightC}
          widthC={widthC}
        >
          {isForm ? (
            <Formulario
              onClose={onClose}
              onStore={handleSubmit}
              onUpdate={handleUpdate}
              loading={loading}
              errorMessage={errorMessage}
              dataUpdate={infoGeneral.actividades[idDel]}
            />
          ) : (
            <AlertMessage
              title="Eliminar actividad"
              descripction="¿Desea eliminar la actividad?"
              onClose={onClose}
              onEvent={borrarActividad}
              dataUpdate={{ id: infoGeneral.actividades[idDel].id }}
              loading={loading}
            />
          )}
        </Modal>
      ) : (
        ""
      )}
      <div className="Actividad-grid">
        <div className="grid grid-cols-2 items-center">
          <button className="Actividad-btn" onClick={handlePost}>
            Registrar nueva actividad
          </button>
          <div className="font-bold text-sm border-b-4 border-b-teal-700 text-gray-800 py-1 px-5">
            {infoGeneral.cursoInfo && infoGeneral.cursoInfo.nombre_curso} {infoGeneral.cursoInfo && infoGeneral.cursoInfo.nombre_nivel}
          </div>
        </div>
        <TablaActividad
          infoGeneral={infoGeneral}
          handleClickDelete={handleClickDelete}
          handleClickUpdate={handleClickUpdate}
        />
      </div>
    </div>
  );
};

export { Actividad };
