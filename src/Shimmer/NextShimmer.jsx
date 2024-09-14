import React from 'react'

const NextShimmer = () => {
  return (
    <div className="flex items-center flex-col justify-center h-screen w-full bg-gray-100">
          <div className="w-full h-64 bg-slate-400 rounded-lg sm:h-48 md:h-64 lg:h-96"></div>
          <div className="flex items-center space-x-4 w-full mt-6">
          <div className="w-12 h-12 bg-slate-400 rounded-full sm:w-10 sm:h-10 md:w-12 md:h-12"></div>
          <div className="flex flex-col space-y-2 w-full">
            <div className="w-2/3 h-4 bg-slate-400 rounded sm:w-1/2 md:w-1/3 lg:w-1/4"></div>
            <div className="w-1/4 h-4 bg-gray-700 rounded sm:w-1/5 md:w-1/6 lg:w-1/8"></div>
          </div>
        </div>
      </div>
  
  );
}

export default NextShimmer