import React from "react";

const ImageComponent = ({ className }) => {
  return (
    <img
      src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
      alt="Restaurant"
      className={`w-full h-full rounded-2xl ${className}`}
    />
  );
};

export default ImageComponent;
