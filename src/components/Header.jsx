import React from "react";
import logo from "../assets/images/logo.svg";
import Menu from "./Menu";
function Header() {
  return (
    <div className="container px-4 mx-auto flex flex-col items-center gap-6">
      <img src={logo} alt="REWFF&apos;S COOL LOGO" className="w-32" />
      <Menu />
    </div>
  );
}

export default Header;
