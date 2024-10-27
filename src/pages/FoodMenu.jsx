import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { menu_list } from "../assets/assets";
import { assets } from "../assets/assets";
import FoodItemCounter from "../components/FoodItemCounter";
import { Link } from "react-router-dom";

const FoodMenu = () => {
  const { food_list } = useContext(StoreContext);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [showActiveSidebarTab, setShowActiveSidebarTab] = useState("Salad");
  console.log("menu list", menu_list);
  const defaultClassWithTextBlack =
    "flex items-center gap-2 border-b pl-6 py-2 cursor-pointer";
  const defaultClassWithTextBlue =
    "text-emerald-800 bg-emerald-100 " + defaultClassWithTextBlack;

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="border-r w-1/4 p-4 bg-gray-100 h-screen overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Menu Categories</h2>
        <ul className="">
          {menu_list.map((category, index) => (
            <li
              key={index}
              value={category.menu_name}
              className={
                showActiveSidebarTab == category.menu_name
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab(category.menu_name)}
            >
              {category.menu_name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by category, name, restaurant"
            className="border border-gray-300 rounded-md p-2 w-1/2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {food_list
            .filter((item) => item.category === showActiveSidebarTab)
            .map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm relative"
              >
                <Link className="mr-4" to={`/food/${item._id}`} key={item._id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover rounded-lg mr-4 cursor-pointer"
                  />
                </Link>
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  {item.description && (
                    <p className="text-sm text-gray-500">{item.description}</p>
                  )}
                  <p className="text-gray-900 font-medium">${item.price}</p>
                  <FoodItemCounter
                    id={item._id}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    assets={assets}
                  />
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default FoodMenu;
