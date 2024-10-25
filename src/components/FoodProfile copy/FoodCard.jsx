import React, { useContext, useEffect, useState, useRef } from "react";
import "./FoodCard.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useParams } from "react-router-dom";
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";
import ImageComponent from "../SmallComponents/ImageComponent/ImageComponent";
import SeeReviews from "../SeeReviews";
import CenterModal from "../SmallComponents/CenterModal";
import RatingForm from "../RatingForm";

const ProductCard = () => {
  const { id } = useParams();
  const { food_list, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);
  const [isGiveReviewModalOpen, setIsGiveReviewModalOpen] = useState(false); // Modal visibility state
  const [isSeeReviewModalOpen, setIsSeeReviewModalOpen] = useState(false);
  const modalRef = useRef(null);
  const product = food_list.find((product) => product._id === id);

  // Function to close the modal when clicking outside
  const handleClickOutside = (event) => {
    console.log("clickeddddddddddddddd handleClickOutside");
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsGiveReviewModalOpen(false);
    }
  };

  useEffect(() => {
    if (isGiveReviewModalOpen) {
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
  }, [isGiveReviewModalOpen]);

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
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex mb-4 flex-col md:flex-row">
        <div className="flex-1 flex-[0.6] rounded-2xl overflow-hidden w-full h-full md:w-1/2 shadow-slate-300 shadow-lg">
          <ImageComponent />
        </div>

        <div className="flex-1 md:flex-[0.4] md:w-1/2 ml-4 flex flex-col justify-between">
          <div className="border-b mb-2 pb-2">
            <div className="flex justify-between">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="text-sm flex text-gray-500">
                  <Rating rating={4} />
                  <span className="ml-2">955 reviews</span>
                </div>
                <p className="text-gray-500">Chinese, italian</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-800">£41.10</p>
                <p className="text-green-600 font-medium">In Stock</p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              children="Add to Cart"
              onClick={(e) => {
                addToCart(id);
              }}
            />
          </div>

          <div className="">
            <div className="bg-gray-100 p-2 rounded-2xl shadow-slate-300 shadow-lg">
              <h3 className="text-xl font-semibold">Nutrition Facts</h3>
              <p className="text-sm text-gray-600">Serving Size about 82g</p>

              <div className="border-t border-black mt-1"></div>
              <div className="text-sm ">
                <p className="flex justify-between">
                  <span>Calories 200</span>
                  <span>Calories from Fat 130</span>
                </p>

                <div className="border-t border-black my-1"></div>
                <div className="flex justify-end">
                  <span className="">% daily value</span>
                </div>
                <div>
                  <p className="flex justify-between">
                    <span>Total Fat 14g</span>
                    <span>22%</span>
                  </p>
                  <div className="ml-2">
                    <p className="flex justify-between text-gray-500">
                      <span>Saturated Fat 9g</span>
                      <span>22%</span>
                    </p>
                    <p className="flex justify-between text-gray-500">
                      <span>Trans Fat 0g</span>
                    </p>
                  </div>
                </div>
                <p className="flex justify-between">
                  <span>Cholesterol 55mg</span>
                  <span>18%</span>
                </p>
                <p className="flex justify-between">
                  <span>Sodium 40mg</span>
                  <span>2%</span>
                </p>
                <div>
                  <p className="flex justify-between">
                    <span>Total Carbohydrate 17g</span>
                    <span>6%</span>
                  </p>
                  <div className="ml-2">
                    <p className="flex justify-between text-gray-500">
                      <span>Dietary Fiber 1g</span>
                      <span>4%</span>
                    </p>
                    <p className="flex justify-between text-gray-500">
                      <span>Sugars 14g</span>
                    </p>
                  </div>
                </div>
                <p className="flex justify-between">
                  <span>Protein 3g</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex-1 md:flex-[0.3]"></div>
        </div>
      </div>

      <div className="flex">
        <div className="p-4 border flex-1 md:flex-[0.3] rounded-2xl shadow-slate-300 shadow-lg h-full">
          <h2 className="text-lg font-semibold">Rating and Reviews</h2>

          <div className="flex justify-start">
            <Rating rating={3} />
            <span className="ml-2"> 1452 reviews</span>
          </div>
          <div className="mt-2">
            <div className="flex justify-between">
              <span>Taste</span>
              <Rating rating={3} />
            </div>
            <div className="flex justify-between">
              <span>Texture</span>
              <Rating rating={3} />
            </div>
            <div className="flex justify-between">
              <span>Quality of Ingredients</span>
              <Rating rating={3} />
            </div>
            <div className="flex justify-between">
              <span>Presentation</span>
              <Rating rating={3} />
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
        <CenterModal children={<SeeReviews onClose={handleCloseModal} />} />
      )}
    </div>
  );
};

export default ProductCard;
