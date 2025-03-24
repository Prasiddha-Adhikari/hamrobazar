import React, { useState, useEffect } from "react";
import { FaShareAlt, FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import category from "../assets/category.svg";

const API_URL = import.meta.env.VITE_API_URL + "/products.php"; // Get API URL from .env

const Latest = () => {
  const [activeTab, setActiveTab] = useState("latest"); // Tracks active tab
  const [showMenu, setShowMenu] = useState(null); // Tracks which product menu is open
  const [products, setProducts] = useState([]); // Stores products
  const [showFullDescription, setShowFullDescription] = useState({}); // Tracks which descriptions are expanded

  const maxDescriptionLength = 100; // Maximum length for description before truncating

  // Fetch products from the API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data);
        } else {
          console.error("Error fetching products:", data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Filter the recommended products and sort by views
  const recommendedProducts = products
    .filter((product) => product.recommended)
    .sort((a, b) => b.views - a.views); // Sort by views (descending)

  // Choose which products to display
  const productsToShow = activeTab === "latest" ? products : recommendedProducts;

  const toggleMenu = (id) => {
    setShowMenu(showMenu === id ? null : id);
  };

  const handleProductClick = async (productId) => {
    try {
      console.log("Incrementing views...");

      const response = await fetch(`${API_URL}/updateViews.php?id=${productId}`);
      const data = await response.json();
      console.log(data); // Log response to check if the backend is returning success or error

      if (data.status !== "success") {
        console.error("Error updating views:", data.message);
      }
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  // Function to toggle full description view
  const handleToggleDescription = (productId) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="p-4 border-r-[1px] w-full md:w-[65%]">
      {/* Tabs (Sticky) */}
      <div className="flex gap-4 mb-4 border-b-[1px] bg-white sticky top-20 z-10">
        <h2
          className={`text-base font-medium cursor-pointer ${
            activeTab === "latest" ? "text-black border-b-2 border-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("latest")}
        >
          Latest Uploads
        </h2>
        <h2
          className={`text-base font-medium cursor-pointer ${
            activeTab === "recommended" ? "text-black border-b-2 border-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("recommended")}
        >
          Recommended
        </h2>
        <a href="#" className="ml-auto">
          <img src={category} alt="Categories" className="h-6 w-6" />
        </a>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-y-4 gap-x-4">
        {productsToShow.map((product) => (
          <div
            key={product.product_id} // Unique key
            className="flex items-start p-4 relative transition hover:border-blue-500 border-[1px] border-transparent rounded-lg h-[200px]"
          >
            {/* Image Section */}
            <div className="w-[160px]">
              {/* Main Image */}
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-36 h-28 object-cover rounded mr-4"
              />
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col ml-16 w-[75%]">
              <h3 className="text-lg font-semibold">{product.product_name}</h3>
              
              {/* Truncated Description with "Show more" / "Show less" */}
              <p className="text-sm text-gray-500 font-light">
                {showFullDescription[product.product_id]
                  ? product.description
                  : product.description.length > maxDescriptionLength
                  ? product.description.slice(0, maxDescriptionLength) + "..."
                  : product.description}
              </p>

              {/* Button to toggle full/short description */}
              {/* {product.description.length > maxDescriptionLength && (
                <button
                  onClick={() => handleToggleDescription(product.product_id)}
                  className="text-blue-500 text-sm mt-2"
                >
                  {showFullDescription[product.product_id] ? "Show less" : "Show more"}
                </button>
              )} */}

              <div className="flex items-center">
                <p className="text-lg font-semibold ml-2">${product.price}</p>
                <p className="text-sm text-gray-500"> | {product.subcategory_name}</p>
              </div>
            </div>

            {/* Three Dots Menu */}
            <div className="absolute top-2 right-2">
              <button className="text-gray-700 focus:outline-none" onClick={() => toggleMenu(product.product_id)}>
                &#x22EE; {/* Vertical Ellipsis */}
              </button>
              {showMenu === product.product_id && (
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

            {/* Link to individual product detail page */}
            <Link
              to={`/product/${product.product_id}`}
              className="absolute inset-0 z-10"
              onClick={() => handleProductClick(product.product_id)} // Trigger the view increment
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
