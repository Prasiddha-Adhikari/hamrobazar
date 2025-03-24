import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft, FaEllipsisV, FaShare, FaFlag } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link for routing

const API_URL = import.meta.env.VITE_API_URL + '/products.php'; // Get API URL from .env

const Trending = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [products, setProducts] = useState([]); // State to hold products
  const [sortBy, setSortBy] = useState('random'); // Option for sorting by 'random' or 'views'

  const scrollContainerRef = useRef(null);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  };

  // Fetch products from the API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          let sortedProducts = data.data;

          // Sort based on selected criteria
          if (sortBy === 'random') {
            sortedProducts = shuffleArray(sortedProducts); // Shuffle the products randomly
          } else if (sortBy === 'views' && sortedProducts[0].views) {
            sortedProducts = sortedProducts.sort((a, b) => b.views - a.views); // Sort by views descending
          }

          setProducts(sortedProducts);
        } else {
          console.error('Error fetching products:', data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, [sortBy]); // Refetch products whenever sorting criteria changes

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.clientX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const x = e.clientX - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - x;
  };

  const handleMouseUp = () => setIsMouseDown(false);
  const handleMouseLeave = () => setIsMouseDown(false);

  const scrollRight = () => scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  const scrollLeftFunc = () => scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeaveProductArea = () => setIsHovering(false);
  const handleArrowMouseEnter = () => setIsHovering(true);
  const handleArrowMouseLeave = () => setIsHovering(false);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="pl-6 border-b-[1px] mt-1">
      <div className="flex items-center pb-2 border-b-[1px] border-gray-400 sticky top-0 bg-white z-10">
        <h2 className="text-base font-bold text-gray-800">Trending</h2>
        
        {/* Sorting Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="ml-auto p-1 border rounded-md"
        >
          <option value="random">Random</option>
          <option value="views">Most Views</option>
        </select>
        
        <a
          href="#"
          className="relative text-base bg-white rounded-lg ml-3 p-1 flex-shrink-0 hover:border-blue-500 border-2 border-transparent transition-all duration-200 ease-in-out"
        >
          Boost Ads
        </a>
      </div>

      <div className="flex bg-white relative">
        {isHovering && (
          <div
            className="absolute left-0 top-[40%] transform -translate-y-1/2 z-20 bg-gray-300 p-2 cursor-pointer rounded-full"
            onClick={scrollLeftFunc}
            onMouseEnter={handleArrowMouseEnter}
            onMouseLeave={handleArrowMouseLeave}
          >
            <FaArrowLeft size={14} />
          </div>
        )}

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-scroll scrollbar-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseLeave();
            handleMouseLeaveProductArea();
          }}
        >
          <div
            className="flex mt-2 space-x-2 items-start justify-start w-max h-60"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeaveProductArea}
          >
            {products.map((product) => (
              <div
                key={product.product_id}
                className="relative bg-white rounded-lg p-2 flex-shrink-0 hover:border-blue-500 border-2 border-transparent transition-all duration-200 ease-in-out"
              >
                {/* Link to Product Details */}
                <Link to={`/product/${product.product_id}`} className="block">
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="object-cover rounded-md mb-3 w-26 h-32"
                  />
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[14px] font-bold text-black truncate w-28">
                      {product.product_name}
                    </h3>

                    {/* Ellipsis button next to the product name */}
                    <button
                      onClick={() => toggleMenu(product.product_id)}
                      className="p-1 bg-gray-200 rounded-full ml-2"
                    >
                      <FaEllipsisV size={12} />
                    </button>
                  </div>
                </Link>

                {activeMenu === product.product_id && (
                  <div className="absolute right-2 top-12 w-28 bg-white shadow-md rounded-md">
                    <div
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => alert('Share clicked!')}
                    >
                      <FaShare className="mr-2" />
                      Share
                    </div>
                    <div
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => alert('Report clicked!')}
                    >
                      <FaFlag className="mr-2" />
                      Report
                    </div>
                  </div>
                )}
                <a href="#" className="text-xs text-black font-semibold mt-2 block">
                  {product.condition}
                </a>
                <p className="text-black text-[14px] font-bold font-sans">{product.price}</p>
              </div>
            ))}
          </div>
        </div>

        {isHovering && (
          <div
            className="absolute -right-3 top-[40%] transform -translate-y-1/2 z-20 bg-gray-300 p-2 cursor-pointer rounded-full"
            onClick={scrollRight}
            onMouseEnter={handleArrowMouseEnter}
            onMouseLeave={handleArrowMouseLeave}
          >
            <FaArrowRight size={14} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
