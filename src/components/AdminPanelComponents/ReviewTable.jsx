import React from "react";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import Tooltip from "./Tooltip";

const ReviewTable = () => {
  return (
    <table className="w-full table-auto bg-white shadow-lg">
      <thead>
        <tr className="bg-gray-300 text-left">
          <th className="p-4">Review By</th>
          <th>Email</th>
          <th>Posted On</th>
          <th>Rating</th>
          <th>Review Of</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="p-3">Prem Shahi</td>
          <td>premshahi@gmail.com</td>
          <td>2022-02-12</td>
          <td>3</td>
          <td className="">Food</td>
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

export default ReviewTable;
