import React from "react";

const Button = ({
  children,
  onClick,
  color = "blue",
  className = "text-white bg-emerald-400 hover:bg-emerald-800 rounded-lg",
}) => {
  // Dynamic Tailwind classes based on color prop
  const classes = `${className} whitespace-pre mt-2 font-medium text-sm px-5 py-2.5`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
