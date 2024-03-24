import React from "react";
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="md:w-2/5">
      <ul className="relative w-full flex items-center justify-between gap-8">
        <li className="font-microbrew-regular text-white text-2xl leading-normal text-center">
          <Link to="/">Watch</Link>
        </li>
        <li className="font-microbrew-regular text-white text-2xl leading-normal text-center">
          <Link to="/rewind">Rewind</Link>
        </li>
        <li className="font-microbrew-regular text-white text-2xl leading-normal text-center">
          <Link to="/sketch">Sketch</Link>
        </li>
        <li className="font-microbrew-regular text-white text-2xl leading-normal text-center">
          <Link to="/gabagool">Gabagool</Link>
        </li>
        <li className="font-microbrew-regular text-white text-2xl leading-normal text-center">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
