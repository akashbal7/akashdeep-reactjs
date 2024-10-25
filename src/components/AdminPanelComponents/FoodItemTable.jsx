import React from "react";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import Tooltip from "./Tooltip";

const FoodItemTable = () => {
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
        <tr className="border-b">
          <td className="p-3">Greek salad</td>
          <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[130px] pr-2">
            Food provides essential nutrients for overall health and well-being
          </td>
          <td>Salad</td>
          <td>Yes</td>
          <td className="">25</td>
          <td className="flex gap-2 mt-4">
            <div className="relative group">
              <FaEye className="cursor-pointer text-blue-400 text-lg" />
              <Tooltip children="View" />
            </div>
            <div className="relative group">
              <FaPen className="cursor-pointer text-yellow-400" />{" "}
              <Tooltip children="Edit" />
            </div>
            <div className="relative group">
              <FaTrash className="cursor-pointer text-red-400" />
              <Tooltip children="Delete" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FoodItemTable;
