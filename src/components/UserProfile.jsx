import React from "react";
import Button from "./SmallComponents/Button/Button";

const UserProfile = () => {
  return (
    <div className="flex justify-center lg:justify-start p-6 space-y-4 lg:space-y-0 lg:space-x-6">
      <div className=" flex-1 md:flex-[0.3] bg-white shadow rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150" // Replace with dynamic image URL
            alt="User Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <p className="text-gray-600 text-sm">
            JPG or PNG no larger than 5 MB
          </p>
          <Button children="Upload new image" />
        </div>
      </div>

      {/* Account Details Section */}
      <div className=" bg-white md:flex-[0.7] shadow rounded-lg p-6">
        <h2 className="text-gray-700 text-xl mb-4">Account Details</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="username"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                placeholder="Location"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization name
              </label>
              <input
                type="text"
                placeholder="Organization name"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
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
                placeholder="555-123-4567"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <input type="date" className="mt-1 p-2 w-full border rounded" />
            </div>
          </div>
          <Button children="Save changes" />
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
