import React, { useState, useEffect } from "react";
import Button from "../SmallComponents/Button/Button";
import ToggleButton from "../SmallComponents/ToggleButton";
import UploadFile from "../SmallComponents/UploadFile";
import NutritionFactsForm from "./AddNutritionFactForm";
import { useAuth } from "../AuthProvider";
import MultiSelector from "../SmallComponents/MultiSelector";

const AddFoodItemForm = ({ onFoodItemAdded, children }) => {
  const { loggedInUser } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isNutFactToggleEnabled, setIsNutFactToggleEnabled] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foodItem, setFoodItem] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    in_stock: false,
    has_nutrition_fact: false,
    nutrition_fact: {},
  });

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected image file
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleStockChange = () => {
    setFoodItem((prev) => {
      const updatedInStock = !prev.in_stock;
      setIsToggleEnabled(updatedInStock);
      return { ...prev, in_stock: updatedInStock };
    });
  };

  const handleNutritionFactsChange = (nutritionFacts) => {
    setFoodItem((prev) => ({ ...prev, nutrition_fact: nutritionFacts }));
  };

  const handleToggleNutFactChange = () => {
    setFoodItem((prev) => {
      const updatedInNutri = !prev.has_nutrition_fact;
      setIsNutFactToggleEnabled(updatedInNutri);
      return { ...prev, has_nutrition_fact: updatedInNutri };
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(
      `http://localhost:5000/restaurant/${loggedInUser.restaurant_id}/categories`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setCategories(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  };

  const handleAddFoodItem = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", foodItem.name);
    formData.append("description", foodItem.description);
    formData.append("price", foodItem.price);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("in_stock", foodItem.in_stock);
    formData.append("has_nutrition_fact", foodItem.has_nutrition_fact);
    formData.append("nutrition_fact", JSON.stringify(foodItem.nutrition_fact));
    if (imageFile) {
      formData.append("image", imageFile); // Append the image file
    }
    console.log("formdataaaaaaaaaaa", formData);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    fetch(
      `http://localhost:5000/restaurant/${loggedInUser.restaurant_id}/food`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add food item");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Food item added:", data);
        onFoodItemAdded();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-white rounded-lg mt-4">
      <h1 className="text-gray-700 text-2xl mb-4">{children}</h1>
      <form className="space-y-4" onSubmit={handleAddFoodItem}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              name="name"
              onChange={handleChange}
              value={foodItem.name}
              placeholder="Name"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={foodItem.description}
              placeholder="Description"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              required
              value={foodItem.price}
              onChange={handleChange}
              name="price"
              placeholder="Do not include dollar sign"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <MultiSelector
              required
              categories={categories}
              onSelectionChange={setSelectedCategories}
            />
          </div>

          <div>
            <ToggleButton
              isEnabled={isToggleEnabled}
              handleToggleChange={handleToggleStockChange}
              children="In Stock"
            />
          </div>
          <div>
            <ToggleButton
              isEnabled={isNutFactToggleEnabled}
              handleToggleChange={handleToggleNutFactChange}
              children="Add Nutrition Fact"
            />
          </div>
          <div>
            <UploadFile onChange={handleFileChange} children="Upload Photo" />
            <Button type="submit" children="Add Item" />
          </div>
          {isNutFactToggleEnabled && (
            <NutritionFactsForm onChange={handleNutritionFactsChange} />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddFoodItemForm;
