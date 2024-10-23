import React from "react";

const Button = ({
  children,
  onClick,
  color = "blue",
  className = "",
  ...props
}) => {
  // Dynamic Tailwind classes based on color prop
  const baseStyles = `text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none`;
  const colorStyles = `bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`;

  return (
    <button
      onClick={onClick}
      className="text-white mt-2 bg-emerald-400 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:bg-blue-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
    >
      {children}
    </button>
  );
};

export default Button;
