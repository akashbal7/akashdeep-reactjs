import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-100 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Revenue this month</h3>
        <p className="text-4xl font-bold">50,120</p>
      </div>
      <div className="bg-blue-100 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Revenue this week</h3>
        <p className="text-4xl font-bold">50,120</p>
      </div>
      <div className="bg-blue-100 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Food Items</h3>
        <p className="text-4xl font-bold">50,120</p>
      </div>
      <div className="bg-yellow-100 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Cuisines</h3>
        <p className="text-4xl font-bold">25,120</p>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Reviews</h3>
        <p className="text-4xl font-bold">10,320</p>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Categories</h3>
        <p className="text-4xl font-bold">10,320</p>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Meals</h3>
        <p className="text-4xl font-bold">10,320</p>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Orders</h3>
        <p className="text-4xl font-bold">10,320</p>
      </div>
    </div>
  );
};

export default Dashboard;
