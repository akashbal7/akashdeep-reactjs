import React, { useState, useEffect } from "react";
import Button from "../SmallComponents/Button/Button";
import { useNavigate } from "react-router-dom";
import Address from "./Address";

const RestaurantOwnerProfile = ({ loggedInUser }) => {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    // Initialize any other fields you have
  });
  const navigate = useNavigate();

  const restaurant = {};

  useEffect(() => {
    // Fetch users from local storage
    const usersDetail = JSON.parse(sessionStorage.getItem("users")) || [];
    console.log(loggedInUser.email);
    const foundUser = usersDetail.find((u) => u.email === loggedInUser?.email);
    setUser(foundUser);
    console.log("user", foundUser);

    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("Please log in");
      navigate("/");
    }
  }, [navigate]); // Empty dependency array ensures this runs only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const usersDetail = JSON.parse(sessionStorage.getItem("users")) || [];

    // Debugging: Log the current usersDetail array
    console.log("Current users in session:", usersDetail);

    // Remove the old user object that matches the email
    const updatedUsersDetail = usersDetail.filter(
      (u) => u.email !== user.email
    );

    // Debugging: Log the updated usersDetail array after filtering
    console.log("Updated users after removal:", updatedUsersDetail);

    // Add the updated user object to the array
    updatedUsersDetail.push(user);

    // Store the updated user list back in session storage
    sessionStorage.setItem("users", JSON.stringify(updatedUsersDetail));

    // Debugging: Log the new state of usersDetail in session storage
    console.log(
      "New users in session after update:",
      JSON.parse(sessionStorage.getItem("users"))
    );

    alert("Profile updated successfully!");
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-gray-700 text-2xl mb-4">Restaurant Details</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Restaurant Name
            </label>
            <input
              type="text"
              value={restaurant ? restaurant?.name : ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              value={restaurant ? restaurant?.description : ""}
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
              value={restaurant ? restaurant?.phone : ""}
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
              disabled
              value={restaurant ? restaurant?.email : ""}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              value={restaurant ? restaurant?.website : ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Opening Hours
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={`${
                restaurant && restaurant?.openingHours
                  ? restaurant?.openingHours?.days
                  : ""
              } ${
                restaurant && restaurant?.openingHours
                  ? restaurant.openingHours?.hours
                  : ""
              }`}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cuisine
            </label>
            <input
              type="text"
              value={restaurant ? restaurant?.cuisine : ""}
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
              value={restaurant ? restaurant?.capacity : ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
        </div>
        <Button type="button" children="Edit Profile" />
      </form>
      <div>
        <Address />
      </div>
    </div>
  );
};

export default RestaurantOwnerProfile;
