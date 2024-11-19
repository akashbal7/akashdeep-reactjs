import React, { useState } from "react";
import Button from "./Button/Button";
import { FaCartPlus } from "react-icons/fa";
import { useAuth } from "../AuthProvider";
import ToastNotification from "../ToastNotification";

const QuantitySelector = ({ foodItemId, colorCart = "text-black" }) => {
  const { loggedInUser } = useAuth();
  const [isMessagePopUpModalOpen, setIsMessagePopUpModalOpen] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [isApiSuccess, setIsApiSuccess] = useState(true);
  const [quantity, setQuantity] = useState(0);
  console.log("loggedInUser", loggedInUser);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };
  const addToCart = async () => {
    const payload = {
      quantity,
      food_item_id: foodItemId,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/user/${loggedInUser.id}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Item added to cart:", data);
        setIsMessagePopUpModalOpen(true);
        setApiMessage(data.message);
        setTimeout(() => setIsMessagePopUpModalOpen(false), 5000);
        setQuantity(0);
      } else {
        console.error("Failed to add item to cart:", response.statusText);
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setApiMessage(data.message);
      setIsApiSuccess(false);
      setTimeout(() => setIsMessagePopUpModalOpen(false), 5000);
    }
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

      {quantity > 0 && (
        <FaCartPlus
          onClick={addToCart}
          className={`${colorCart} absolute left-24 ml-6 text-4xl cursor-pointer`}
        />
      )}
      {isMessagePopUpModalOpen && (
        <ToastNotification isSuccess={isApiSuccess} message={apiMessage} />
      )}
    </div>
  );
};

export default QuantitySelector;
