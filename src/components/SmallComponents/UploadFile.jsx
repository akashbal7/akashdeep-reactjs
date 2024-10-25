import React from "react";

const UploadFile = ({ children }) => {
  return (
    <>
      <label class="block text-sm font-medium text-gray-700" for="file_input">
        {children}
      </label>
      <input
        class="w-full text-sm text-gray-400 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
      />
    </>
  );
};

export default UploadFile;
