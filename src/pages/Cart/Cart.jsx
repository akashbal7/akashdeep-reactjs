import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import Button from "../../components/SmallComponents/Button/Button";
import { useAuth } from "../../components/AuthProvider";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { FaCircleMinus, FaCirclePlus, FaCircleXmark } from "react-icons/fa6";
import Tooltip from "../../components/AdminPanelComponents/Tooltip";

const Cart = () => {
  const { loggedInUser } = useAuth();
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart data from the API
    const fetchCartData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/user/${loggedInUser.id}/cart`
        );
        if (response.ok) {
          const result = await response.json();
          setCartData(result.data);
          console.log("data", result.data);
        } else {
          console.error("Failed to fetch cart data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    // Calculate subtotal whenever cartData changes
    const newSubtotal = cartData.reduce(
      (total, item) => total + item.food_item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [cartData]);

  const updateQuantity = async (itemId, foodItemId, newQuantity) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/${loggedInUser.id}/cart/${itemId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantity: newQuantity,
            food_item_id: foodItemId,
          }),
        }
      );

      if (response.ok) {
        const updatedItem = await response.json();
        setCartData((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        console.error("Failed to update cart item:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/${loggedInUser.id}/cart/${itemId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setCartData((prev) => prev.filter((item) => item.id != itemId));
      } else {
        console.error("Failed to delete cart item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const incrementQuantity = (itemId, foodItemId, currentQuantity) => {
    updateQuantity(itemId, foodItemId, currentQuantity + 1);
  };

  const decrementQuantity = (itemId, foodItemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, foodItemId, currentQuantity - 1);
    }
  };

  return (
    <div className="mt-20">
      {cartData.length == 0 ? (
        <div>No cart items</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="p-3">Items</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th className="text-right"></th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3 w-60">
                  <img
                    src={`data:image/png;base64,${item.food_item.image_data}`}
                    alt="image"
                    className="w-40 rounded-xl"
                  />
                </td>
                <td>{item.food_item.name}</td>
                <td>${item.food_item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.food_item.price * item.quantity).toFixed(2)}</td>
                <td className="flex mt-16 justify-center">
                  <div className="relative group">
                    <FaCircleMinus
                      onClick={() =>
                        decrementQuantity(
                          item.id,
                          item.food_item.id,
                          item.quantity
                        )
                      }
                      className="cursor-pointer mr-4 text-orange-500 text-2xl"
                    />
                    <Tooltip children="Remove" />
                  </div>
                  <div className="relative group">
                    <FaCirclePlus
                      onClick={() =>
                        incrementQuantity(
                          item.id,
                          item.food_item.id,
                          item.quantity
                        )
                      }
                      className="cursor-pointer mr-4 text-emerald-500 text-2xl"
                    />
                    <Tooltip children="Add" />
                  </div>
                  <div className="relative group">
                    <FaCircleXmark
                      onClick={() => deleteCartItem(item.id)}
                      className="cursor-pointer text-red-500 text-2xl"
                    />
                    <Tooltip children="Delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>HST 13%</p>
              <p>${(subtotal * 0.13).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${(subtotal * 1.13).toFixed(2)}</b>
            </div>
          </div>
          <Button children="PROCEED TO CHECKOUT" />
        </div>
        <div className="cart-promocode"></div>
      </div>
    </div>
  );
};

export default Cart;
