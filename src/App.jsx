import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Watch from "./components/pages/Watch";
import Rewind from "./components/pages/Rewind";
import Sketch from "./components/pages/Sketch";
import Gabagool from "./components/pages/Gabagool";
import About from "./components/pages/About";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="flex md:h-dvh w-dvw flex-col items-center justify-between bg-primary py-8 font-sans">
      <Header />
      <div className="container px-4 mx-auto md:max-h-[556px] ">
        <div className="flex flex-col xl:flex-row flex-nowrap justify-center rounded-2xl h-full ambient brd-gradient">
        <div className="grow aspect-video bg-white h-full">
      <Routes>
          <Route exact path="/" element={<Watch />} />
          <Route path="/rewind" element={<Rewind />} />
          <Route path="/sketch" element={<Sketch />} />
          <Route path="/gabagool" element={<Gabagool />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <div className="h-full rounded-r-xl "><Chat /></div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
