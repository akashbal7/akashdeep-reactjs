import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import CustomerProfile from "./CustomerProfile";
import Cuisines from "./Cuisines";
import FoodItem from "../FoodItem/FoodItem";
import FoodItemTable from "./FoodItemTable";
import ReviewTable from "./ReviewTable";
import Button from "../SmallComponents/Button/Button";

const HomeAdminPanel = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loginUser"));
  const role = loggedInUser?.role;
  const [showActiveSidebarTab, setShowActiveSidebarTab] = useState("dashboard");
  const [showAddItemButton, setShowAddItemButton] = useState(false);
  const defaultClassWithTextBlack =
    "flex items-center gap-2 border-b pl-6 py-2 cursor-pointer";
  const defaultClassWithTextBlue =
    "text-emerald-800 bg-emerald-100 " + defaultClassWithTextBlack;

  return (
    <div className="flex min-h-screen bg-white ">
      {/* Sidebar */}
      <div className=" bg-white border-r">
        <div className="flex items-center gap-2 mb-8 p-6">
          <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
            CL
          </div>
          <h1 className="text-xl font-semibold">Codinglab</h1>
        </div>

        {role === "restaurant_owner" ? (
          <ul className="">
            <li
              className={
                showActiveSidebarTab == "dashboard"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("dashboard")}
            >
              <span className="material-icons"></span> Dashboard
            </li>
            <li
              className={
                showActiveSidebarTab == "cuisines"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("cuisines")}
            >
              <span className="material-icons"></span> Cuisines
            </li>
            <li
              className={
                showActiveSidebarTab == "fooditems"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("fooditems")}
            >
              <span className="material-icons"></span> Food Items
            </li>
            <li
              className={
                showActiveSidebarTab == "reviews"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("reviews")}
            >
              <span className="material-icons"></span> Reviews
            </li>
          </ul>
        ) : (
          <ul>
            <li
              className={
                showActiveSidebarTab == "dashboard"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("dashboard")}
            >
              <span className="material-icons"></span> Profile
            </li>
            <li
              className={
                showActiveSidebarTab == "cuisines"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("cuisines")}
            >
              <span className="material-icons"></span> Order History
            </li>
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search here..."
            className="border border-gray-300 rounded-md p-2 w-1/2"
          />
          {showActiveSidebarTab === "dashboard" ? (
            <></>
          ) : (
            <Button children="Add Item" />
          )}
        </div>

        {/* Recent Activity */}

        {role === "restaurant_owner" ? (
          <div className="">
            {showActiveSidebarTab === "dashboard" ? (
              <Dashboard />
            ) : showActiveSidebarTab === "cuisines" ? (
              <Cuisines />
            ) : showActiveSidebarTab === "fooditems" ? (
              <FoodItemTable />
            ) : showActiveSidebarTab === "reviews" ? (
              <ReviewTable />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <CustomerProfile loggedInUser={loggedInUser} />
        )}
      </div>
    </div>
  );
};

export default HomeAdminPanel;
