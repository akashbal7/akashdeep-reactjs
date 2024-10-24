import React from "react";

// Modal-like component that centers its children using Tailwind
const CenterModal = ({ children }) => {
  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
        {/* Centered modal content */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 z-50">
          {children}
        </div>
      </div>
    </>
  );
};

export default CenterModal;
