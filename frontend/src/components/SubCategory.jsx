import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaShareAlt, FaFlag } from 'react-icons/fa';
import category from '../assets/category.svg';
import products from './products.js'; // Import the product data
import Filter from './Filter'; // Import the Filter component

const SubCategory = () => {
  const [showMenu, setShowMenu] = useState(null);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryProducts, setSubcategoryProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For filtered products

  const { categoryName } = useParams(); // Get the category name from the URL

  useEffect(() => {
    // Find the corresponding category from products.js based on the categoryName
    const selectedCategory = products['Apparels & Accessories'].find(
      (category) => category.path === categoryName
    );

    if (selectedCategory) {
      setSubcategoryName(selectedCategory.name);
      setSubcategoryProducts(selectedCategory.products);
      setFilteredProducts(selectedCategory.products); // Initialize filtered products
    } else {
      setSubcategoryName('Category Not Found');
      setSubcategoryProducts([]);
      setFilteredProducts([]);
    }
  }, [categoryName]); // Re-run the effect when categoryName changes

  const toggleMenu = (id) => {
    setShowMenu(showMenu === id ? null : id);
  };

  // Filter handler function
  const handleFilter = (filters) => {
    const filtered = subcategoryProducts.filter((product) => {
      const matchesNegotiable =
        filters.negotiable === null || product.negotiable === filters.negotiable;
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesCondition =
        !filters.condition || product.condition === filters.condition;

      // Currently not filtering by location or radius
      return matchesNegotiable && matchesPrice && matchesCondition;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-row px-4 min-h-screen">
      {/* Left Section: Subcategory Content */}
      <div className="border-r-[1px] w-[70%]">
        {/* Category Name */}
        <div className="flex border-b-[1px] bg-white">
          <h2 className="text-xl p-2 text-gray-500 font-medium cursor-pointer">
            Category: {subcategoryName}
          </h2>
          <a href="#" className="ml-auto">
            <img src={category} alt="Category" className="h-6 w-6" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-start p-4 relative transition hover:border-blue-500 border-[1px] border-transparent rounded-lg h-[200px]"
            >
              {/* Image Section */}
              <div className="w-[160px]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-36 h-28 object-cover rounded mr-4"
                />
                <div className="flex gap-2 mt-4">
                  {product.images.slice(1, 4).map((image, index) => (
                    <img
                      key={index}
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
                  &#x22EE;
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

      {/* Right Section: Filter */}
      <div className="w-[30%] bg-gray-50 p-4">
        <Filter onFilter={handleFilter} />
      </div>
    </div>
  );
};

export default SubCategory;
