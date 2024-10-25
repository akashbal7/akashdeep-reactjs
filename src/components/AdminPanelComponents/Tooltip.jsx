import React from "react";

const Tooltip = ({ children }) => {
  return (
    <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">
      {children}
    </span>
  );
};

export default Tooltip;
