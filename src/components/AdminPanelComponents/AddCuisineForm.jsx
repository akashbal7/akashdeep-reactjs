import React, { useState } from "react";
import Button from "../SmallComponents/Button/Button";
import { useAuth } from "../AuthProvider";
import ToastNotification from "../ToastNotification";

const AddCuisineForm = ({ onFoodItemAdded, children }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { loggedInUser } = useAuth();
  const [isMessagePopUpModalOpen, setIsMessagePopUpModalOpen] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [isApiSuccess, setIsApiSuccess] = useState(true);
  const [name, setName] = useState(""); // State to manage name input
  const [description, setDescription] = useState(""); // State to manage description input

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const categoryData = {
      name: name,
      description: description,
    };
    fetch(`${API_BASE_URL}/restaurant/${loggedInUser.restaurant_id}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    })
      .then((response) => {
        if (!response.ok) {
          setIsApiSuccess(false);
          setApiMessage("Unable to add Food category");
          setIsMessagePopUpModalOpen(true);
          setTimeout(() => setIsMessagePopUpModalOpen(false), 5000);
          throw new Error("Failed to add category");
        }
        return response.json(); // Parse response data
      })
      .then((data) => {
        setApiMessage(data.message);
        setIsMessagePopUpModalOpen(true);
        setTimeout(() => setIsMessagePopUpModalOpen(false), 5000);
        setName("");
        setDescription("");
        onFoodItemAdded();
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        setApiMessage(error.message || "An error occurred");
        setIsMessagePopUpModalOpen(true);
        setIsApiSuccess(false);
        setTimeout(() => setIsMessagePopUpModalOpen(false), 5000);
      });
  };

  return (
    <div className="bg-white rounded-lg mt-4">
      <h1 className="text-gray-700 text-2xl mb-4">{children}</h1>
      <form className="space-y-4" onSubmit={handleAddCategory}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Category Name"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Category Description"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
        </div>
        <Button type="submit" children="Add Item" />
      </form>
      {isMessagePopUpModalOpen && (
        <ToastNotification isSuccess={isApiSuccess} message={apiMessage} />
      )}
    </div>
  );
};

export default AddCuisineForm;
