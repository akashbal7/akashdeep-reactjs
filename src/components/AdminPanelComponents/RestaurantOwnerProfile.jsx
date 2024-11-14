import React, { useState, useEffect } from "react";
import Button from "../SmallComponents/Button/Button";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import { useAuth } from "../AuthProvider";
import ToastNotification from "../ToastNotification";
import UploadFile from "../SmallComponents/UploadFile";

const RestaurantOwnerProfile = ({ loggedInUser }) => {
  const [isMessagePopUpModalOpen, setIsMessagePopUpModalOpen] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [isApiSuccess, setIsApiSuccess] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    restaurant: {
      name: "",
      about: "",
      description: "",
      phone_number: "",
      website: "",
      sitting_capacity: "",
      address: {
        address_line_1: "",
        address_line_2: "",
        city: "",
        country: "",
        postal_code: "",
        state: "",
      },
    },
  });
  console.log("res id", user.restaurant.id);

  const [address, setAddress] = useState({});
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected image file
  };

  const fetchUserData = () => {
    fetch(`http://localhost:5000/user/${loggedInUser.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setAddress(data.restaurant.address);
      })
      .catch((err) => {
        console.error(err.message);
        setError("Failed to fetch user data");
      });
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
  }, [loggedInUser.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      [
        "name",
        "description",
        "phone_number",
        "website",
        "about",
        "sitting_capacity",
      ].includes(name)
    ) {
      setUser((prevUser) => ({
        ...prevUser,
        restaurant: {
          ...prevUser.restaurant,
          [name]: value,
        },
      }));
    } else {
      // For other fields directly on user
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append restaurant fields to FormData
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("restaurant_name", user.restaurant.name);
    formData.append("about", user.restaurant.about);
    formData.append("phone_number", user.restaurant.phone_number);
    formData.append("website", user.restaurant.website);
    formData.append("sitting_capacity", user.restaurant.sitting_capacity);

    // Append the image if it's available
    if (imageFile) {
      formData.append("image", imageFile); // Send image file directly
    }

    fetch(`http://localhost:5000/restaurant/${loggedInUser.restaurant_id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        return response.json();
      })
      .then((data) => {
        fetchUserData();
        setIsMessagePopUpModalOpen(true);
        setApiMessage(data.message);

        // Hide the modal after 3 seconds
        setTimeout(() => setIsMessagePopUpModalOpen(false), 3000); // Call the fetch function again to get the updated data
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setApiMessage(data.message);
        setIsApiSuccess(false);
        setTimeout(() => setIsMessagePopUpModalOpen(false), 3000);
      });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-gray-700 text-2xl mb-4">Restaurant Details</h2>
      <form className="space-y-4" onSubmit={handleSaveChanges}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              value={user.restaurant.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              name="about"
              value={user.restaurant.about}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              rows="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone_number"
              value={user.restaurant.phone_number}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              disabled
              value={user.email}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={user.restaurant.website}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sitting Capacity
            </label>
            <input
              type="text"
              name="sitting_capacity"
              value={user.restaurant.sitting_capacity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <UploadFile
              onChange={handleFileChange}
              children="Upload Restaurant Photo"
            />
          </div>
        </div>
        <Button type="submit" children="Edit Profile" />
      </form>
      <div>
        <Address
          addressObj={address}
          restaurantId={loggedInUser.restaurant_id}
          addressId={user.restaurant.address.id}
        />
      </div>
      {isMessagePopUpModalOpen && (
        <ToastNotification isSuccess={isApiSuccess} message={apiMessage} />
      )}
    </div>
  );
};

export default RestaurantOwnerProfile;
