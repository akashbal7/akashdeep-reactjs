import React, { useState, useRef, useEffect } from "react";
import ImageComponent from "../SmallComponents/ImageComponent/ImageComponent";
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";
import { FaPhone, FaLaptop, FaLocationArrow, FaUtensils } from "react-icons/fa";
import EmbeddedMap from "../SmallComponents/EmbeddedMap/EmbeddedMap";
import { useParams } from "react-router-dom";
import RatingForm from "../RatingForm";
import CenterModal from "../SmallComponents/CenterModal";
import SeeReviews from "../SeeReviews";
import { useAuth } from "../AuthProvider";

const RestaurantPage = () => {
  const { loggedInUser } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();
  const [isGiveReviewModalOpen, setIsGiveReviewModalOpen] = useState(false); // Modal visibility state
  const [isSeeReviewModalOpen, setIsSeeReviewModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Function to close the modal when clicking outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsGiveReviewModalOpen(false);
      setIsSeeReviewModalOpen(false);
    }
  };

  const handleOpenGiveReviewModal = () => {
    setIsGiveReviewModalOpen(true);
  };

  const handleOpenSeeReviewModal = () => {
    setIsSeeReviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsGiveReviewModalOpen(false);
    setIsSeeReviewModalOpen(false);
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      console.log("Fetching restaurant data...");
      try {
        const response = await fetch(`${API_BASE_URL}/restaurant/${id}`);
        const result = await response.json();
        if (response.ok) {
          setRestaurant(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      }
    };

    fetchRestaurantData();
  }, [id]);

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

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-start p-4 border-b border-gray-300">
        <div>
          <h1 className="text-2xl font-bold">{restaurant?.name}</h1>
          <div className="text-sm text-gray-500 flex items-center">
            <span className="mr-2">
              <Rating rating={restaurant?.average_rating || 0} />
            </span>{" "}
            {restaurant?.total_reviews} reviews
            <p className="border-l pl-1 ml-2 text-sm text-gray-500">
              {restaurant?.categories && restaurant.categories?.length > 0
                ? restaurant?.categories
                    .map((category) => category.name)
                    .join(", ")
                : "No cuisine"}
            </p>
          </div>

          <div className="flex items-center text-sm text-gray-500 mt-2">
            <div className="mr-2 flex">
              <FaLocationArrow className="mr-2 mt-0.5" />
              <span>
                {restaurant?.address?.address_line_1 +
                  ", " +
                  restaurant?.address?.city || "Address not available"}
              </span>
            </div>

            <div className="mr-2 flex border-l pl-1 ">
              <FaPhone className="mr-2 mt-0.5" />
              <span>{restaurant?.phone_number}</span>
            </div>
            <div className="mr-4 flex border-l pl-1 ">
              <FaLaptop className="mr-2 mt-0.5" />
              <a href={restaurant?.website} className="text-blue-600">
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 xl:h-96">
        <div className="overflow-hidden rounded-2xl shadow-slate-300 shadow-lg w-full h-full md:w-1/2">
          <ImageComponent
            src={`data:image/png;base64,${restaurant?.image_data}`}
          />
        </div>
        <div className="w-full h-full md:w-1/2 ml-10 ">
          <div className="p-4 shadow-slate-300 shadow-lg rounded-2xl h-full">
            <h2 className="text-lg font-semibold">Details</h2>
            <div className="mt-2 text-sm text-gray-700">
              <h3 className="font-bold">About</h3>
              <p>{restaurant?.about}</p>

              <h3 className="font-bold mt-4">Opening Hours</h3>
              <p>Days 7</p>
              <p>Hours 8</p>
              <h3 className="font-bold mt-4">Cuisines</h3>
              <p>
                {restaurant?.categories && restaurant?.categories?.length > 0
                  ? restaurant.categories
                      .map((category) => category.name)
                      .join(", ")
                  : "No cuisine"}
              </p>

              <h3 className="font-bold mt-4">Sitting Capacity</h3>
              <p>{restaurant?.sitting_capacity}</p>

              <button
                type="button"
                className="rounded-xl mt-6 text-sm px-5 py-2.5 text-gray-900 shadow-slate-300 shadow-lg bg-white border border-emerald-400 focus:outline-none hover:bg-emerald-100"
              >
                <span className="flex">
                  <FaUtensils className="mr-1 mt-1 pb-1" />{" "}
                  <span>View Menu</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between xl:h-70  mt-4">
        <div className="flex-1 md:flex-[0.3]">
          <div className="p-4 shadow-slate-300 shadow-lg rounded-2xl border-gray-300 h-full">
            <h2 className="text-lg font-semibold">Rating and Reviews</h2>

            <div className="flex justify-start">
              <Rating rating={restaurant?.average_rating || 0} />
              <span className="ml-2"> {restaurant?.total_reviews} reviews</span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between">
                <span>Food</span>
                <Rating rating={restaurant?.food_rating} />
              </div>
              <div className="flex justify-between">
                <span>Service</span>
                <Rating rating={restaurant?.service_rating} />
              </div>
              <div className="flex justify-between">
                <span>Value</span>
                <Rating rating={restaurant?.value_rating} />
              </div>

              <div className="flex justify-between">
                <span>Experience</span>
                <Rating rating={restaurant?.experience_rating} />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                children="Give Review"
                onClick={handleOpenGiveReviewModal}
              />
              <Button
                children="See Reviews"
                onClick={handleOpenSeeReviewModal}
              />
            </div>
          </div>
        </div>

        <div className="ml-10  flex-1 md:flex-[0.7]">
          <div className="p-4 shadow-slate-300 shadow-lg  h-full  rounded-2xl">
            <h2 className="text-lg font-semibold">Location and Contact</h2>
            <div className="w-full bg-gray-200 my-2">
              <EmbeddedMap />
            </div>
            <div className="text-sm text-gray-700 mt-2">
              <div className="mr-2 flex">
                <FaLocationArrow className="mr-2 mt-0.5" />
                <span>
                  {restaurant?.address?.address_line_1 +
                    ", " +
                    restaurant?.address?.city || "Address not available"}
                </span>
              </div>
              <div className="flex">
                <div className="mr-2 flex">
                  <FaPhone className="mr-2 mt-0.5" />
                  <span>{restaurant?.phone_number}</span>
                </div>
                <div className="mr-4 flex">
                  <FaLaptop className="mr-2 mt-0.5" />
                  <a href={restaurant?.website} className="text-blue-600">
                    Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Render the modal only when isGiveReviewModalOpen is true */}
      {isGiveReviewModalOpen && (
        <CenterModal
          children={
            <RatingForm
              ref={modalRef}
              reviewType="restaurant"
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
              onClose={handleCloseModal}
              reviewType="restaurant"
            />
          }
        />
      )}
    </div>
  );
};

export default RestaurantPage;
