import React, { useState, useRef } from 'react';
import { FaArrowRight, FaArrowLeft, FaEllipsisV, FaShare, FaFlag } from 'react-icons/fa';

const Trending = () => {
  const products = [
    { id: 1, name: 'Product 1 aksjdlkajlsdjlkajlsdjasldjalkjsdjsj', price: 'रू. 500', image: 'https://placehold.co/600x400', condition: 'Brand New' },
    { id: 2, name: 'Product 2', price: 'रू. 1200', image: 'https://placehold.co/600x400', condition: 'Like New' },
    { id: 3, name: 'Product 3', price: 'रू. 750', image: 'https://placehold.co/600x400', condition: 'Not Working' },
    { id: 4, name: 'Product 4', price: 'रू. 1500', image: 'https://placehold.co/600x400', condition: 'Brand New' },
    { id: 5, name: 'Product 5', price: 'रू. 1500', image: 'https://placehold.co/600x400', condition: 'Like New' },
    { id: 6, name: 'Product 6', price: 'रू. 1500', image: 'https://placehold.co/600x400', condition: 'Not Working' },
    { id: 7, name: 'Product 7', price: 'रू. 1500', image: 'https://placehold.co/600x400', condition: 'Brand New' },
    { id: 8, name: 'Product 8', price: 'रू. 1500', image: 'https://placehold.co/600x400', condition: 'Like New' },
  ];

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const scrollContainerRef = useRef(null);

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
    <div className="pl-6 border-b-[1px] mt-1"> {/* Reduced top margin */}
      <div className="flex items-center pb-2 border-b-[1px] border-gray-400 sticky top-0 bg-white z-10">
        <h2 className="text-base font-bold text-gray-800">Trending</h2> {/* Removed top padding */}
        <a
          href="#"
          className="relative text-base bg-white rounded-lg ml-auto p-1 flex-shrink-0 hover:border-blue-500 border-2 border-transparent transition-all duration-200 ease-in-out"
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
                key={product.id}
                className="relative bg-white rounded-lg p-2 flex-shrink-0 hover:border-blue-500 border-2 border-transparent transition-all duration-200 ease-in-out"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded-md mb-3 w-26 h-32"
                />
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[14px] font-bold text-black truncate w-28">
                    {product.name}
                  </h3>
                  <button
                    onClick={() => toggleMenu(product.id)}
                    className="p-1 bg-gray-200 rounded-full"
                  >
                    <FaEllipsisV size={12} />
                  </button>
                </div>
                {activeMenu === product.id && (
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
