import React, { useState, useEffect } from "react";
import Button from "../SmallComponents/Button/Button";

const CustomerProfile = ({ loggedInUser }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const fetchUserData = () => {
    fetch(`http://localhost:5000/user/${loggedInUser.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data); // Update the state with fetched user data
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
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/user/${loggedInUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User updated successfully:", data);
        fetchUserData(); // Call the fetch function again to get the updated data
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setError("Failed to update user");
      });
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
              name="first_name"
              value={user ? user.first_name : ""}
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
              name="last_name"
              placeholder="Last name"
              onChange={handleChange}
              value={user ? user.last_name : ""}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          {/* <div>
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
          </div> */}

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
              name="phone_number"
              value={user ? user.phone_number : ""}
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
