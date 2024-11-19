import React, { useState, useContext, useEffect, useMemo } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import FoodItemCounter from "../components/FoodItemCounter";
import { Link } from "react-router-dom";
import QuantitySelector from "../components/SmallComponents/QuantitySelector";

const FoodMenu = () => {
  const [food_list, setFoodList] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [showActiveSidebarTab, setShowActiveSidebarTab] = useState("Salad");
  const defaultClassWithTextBlack =
    "flex items-center gap-2 border-b pl-6 py-2 cursor-pointer";
  const defaultClassWithTextBlue =
    "text-emerald-800 bg-emerald-100 " + defaultClassWithTextBlack;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/foods");
        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }
        const data = await response.json();
        setFoodList(data.foods); // Store foods array in context
        console.log("food_list", food_list);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log(data.data);
        setUniqueCategories(data.data); // Store foods array in context
        setShowActiveSidebarTab(data.data[0].name);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, []);

  const filteredFoodItems = useMemo(
    () =>
      food_list.filter((item) =>
        item.categories.some(
          (category) => category.name === showActiveSidebarTab
        )
      ),
    [food_list, showActiveSidebarTab]
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="border-r w-1/4 p-4 bg-gray-100 h-screen overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Menu Categories</h2>
        <ul className="">
          {uniqueCategories.map((category) => (
            <li
              key={category.id}
              value={category.name}
              className={
                showActiveSidebarTab == category.name
                  ? defaultClassWithTextBlue
                  : defaultClassWithTextBlack
              }
              onClick={() => setShowActiveSidebarTab(category.name)}
            >
              {category.name}
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
          {filteredFoodItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm relative"
            >
              <Link className="mr-4" to={`/food/${item.id}`} key={item.id}>
                <img
                  src={`data:image/png;base64,${item.image_data}`}
                  alt={item.name}
                  className="h-28 w-28 object-cover rounded-lg mr-4 cursor-pointer"
                />
              </Link>
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                {item.description && (
                  <p className="text-sm text-gray-500">{item.description}</p>
                )}
                <p className="text-gray-900 font-medium">${item.price}</p>
                <QuantitySelector foodItemId={item.id} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FoodMenu;
