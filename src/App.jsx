import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Watch from "./components/pages/Watch";
import Rewind from "./components/pages/Rewind";
import Sketch from "./components/pages/Sketch";
import Gabagool from "./components/pages/Gabagool";
import About from "./components/pages/About";

function App() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-between bg-[#201518] py-8">
      <Header />
      <div className="container px-4 mx-auto min-h-[556px] rounded-2xl overflow-hidden">
      <div className="w-7/12 bg-white h-full">
      <Routes>
          <Route exact path="/" element={<Watch />} />
          <Route path="/rewind" element={<Rewind />} />
          <Route path="/sketch" element={<Sketch />} />
          <Route path="/gabagool" element={<Gabagool />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <div className="w-3/12 text-white h-full text-2xl"> chat engine</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
