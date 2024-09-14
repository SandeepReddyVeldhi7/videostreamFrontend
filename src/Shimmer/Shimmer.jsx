// components/Shimmer.js
import React from "react";

const Shimmer = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <div className="animate-pulse flex flex-col items-center space-y-4 p-4 max-w-2xl w-full">
        {/* Responsive placeholder for thumbnail or image */}
        <div className="w-full h-64 bg-slate-400 rounded-lg sm:h-48 md:h-64 lg:h-96"></div>

        {/* Responsive placeholder for text */}
        <div className="w-full flex flex-col items-start space-y-4">
          <div className="w-3/4 h-4 bg-slate-400 rounded sm:w-2/3 md:w-1/2 lg:w-1/3"></div>
          <div className="w-1/2 h-4 bg-gray-700 rounded sm:w-1/3 md:w-1/4 lg:w-1/5"></div>
        </div>

        {/* Responsive placeholder for other elements */}
        <div className="flex items-center space-x-4 w-full mt-6">
          <div className="w-12 h-12 bg-slate-400 rounded-full sm:w-10 sm:h-10 md:w-12 md:h-12"></div>
          <div className="flex flex-col space-y-2 w-full">
            <div className="w-2/3 h-4 bg-slate-400 rounded sm:w-1/2 md:w-1/3 lg:w-1/4"></div>
            <div className="w-1/4 h-4 bg-gray-700 rounded sm:w-1/5 md:w-1/6 lg:w-1/8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
