import React, { useState, useEffect } from "react";
import Button from "../SmallComponents/Button/Button";
import ToastNotification from "../ToastNotification";

const Address = ({ addressObj, restaurantId, addressId }) => {
  if (!addressObj) {
    return <div>No address available.</div>; // Render a message when address is missing
  }
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isMessagePopUpModalOpen, setIsMessagePopUpModalOpen] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [isApiSuccess, setIsApiSuccess] = useState(true);
  const [address, setAddress] = useState({
    address_line_1: addressObj?.address_line_1 || "",
    address_line_2: addressObj?.address_line_2 || "",
    city: addressObj?.city || "",
    country: addressObj?.country || "",
    postal_code: addressObj?.postal_code || "",
    state: addressObj?.state || "",
    id: addressObj?.id || null,
  });
  console.log("addressObj");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setAddress({
      address_line_1: addressObj?.address_line_1 || "",
      address_line_2: addressObj?.address_line_2 || "",
      city: addressObj?.city || "",
      country: addressObj?.country || "",
      postal_code: addressObj?.postal_code || "",
      state: addressObj?.state || "",
      id: addressObj?.id || null,
    });
  }, [addressObj]);

  const handleSaveAddress = (e) => {
    e.preventDefault();

    // Prepare the updated address data to send in the PUT request
    const updatedAddress = {
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      city: address.city,
      country: address.country,
      postal_code: address.postal_code,
      state: address.state,
    };

    if (!restaurantId || !addressId) {
      console.error("Invalid restaurantId or addressId");
      return;
    }

    // Send the PUT request to update the address
    fetch(`${API_BASE_URL}/restaurant/${restaurantId}/address/${addressId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAddress),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update address");
        }
        return response.json();
      })
      .then((data) => {
        setApiMessage(data.message);
        setIsMessagePopUpModalOpen(true);
        setTimeout(() => setIsMessagePopUpModalOpen(false), 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setApiMessage(data.error || "Unable to Update Address");
        setIsApiSuccess(false);
        setIsMessagePopUpModalOpen(true);
        setTimeout(() => setIsMessagePopUpModalOpen(false), 5000);
      });
  };

  return (
    <div className="bg-white rounded-lg mt-4">
      <h1 className="text-gray-700 text-2xl mb-4">Address</h1>
      <form className="space-y-4" onSubmit={handleSaveAddress}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              type="text"
              name="address_line_1"
              required
              value={address ? address?.address_line_1 : ""}
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
              name="address_line_2"
              value={address ? address?.address_line_2 : ""}
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
              required
              name="city"
              value={address ? address?.city : ""}
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
              required
              name="state"
              value={address ? address?.state : ""}
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
              required
              name="postal_code"
              value={address ? address?.postal_code : ""}
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
              required
              name="country"
              value={address ? address?.country : ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
        </div>
        <Button type="submit" children="Add Address" />
      </form>
      {isMessagePopUpModalOpen && (
        <ToastNotification isSuccess={isApiSuccess} message={apiMessage} />
      )}
    </div>
  );
};

export default Address;
