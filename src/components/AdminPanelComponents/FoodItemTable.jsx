import React, { useState, useEffect } from "react";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import Tooltip from "./Tooltip";

const FoodItemTable = ({ loggedInUser }) => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = () => {
    fetch(
      `http://localhost:5000/restaurant/${loggedInUser.restaurant_id}/foods`
    )
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
      `http://localhost:5000/restaurant/${loggedInUser.restaurant_id}/food/${foodId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete food item");
        }
        // Filter out the deleted item from the list without re-fetching
        setFoodItems((prevItems) =>
          prevItems.filter((item) => item.id !== foodId)
        );
      })
      .catch((error) => {
        console.error("Error deleting food item:", error);
      });
  };

  return (
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
            <td>{item.category}</td>
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
  );
};

export default FoodItemTable;
