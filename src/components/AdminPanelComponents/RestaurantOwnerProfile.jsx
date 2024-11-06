import React, { useState, useEffect } from "react";
import Button from "../SmallComponents/Button/Button";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import { useAuth } from "../AuthProvider";

const RestaurantOwnerProfile = ({ loggedInUser }) => {
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
        setError("Failed to fetch user data"); // Set error state
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
    fetch(`http://localhost:5000/restaurant/${loggedInUser.restaurant_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        about: user.restaurant.about,
        phone_number: user.restaurant.phone_number,
        restaurant_name: user.restaurant.name,
        sitting_capacity: user.restaurant.sitting_capacity,
        website: user.restaurant.website,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        return response.json();
      })
      .then((data) => {
        fetchUserData(); // Call the fetch function again to get the updated data
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setError("Failed to update user");
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
    </div>
  );
};

export default RestaurantOwnerProfile;
