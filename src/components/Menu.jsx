import React, { useState } from "react";
import { Link } from 'react-router-dom';
import finger from "../assets/icons/finger-down.svg";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuOptions = [
    { path: "/", label: "Watch" },
    { path: "/rewind", label: "Rewind" },
    { path: "/sketch", label: "Sketch" },
    { path: "/gabagool", label: "Gabagool" },
    { path: "/about", label: "About" },
  ];

  // We remove the motion component for simplicity, focusing on Tailwind for responsiveness
  return (
    <nav className="lg:w-2/5 w-full max-md:flex max-md:flex-col max-md:items-center max-md:gap-4 mb-8 md:mb-0">
      <div className="md:hidden flex justify-end">
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={finger} alt="Toggle menu" className="w-8 invert" />
        </button>
      </div>
      {/* For larger screens, always show the menu. On smaller screens, show/hide based on state. */}
      <ul className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center justify-between gap-4 md:p-4`}>
        {menuOptions.map((option, index) => (
          <li key={index} className="font-microbrew-regular text-white text-2xl leading-normal text-center">
            <Link to={option.path}>{option.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
