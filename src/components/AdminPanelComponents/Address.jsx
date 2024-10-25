import React, { useState } from "react";
import Button from "../SmallComponents/Button/Button";

const Address = () => {
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
  });

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
      <h1 className="text-gray-700 text-2xl mb-4">Address</h1>
      <form className="space-y-4" onSubmit={handleAddAddress}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              type="text"
              name="line1"
              value={address.line1}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Line 2
            </label>
            <input
              type="text"
              name="line2"
              value={address.line1}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={address.postalCode}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
        </div>
        <Button type="submit" children="Add Address" />
      </form>
    </div>
  );
};

export default Address;
