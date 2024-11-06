import React, { useState, useEffect } from "react";

const NutritionFactsForm = ({ onChange }) => {
  const [localValues, setLocalValues] = useState({
    serving_size: "",
    calories: "",
    calories_from_fat: "",
    total_fat: "",
    saturated_fat: "",
    trans_fat: "",
    cholesterol: "",
    sodium: "",
    total_carbohydrate: "",
    dietary_fiber: "",
    sugars: "",
    protein: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChange(localValues); // Only update after 300ms debounce
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Cleanup on unmount or `localValues` changes
  }, [localValues, onChange]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h1 className="text-gray-700 text-2xl mb-4">Nutrition Facts</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Serving Size
            </label>
            <input
              type="text"
              name="serving_size"
              value={localValues.serving_size}
              onChange={handleInputChange}
              placeholder="Serving Size"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Calories
            </label>
            <input
              type="number"
              name="calories"
              value={localValues.calories}
              onChange={handleInputChange}
              placeholder="Calories"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Calories From Fat
            </label>
            <input
              type="number"
              name="calories_from_fat"
              value={localValues.calories_from_fat}
              onChange={handleInputChange}
              placeholder="Calories From Fat"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Fat
            </label>
            <input
              type="number"
              name="total_fat"
              value={localValues.total_fat}
              onChange={handleInputChange}
              placeholder="Total Fat (g)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Saturated Fat
            </label>
            <input
              type="number"
              name="saturated_fat"
              value={localValues.saturated_fat}
              onChange={handleInputChange}
              placeholder="Saturated Fat (g)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trans Fat
            </label>
            <input
              type="number"
              name="trans_fat"
              value={localValues.trans_fat}
              onChange={handleInputChange}
              placeholder="Trans Fat (g)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cholesterol
            </label>
            <input
              type="number"
              name="cholesterol"
              value={localValues.cholesterol}
              onChange={handleInputChange}
              placeholder="Cholesterol (mg)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sodium
            </label>
            <input
              type="number"
              name="sodium"
              value={localValues.sodium}
              onChange={handleInputChange}
              placeholder="Sodium (mg)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Carbohydrate
            </label>
            <input
              type="number"
              name="total_carbohydrate"
              value={localValues.total_carbohydrate}
              onChange={handleInputChange}
              placeholder="Total Carbohydrate (g)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dietary Fiber
            </label>
            <input
              type="number"
              name="dietary_fiber"
              value={localValues.dietary_fiber}
              onChange={handleInputChange}
              placeholder="Dietary Fiber (g)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sugars
            </label>
            <input
              type="number"
              name="sugars"
              value={localValues.sugars}
              onChange={handleInputChange}
              placeholder="Sugars (g)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Protein
            </label>
            <input
              type="number"
              name="protein"
              value={localValues.protein}
              onChange={handleInputChange}
              placeholder="Protein (g)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionFactsForm;
