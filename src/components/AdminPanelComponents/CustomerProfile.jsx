import React, { useState, useEffect } from "react";
import Button from "../SmallComponents/Button/Button";
import { useNavigate } from "react-router-dom";

const CustomerProfile = ({ loggedInUser }) => {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    // Initialize any other fields you have
  });
  const navigate = useNavigate();

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
    <div className=" bg-white md:flex-[0.7] shadow rounded-lg p-6">
      <h2 className="text-gray-700 text-2xl mb-4">Account Details</h2>
      <form className="space-y-4" onSubmit={handleSaveChanges}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={user ? user.firstName : ""}
              placeholder="First name"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              value={user ? user.lastName : ""}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={user ? user.location : ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={user ? user.email : ""}
              onChange={handleChange}
              name="email"
              placeholder="name@example.com"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={user ? user.phoneNumber : ""}
              onChange={handleChange}
              placeholder="555-123-4567"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
        </div>
        <Button type="submit" children="Save changes" />
      </form>
    </div>
  );
};

export default CustomerProfile;
