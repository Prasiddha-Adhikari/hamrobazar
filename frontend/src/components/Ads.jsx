import React from 'react';

const Ads = () => {
  return (
    <div className="bg-gray-100 hidden md:inline-block py-4 px-6 rounded-md shadow-md w-full sm:w-1/4 sm:h-1/3  mt-6">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-800 text-center">
          Special Offer!
        </h3>
        <p className="text-sm text-gray-600 text-center mt-2">
          Grab amazing deals on premium listings. Limited time offer!
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mt-4">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Ads;
