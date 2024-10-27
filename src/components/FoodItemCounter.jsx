import React from "react";

const FoodItemCounter = ({
  id,
  cartItems,
  addToCart,
  removeFromCart,
  assets,
  className = "bottom-4 right-4",
}) => {
  return (
    <>
      {" "}
      {!cartItems[id] ? (
        <img
          src={assets.add_icon_white}
          alt="add_icon_white"
          className={`${className} w-9 absolute cursor-pointer rounded-full shadow-md`}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(id);
          }}
        />
      ) : (
        <div
          className={`${className} absolute flex items-center gap-2 p-1 rounded-full bg-white`}
        >
          <img
            src={assets.remove_icon_red}
            alt="remove_icon_red"
            className="w-8 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              removeFromCart(id);
            }}
          />
          <p>{cartItems[id]}</p>
          <img
            src={assets.add_icon_green}
            alt="add_icon_green"
            className="w-8 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(id);
            }}
          />
        </div>
      )}
    </>
  );
};

export default FoodItemCounter;
