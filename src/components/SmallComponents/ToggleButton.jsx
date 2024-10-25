import React from "react";

const ToggleButton = ({ children, handleToggleChange, isEnabled }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isEnabled}
        onChange={handleToggleChange}
        className="sr-only peer"
      />
      <div
        className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 ${
          isEnabled ? "peer-checked:bg-blue-600" : ""
        }`}
      >
        <div
          className={`absolute top-[2px] ${
            isEnabled ? "translate-x-full rtl:-translate-x-full" : ""
          } start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all dark:border-gray-600`}
        ></div>
      </div>
      <span className="ms-3 text-sm font-medium text-gray-400 dark:text-gray-300">
        {children}
      </span>
    </label>
  );
};

export default ToggleButton;
