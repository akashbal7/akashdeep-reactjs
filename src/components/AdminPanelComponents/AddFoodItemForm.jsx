import React, { useState } from "react";
import Button from "../SmallComponents/Button/Button";
import ToggleButton from "../SmallComponents/ToggleButton";

const AddFoodItemForm = ({ children }) => {
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);

  const handleToggleChange = () => {
    setIsToggleEnabled((prevState) => {
      const newState = !prevState;
      return newState;
    });
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    // Handle the add address action here (e.g., save to database or display)
    console.log("Address added:", address);
  };

  return (
    <div className="bg-white rounded-lg mt-4">
      <h1 className="text-gray-700 text-2xl mb-4">{children}</h1>
      <form className="space-y-4" onSubmit={handleAddAddress}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Do not include dollar sign"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              placeholder="Category here eg. Salad, Indian"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <ToggleButton
              isEnabled={isToggleEnabled}
              handleToggleChange={handleToggleChange}
              children="In Stock"
            />
          </div>
        </div>
        <Button type="submit" children="Add Item" />
      </form>
    </div>
  );
};

export default AddFoodItemForm;
