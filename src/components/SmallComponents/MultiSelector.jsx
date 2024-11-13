import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

const MultiSelector = ({ categories, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (category) => {
    setSelectedOptions((prev) =>
      prev.includes(category.id)
        ? prev.filter((id) => id !== category.id)
        : [...prev, category.id]
    );
  };

  useEffect(() => {
    onSelectionChange(selectedOptions); // Pass selected category IDs to parent component
  }, [selectedOptions, onSelectionChange]);

  const isSelected = (option) => selectedOptions.includes(option.id);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        className="w-full text-left border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center"
      >
        <span className="text-gray-400">
          {selectedOptions.length > 0
            ? selectedOptions
                .map(
                  (id) =>
                    categories.find((category) => category.id === id)?.name
                )
                .join(", ")
            : "Select multiple options..."}
        </span>
        <span>&#9662;</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={(e) => {
                e.preventDefault();
                handleOptionClick(category);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
                isSelected(category) ? "bg-gray-200" : ""
              }`}
            >
              <span>{category.name}</span>
              {isSelected(category) && (
                <span className="text-blue-500">
                  <FaCheck />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelector;
