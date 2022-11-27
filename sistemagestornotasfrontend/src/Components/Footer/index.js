import React from "react";
import uesLogo from "../../assets/img/footer/ues-logo.png";
import ministerioLogo from "../../assets/img/footer/ministerio.jpg";
import "./index.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line"></div>
      <div className="footer-grid">
        <div className="footer-img">
          <img
            src={ministerioLogo}
            alt="universidad-de-el-salvador"
            className="img-foo"
            id="imgMini"
          />
          <img
            src={uesLogo}
            alt="ministerio-de-edcuacion"
            className="img-foo"
            id="imgUes"
          />
        </div>
        <div className="footer-info">@ 2022 Universidad de El Salvador</div>
      </div>
    </footer>
  );
}

export { Footer };
