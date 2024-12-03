import React from "react";

const ImageComponent = ({ className, src }) => {
  return (
    <img
      src={src}
      alt="Restaurant"
      className={`w-full h-full rounded-2xl ${className}`}
    />
  );
};

export default ImageComponent;
