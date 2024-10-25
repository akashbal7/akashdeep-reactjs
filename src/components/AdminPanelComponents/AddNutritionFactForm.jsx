import React, { useState } from "react";

const NutritionFactsForm = () => {
  const [formValues, setFormValues] = useState({
    servingSize: "",
    calories: "",
    caloriesFromFat: "",
    totalFat: "",
    saturatedFat: "",
    transFat: "",
    cholesterol: "",
    sodium: "",
    totalCarbohydrate: "",
    dietaryFiber: "",
    sugars: "",
    protein: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h1 className="text-gray-700 text-2xl mb-4">Nutrition Facts</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Serving Size
            </label>
            <input
              type="text"
              name="servingSize"
              value={formValues.servingSize}
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
              value={formValues.calories}
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
              name="caloriesFromFat"
              value={formValues.caloriesFromFat}
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
              name="totalFat"
              value={formValues.totalFat}
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
              name="saturatedFat"
              value={formValues.saturatedFat}
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
              name="transFat"
              value={formValues.transFat}
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
              value={formValues.cholesterol}
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
              value={formValues.sodium}
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
              name="totalCarbohydrate"
              value={formValues.totalCarbohydrate}
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
              name="dietaryFiber"
              value={formValues.dietaryFiber}
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
              value={formValues.sugars}
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
              value={formValues.protein}
              onChange={handleInputChange}
              placeholder="Protein (g)"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NutritionFactsForm;
