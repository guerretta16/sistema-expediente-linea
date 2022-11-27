import React, { useEffect, useState } from "react";
import { useDocente } from "Hooks/useDocente";
import { TableDocente } from "./TableDocente";
import { Loader } from "Components/Loader";
import Modal from "../Modal";
import { FormularioDocente } from "./FormularioDocente";

const DocenteIndex = () => {
  const { docentes, newDocente, error, loading, saveSuccess } = useDocente();
  const [size, setSize] = useState({
    width: "0px",
    height: "0px"
  });
  
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    saveSuccess && setOpenModal(false);
  }, [saveSuccess])

  if(loading){
    return <Loader />
  }

  if(error){
    return <div>Error activo</div>
  }

  const modalRegister = () => {
    setSize({
        width: "600px",
        height: "auto"
    })
    setOpenModal(true);
  }

  const closeModal = () => setOpenModal(false);

  return (
    <div className="w-85 m-auto pt-8">
        {
            openModal &&
            <Modal
                heightC={size.height}
                widthC={size.width}
            >
                <FormularioDocente 
                    closeModal = {closeModal}
                    newDocente = {newDocente}
                    loading = {loading}
                    error = {error}
                />
            </Modal>
        }
        <div className="grid grid-cols-2">
            <h1 className="text-3xl font-bold text-center">Docentes</h1>
            <button className="w-fit bg-teal-700 text-white m-auto px-2 py-3 rounded hover:bg-teal-900 transition"
            onClick={modalRegister}>Registrar docente</button>
        </div>
        <TableDocente docentes={docentes} />
    </div>
  );
};

export { DocenteIndex };
