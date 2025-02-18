import React, { useState } from 'react';
import { FaShareAlt, FaFlag } from 'react-icons/fa';
import category from '../assets/category.svg';
import { products } from './products'; // Import the products data

const Latest = () => {
  const [activeTab, setActiveTab] = useState('latest'); // Tracks the active tab
  const [showMenu, setShowMenu] = useState(null); // Tracks which product menu is open
  const [categoryName, setCategoryName] = useState('Apparels & Accessories'); // Default category

  // Flatten the products for the selected category
  const latestProducts = products[categoryName]
    ? products[categoryName].map((category, idx) =>
        category.products.map((product) => ({
          ...product,
          uniqueKey: `${categoryName}-${idx}-${product.id}`, // Create unique key
        }))
      ).flat()
    : [];

  // Filter the products marked as recommended
  const recommendedProducts = latestProducts.filter((product) => product.recommended);

  // Choose which products to display based on the active tab
  const productsToShow = activeTab === 'latest' ? latestProducts : recommendedProducts;

  const toggleMenu = (id) => {
    setShowMenu(showMenu === id ? null : id);
  };

  return (
    <div className="p-4 border-r-[1px] w-full md:w-[65%]">
      {/* Tabs (Sticky) */}
      <div className="flex gap-4 mb-4 border-b-[1px] bg-white sticky top-20 z-10">
        <h2
          className={`text-base font-medium cursor-pointer ${
            activeTab === 'latest' ? 'text-black border-b-2 border-black' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('latest')}
        >
          Latest Uploads
        </h2>
        <h2
          className={`text-base font-medium cursor-pointer ${
            activeTab === 'recommended' ? 'text-black border-b-2 border-black' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('recommended')}
        >
          Recommended
        </h2>
        <a href="#" className="ml-auto">
          <img src={category} alt="" className="h-6 w-6" />
        </a>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-y-4 gap-x-4">
        {productsToShow.map((product) => (
          <div
            key={product.uniqueKey} // Use unique key
            className="flex items-start p-4 relative transition hover:border-blue-500 border-[1px] border-transparent rounded-lg h-[200px]"
          >
            {/* Image Section */}
            <div className="w-[160px]">
              {/* Main Image */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-36 h-28 object-cover rounded mr-4"
              />
              {/* Image Previews */}
              <div className="flex gap-2 mt-4">
                {product.images.slice(1, 4).map((image, index) => (
                  <img
                    key={`${product.uniqueKey}-img-${index}`} // Combine uniqueKey with index
                    src={image}
                    alt={`${product.name} preview ${index + 1}`}
                    className="w-10 h-10 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col ml-16 w-[75%]">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="flex items-center">
                <p className="text-lg font-semibold ml-2">{product.price}</p>
                <p className="text-sm text-gray-500">{`| ${product.condition}`}</p>
              </div>
            </div>

            {/* Three Dots Menu */}
            <div className="absolute top-2 right-2">
              <button
                className="text-gray-700 focus:outline-none"
                onClick={() => toggleMenu(product.id)}
              >
                &#x22EE; {/* Vertical Ellipsis */}
              </button>
              {showMenu === product.id && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-32 z-10">
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                    <FaShareAlt className="mr-2" />
                    Share
                  </button>
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                    <FaFlag className="mr-2" />
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
