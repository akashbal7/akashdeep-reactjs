import React from "react";

const Label = ({ children, className = "", ...props }) => {
  return (
    <label htmlFor="email" className={`${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
