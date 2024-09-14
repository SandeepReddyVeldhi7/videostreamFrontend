import React from "react";

const Help = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Help Center</h1>

      <div className="flex flex-col items-center space-y-4">
        {/* Gmail */}
        <a
          href="mailto:veldhisandeepreddy@gmail.com"
          className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 13.6l-11.6-8.6h23.2l-11.6 8.6zm0 1.8l-11.6-8.6v10.2c0 1 0.8 1.8 1.8 1.8h19.6c1 0 1.8-0.8 1.8-1.8v-10.2l-11.6 8.6z" />
          </svg>
          veldhisandeepreddy@gmail.com
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/sundeep_reddy_07"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg shadow-md hover:bg-purple-600 hover:text-white transition duration-300"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.2c-2.8 0-3.1 0-4.2 0.1-1.1 0-1.8 0.2-2.4 0.4-0.7 0.2-1.2 0.5-1.7 1s-0.8 1-1 1.7c-0.2 0.6-0.4 1.3-0.4 2.4 0 1.1-0.1 1.4-0.1 4.2s0 3.1 0.1 4.2c0 1.1 0.2 1.8 0.4 2.4 0.2 0.7 0.5 1.2 1 1.7 0.5 0.5 1 0.8 1.7 1 0.6 0.2 1.3 0.4 2.4 0.4 1.1 0 1.4 0.1 4.2 0.1s3.1 0 4.2-0.1c1.1 0 1.8-0.2 2.4-0.4 0.7-0.2 1.2-0.5 1.7-1s0.8-1 1-1.7c0.2-0.6 0.4-1.3 0.4-2.4 0-1.1 0.1-1.4 0.1-4.2s0-3.1-0.1-4.2c0-1.1-0.2-1.8-0.4-2.4-0.2-0.7-0.5-1.2-1-1.7s-1-0.8-1.7-1c-0.6-0.2-1.3-0.4-2.4-0.4-1.1 0-1.4-0.1-4.2-0.1z" />
            <circle cx="12" cy="12" r="3.2" />
          </svg>
          sundeep_reddy_07
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/feed/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.47 24h4.94V7.98H.47V24zm7.18-16.02h4.77v2.12h.07c.66-1.25 2.28-2.56 4.7-2.56 5.02 0 5.95 3.3 5.95 7.58V24h-4.94v-7.95c0-1.9-.04-4.34-2.64-4.34-2.64 0-3.04 2.06-3.04 4.19V24h-4.95V7.98z" />
          </svg>
          LinkedIn Profile
        </a>
      </div>
    </div>
  );
};

export default Help;
