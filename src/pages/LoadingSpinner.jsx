// LoadingSpinner.js
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;
