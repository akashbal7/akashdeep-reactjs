import React from 'react';

const Button = ({ 
  children, 
  color = 'blue', 
  className = '', 
  ...props 
}) => {
  // Dynamic Tailwind classes based on color prop
  const baseStyles = `text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none`;
  const colorStyles = `bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`;

  return (
    <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {children}
    </button>
  );
};

export default Button;
  