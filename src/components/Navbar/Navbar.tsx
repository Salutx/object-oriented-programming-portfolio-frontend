"use client";

import Icon from "../Icon";
import Styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={Styles.Navbar}>
      <div
        className={Styles.NavbarSection}
        style={{
          justifyContent: "center",
          borderLeft: "1px solid #e6e5eb",
          borderRight: "1px solid #e6e5eb",
        }}
      >
        <div className={Styles.NavbarLogo}>
          <Icon name="vehicle" />
          <div className={Styles.NavbarLogo_Brand}>
            <p className={Styles.NavbarLogo_Label}>
              Sistema de Gerenciamento Automotivo
            </p>
            <p className={Styles.NavbarLogo_Copyright}>by Salutx</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
