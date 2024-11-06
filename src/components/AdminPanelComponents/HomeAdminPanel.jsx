import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import CustomerProfile from "./CustomerProfile";
import Cuisines from "./Cuisines";
import FoodItem from "../FoodItem/FoodItem";
import FoodItemTable from "./FoodItemTable";
import ReviewTable from "./ReviewTable";
import Button from "../SmallComponents/Button/Button";
import OrderHistoryTable from "./OrderHistoryTable";
import RestaurantOwnerProfile from "./RestaurantOwnerProfile";
import AddFoodItemForm from "./AddFoodItemForm";
import AddCuisineForm from "./AddCuisineForm";
import { useAuth } from "../AuthProvider";

const HomeAdminPanel = () => {
  const { loggedInUser } = useAuth();
  let first_name = loggedInUser.first_name;
  let last_name = loggedInUser.last_name;

  const role = loggedInUser?.role;
  const [showActiveSidebarTab, setShowActiveSidebarTab] = useState("1");
  const [showAddItemForm, setShowAddItemForm] = useState(false);
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
            {first_name.charAt(0)}
            {last_name.charAt(0)}
          </div>
          <h1 className="text-xl font-semibold">{loggedInUser.full_name}</h1>
        </div>

        {role === "owner" ? (
          <ul className="">
            <li
              className={
                showActiveSidebarTab == "1"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("1")}
            >
              <span className="material-icons"></span> Dashboard
            </li>
            <li
              className={
                showActiveSidebarTab == "2"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => {
                setShowActiveSidebarTab("2"), setShowAddItemForm(false);
              }}
            >
              <span className="material-icons"></span> Profile
            </li>
            <li
              className={
                showActiveSidebarTab == "3"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => {
                setShowActiveSidebarTab("3"), setShowAddItemForm(false);
              }}
            >
              <span className="material-icons"></span> Cuisines
            </li>
            <li
              className={
                showActiveSidebarTab == "4"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => {
                setShowActiveSidebarTab("4"), setShowAddItemForm(false);
              }}
            >
              <span className="material-icons"></span> Food Items
            </li>
            <li
              className={
                showActiveSidebarTab == "5"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => {
                setShowActiveSidebarTab("5"), setShowAddItemForm(false);
              }}
            >
              <span className="material-icons"></span> Reviews
            </li>
          </ul>
        ) : (
          <ul>
            <li
              className={
                showActiveSidebarTab == "1"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("1")}
            >
              <span className="material-icons"></span> Dashboard
            </li>
            <li
              className={
                showActiveSidebarTab == "2"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("2")}
            >
              <span className="material-icons"></span> Profile
            </li>
            <li
              className={
                showActiveSidebarTab == "3"
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab("3")}
            >
              <span className="material-icons"></span> Order History
            </li>
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-4">
        {showAddItemForm ||
        showActiveSidebarTab === "1" ||
        showActiveSidebarTab === "2" ? (
          <></>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search here..."
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />
            {showActiveSidebarTab !== "5" && role === "owner" ? (
              (console.log("insideeee"),
              (
                <Button
                  onClick={() => {
                    setShowAddItemForm(true);
                  }}
                  children="Add Item"
                />
              ))
            ) : (
              <></>
            )}
          </div>
        )}

        {!showAddItemForm ? (
          role === "owner" ? (
            <div className="">
              {showActiveSidebarTab === "1" ? (
                <Dashboard role={role} />
              ) : showActiveSidebarTab === "2" ? (
                <RestaurantOwnerProfile loggedInUser={loggedInUser} />
              ) : showActiveSidebarTab === "3" ? (
                <Cuisines />
              ) : showActiveSidebarTab === "4" ? (
                <FoodItemTable loggedInUser={loggedInUser} />
              ) : showActiveSidebarTab === "5" ? (
                <ReviewTable />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className="">
              {showActiveSidebarTab === "1" ? (
                <Dashboard />
              ) : showActiveSidebarTab === "2" ? (
                <CustomerProfile loggedInUser={loggedInUser} />
              ) : showActiveSidebarTab === "3" ? (
                <OrderHistoryTable />
              ) : (
                <></>
              )}
            </div>
          )
        ) : showActiveSidebarTab === "3" ? (
          <AddCuisineForm children="Add Cuisine" />
        ) : showActiveSidebarTab === "4" ? (
          <AddFoodItemForm
            onFoodItemAdded={() => {
              setShowAddItemForm(false);
            }}
            children="Add Food Item"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HomeAdminPanel;
