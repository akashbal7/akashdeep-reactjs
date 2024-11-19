import React, { useState, useEffect } from "react";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import Tooltip from "./Tooltip";

const Cuisines = ({ loggedInUser }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(`${API_BASE_URL}/restaurant/${loggedInUser.restaurant_id}/categories`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setCategories(data.data);
          console.log("categories000", data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Categories:", error);
      });
  };

  return (
    <table className="w-full table-auto bg-white shadow-lg">
      <thead>
        <tr className="bg-gray-300 text-left">
          <th className="p-4">Number</th>
          <th className="p-4">Name</th>
          <th>description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {categories.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="p-3">{item.id}</td>
            <td className="p-3">{item.name}</td>
            <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[130px] pr-2">
              {item.description}
            </td>
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

export default Cuisines;
