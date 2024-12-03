import React, { useEffect, useState, useRef } from "react";
import "./FoodCard.css";
import { useParams } from "react-router-dom";
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";
import ImageComponent from "../SmallComponents/ImageComponent/ImageComponent";
import SeeReviews from "../SeeReviews";
import CenterModal from "../SmallComponents/CenterModal";
import RatingForm from "../RatingForm";
import QuantitySelector from "../SmallComponents/QuantitySelector";
import Spinner from "../SmallComponents/Spinner";

const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [nutrition, setNutritionFact] = useState(null);
  const [isGiveReviewModalOpen, setIsGiveReviewModalOpen] = useState(false); // Modal visibility state
  const [isSeeReviewModalOpen, setIsSeeReviewModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // Fetch product details from API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/restaurant/3/food/${id}`);
        const data = await response.json();
        setProduct(data); // Set the fetched data to product state
        if (data.has_nutrition_fact) {
          setNutritionFact(data.nutrition_facts);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // Function to close the modal when clicking outside
  const handleClickOutside = (event) => {
    console.log("clickeddddddddddddddd handleClickOutside");
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsGiveReviewModalOpen(false);
      setIsSeeReviewModalOpen(false);
    }
  };

  useEffect(() => {
    if (isGiveReviewModalOpen || isSeeReviewModalOpen) {
      // Add event listener when modal is opened
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isGiveReviewModalOpen, isSeeReviewModalOpen]);

  const handleOpenGiveReviewModal = () => {
    setIsGiveReviewModalOpen(true);
    console.log("clickeddddddddddddddd");
  };

  const handleOpenSeeReviewModal = () => {
    setIsSeeReviewModalOpen(true);
    console.log("clickeddddddddddddddd");
  };

  const handleCloseModal = () => {
    setIsGiveReviewModalOpen(false);
    setIsSeeReviewModalOpen(false);
  };
  if (!product) {
    return <Spinner />;
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex mb-4 flex-col md:flex-row">
        <div className="flex-1 flex-[0.6] rounded-2xl overflow-hidden w-full h-full md:w-1/2 shadow-slate-300 shadow-lg">
          <ImageComponent
            src={`data:image/png;base64,${product?.image_data}`}
          />
        </div>

        <div className="flex-1 md:flex-[0.4] md:w-1/2 ml-4 flex flex-col justify-between">
          <div className="border-b mb-2 pb-2 relative">
            <div className="flex justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="text-sm flex text-gray-500">
                  <Rating rating={product.average_rating} />
                  <span className="ml-2">{product.total_reviews} reviews</span>
                </div>
                <p className="text-gray-500">
                  {product.categories && product.categories.length > 0
                    ? product.categories
                        .map((category) => category.name)
                        .join(", ")
                    : "No category"}
                </p>
                <p className="text-gray-500">{product.description}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-800">
                  ${product.price}
                </p>
                <p className="text-green-600 font-medium">
                  {product.in_stock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
            <QuantitySelector foodItemId={product.id} />
          </div>

          {product.has_nutrition_fact ? (
            <div className="">
              <div className="bg-gray-100 p-2 rounded-2xl shadow-slate-300 shadow-lg">
                <h3 className="text-xl font-semibold">Nutrition Facts</h3>
                <p className="text-sm text-gray-600">Serving Size about 82g</p>

                <div className="border-t border-black mt-1"></div>
                <div className="text-sm">
                  <p className="flex justify-between">
                    <span>Calories {nutrition.calories || "N/A"}</span>
                    <span>
                      Calories from Fat {nutrition.calories_from_fat || "N/A"}
                    </span>
                  </p>
                  <div className="border-t border-black my-1"></div>
                  <div className="flex justify-end">
                    <span className="">% daily value</span>
                  </div>
                  <p className="flex justify-between">
                    <span>Total Fat {nutrition.total_fat_g || "N/A"}g</span>
                    <span>{nutrition.total_fat_percent || "N/A"}%</span>
                  </p>
                  <p className="flex justify-between ml-4 text-gray-500">
                    <span>
                      Saturated Fat {nutrition.saturated_fat_g || "N/A"}g
                    </span>
                    <span>{nutrition.saturated_fat_percent || "N/A"}%</span>
                  </p>
                  <p className="flex justify-between">
                    <span>
                      Cholesterol {nutrition.cholesterol_mg || "N/A"}mg
                    </span>
                    <span>{nutrition.cholesterol_percent || "N/A"}%</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sodium {nutrition.sodium_mg || "N/A"}mg</span>
                    <span>{nutrition.sodium_percent || "N/A"}%</span>
                  </p>
                  <p className="flex justify-between">
                    <span>
                      Total Carbohydrate{" "}
                      {nutrition.total_carbohydrate_g || "N/A"}g
                    </span>
                    <span>{nutrition.carbohydrate_percent || "N/A"}%</span>
                  </p>
                  <p className="flex justify-between ml-4 text-gray-500">
                    <span>
                      Dietary Fiber {nutrition.dietary_fiber_g || "N/A"}g
                    </span>
                    <span>{nutrition.fiber_percent || "N/A"}%</span>
                  </p>
                  <p className="flex justify-between ml-4 text-gray-500">
                    <span>Sugars {nutrition.sugars_g || "N/A"}g</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Protein {nutrition.protein_g || "N/A"}g</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 p-2 rounded-2xl shadow-slate-300 shadow-lg">
              <h3 className="text-xl font-semibold">Nutrition Facts</h3>
              <div className="h-56 grid content-center flex justify-center">
                <p>Nutrition Fact not available</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex-1 md:flex-[0.3]"></div>
        </div>
      </div>

      <div className="flex">
        <div className="p-4 border flex-1 md:flex-[0.3] rounded-2xl shadow-slate-300 shadow-lg h-full">
          <h2 className="text-lg font-semibold">Rating and Reviews</h2>

          <div className="flex justify-start">
            <Rating rating={product.average_rating} />
            <span className="ml-2"> {product.total_reviews} reviews</span>
          </div>
          <div className="mt-2">
            <div className="flex justify-between">
              <span>Taste</span>
              <Rating rating={product.taste_rating} />
            </div>
            <div className="flex justify-between">
              <span>Texture</span>
              <Rating rating={product.texture_rating} />
            </div>
            <div className="flex justify-between">
              <span>Quality of Ingredients</span>
              <Rating rating={product.quality_rating} />
            </div>
            <div className="flex justify-between">
              <span>Presentation</span>
              <Rating rating={product.presentation_rating} />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button
              onClick={handleOpenGiveReviewModal}
              children="Give Review"
            />
            <Button onClick={handleOpenSeeReviewModal} children="See Reviews" />
          </div>
        </div>
      </div>
      {isGiveReviewModalOpen && (
        <CenterModal
          children={
            <RatingForm
              ref={modalRef}
              reviewType="food"
              onClose={handleCloseModal}
            />
          }
        />
      )}
      {isSeeReviewModalOpen && (
        <CenterModal
          children={
            <SeeReviews
              ref={modalRef}
              reviewType="food"
              onClose={handleCloseModal}
              food_id={id}
            />
          }
        />
      )}
    </div>
  );
};

export default ProductCard;
