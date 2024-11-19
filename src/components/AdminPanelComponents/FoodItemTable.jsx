import React, { useState, useEffect } from "react";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import Tooltip from "./Tooltip";

const FoodItemTable = ({ loggedInUser }) => {
  const [foodItems, setFoodItems] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isMessagePopUpModalOpen, setIsMessagePopUpModalOpen] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [isApiSuccess, setIsApiSuccess] = useState(true);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = () => {
    fetch(`${API_BASE_URL}/restaurant/${loggedInUser.restaurant_id}/foods`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setFoodItems(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  };

  const handleDelete = (foodId) => {
    fetch(
      `${API_BASE_URL}/restaurant/${loggedInUser.restaurant_id}/food/${foodId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete food item");
        }
        setApiMessage(data.message);
        setIsMessagePopUpModalOpen(true);
        setTimeout(() => setIsMessagePopUpModalOpen(false), 5000);
        setFoodItems((prevItems) =>
          prevItems.filter((item) => item.id !== foodId)
        );
      })
      .catch((error) => {
        setApiMessage(error.error || "Unable to delete food item");
        setIsApiSuccess(false);
        setIsMessagePopUpModalOpen(true);
        setTimeout(() => setIsMessagePopUpModalOpen(false), 5000);
      });
  };

  return (
    <div>
      <table className="w-full table-auto bg-white shadow-lg">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="p-4">Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>In Stock</th>
            <th>price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.name}</td>
              <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[130px] pr-2">
                {item.description}
              </td>
              <td>
                {item.categories && item.categories.length > 0
                  ? item.categories.map((category) => category.name).join(", ")
                  : "No category"}
              </td>
              <td>{item.in_stock ? "Yes" : "No"}</td>
              <td>${item.price.toFixed(2)}</td>
              <td className="flex gap-2 mt-4">
                <div className="relative group">
                  <FaEye className="cursor-pointer text-blue-400 text-lg" />
                  <Tooltip children="View" />
                </div>
                <div className="relative group">
                  <FaPen className="cursor-pointer text-yellow-400" />
                  <Tooltip children="Edit" />
                </div>
                <div className="relative group">
                  <FaTrash
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer text-red-400"
                  />
                  <Tooltip children="Delete" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isMessagePopUpModalOpen && (
        <ToastNotification isSuccess={isApiSuccess} message={apiMessage} />
      )}
    </div>
  );
};

export default FoodItemTable;
