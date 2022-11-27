import React, { useState } from "react";
import { NavBarOptions } from "Components/NavBarOptions";
import { useUser } from "Hooks/useUser";
import "./index.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const { logout, isLogged } = useUser();
  const [openValue, setOpenValue] = useState(false);

  const handleClick = () => {
    setOpenValue(!openValue);
  };

  const handleLogout = () =>{
    logout();
  }

  return (
    <div
      className={openValue ? "Sidebar-container" : "Sidebar-container SBclose"}
    >
      {isLogged ? (
        <div
          className={
            openValue ? "Sidebar-content" : "Sidebar-content SBcontent"
          }
          onClick={handleClick}
        >
          <div className={openValue ? "SBactive" : "Sidebar-btn"}>
            <div className="Sidebar-btn-l"></div>
          </div>
          {openValue && <Link to="/" className="Sidebar-home">Inicio</Link>}
        </div>
      ) : (
        ""
      )}
      {isLogged ? <div>{openValue ? <NavBarOptions /> : ""}</div> : ""}
      {isLogged ? (
        <div className="Sidebar-user">
          {openValue ? (
            <div className="Sidebar-user-card"></div>
          ) : (
            <div className="Sidebar-logout" onClick={handleLogout}></div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export { Sidebar };
