import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
        <p className="text-lg text-gray-500 mt-2">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-500 text-white py-2 px-6 rounded-md text-lg hover:bg-blue-600"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
