import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomerSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-20'} h-screen transition-all`}>
      <div className="flex justify-between p-4 items-center">
        <h2 className={`text-2xl font-bold ${!isOpen ? 'hidden' : ''}`}>Customer Panel</h2>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isOpen ? '←' : '→'}
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          {/* <li className="my-2">
            <Link to="/vendor/Manage-products" className="block px-4 py-2 hover:bg-gray-700 rounded">
              {isOpen ? 'Manage Vendors' : 'Vendors'}
            </Link>
          </li> */}
          <li className="my-2">
            <Link to="/customer/add-product" className="block px-4 py-2 hover:bg-gray-700 rounded">
              {isOpen ? 'Add Product' : 'Products'}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomerSidebar;
