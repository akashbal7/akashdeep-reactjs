import React, { useState } from "react";
import Button from "./Button/Button";
import { FaCartPlus } from "react-icons/fa";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  return (
    <div className="relative flex items-center w-32">
      <div className="flex items-center space-x-2 bg-white rounded-full">
        <button
          onClick={decreaseQuantity}
          className="px-4 py-2 bg-gray-200 rounded-l-full hover:bg-orange-400"
        >
          <span className="font-semibold">-</span>
        </button>
        <span className="text-lg text-gray-500 font-semibold w-4">
          {quantity}
        </span>
        <button
          onClick={increaseQuantity}
          className="px-4 py-2  bg-gray-200 rounded-r-full hover:bg-emerald-400"
        >
          <span className="font-semibold">+</span>
        </button>
      </div>

      {quantity > 0 ? (
        <FaCartPlus className="absolute left-24 ml-6 text-black text-4xl cursor-pointer" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuantitySelector;
