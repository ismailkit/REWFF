import React from "react";

function Loader() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-2.5 overflow-hidden bg-[#201619]">
      <img
        src={logo}
        className="d-block w-32 flex-shrink-0 flex-grow-0 object-cover"
      />
    </div>
  );
}

export default Loader;
