import React, { useState } from 'react';
import category from '../assets/category.svg';
import { GiFruitBowl } from 'react-icons/gi';
import { BsPersonFill } from 'react-icons/bs';
import { MdEvent, MdOutlineShoppingCart, MdOutlineWatch } from 'react-icons/md';
import { PiFlowerLotusThin, PiGuitar, PiHandCoins, PiHandHeartThin, PiTShirtDuotone } from 'react-icons/pi';
import { TbWheel } from 'react-icons/tb';
import { LuBookText, LuBriefcaseBusiness, LuSofa } from 'react-icons/lu';
import { FaComputer } from 'react-icons/fa6';
import { CiMobile4, CiPlug1 } from 'react-icons/ci';
import { HiOutlineDocument } from 'react-icons/hi';
import { IoAmericanFootball, IoGameControllerOutline, IoHomeOutline, IoPawOutline } from 'react-icons/io5';
import { SlPlane } from 'react-icons/sl';
import hbselect from '../assets/hbselect.png'
import './sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleDropdown = (categoryName) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="h-screen hidden md:block top-20  border-r">
      <div className="pb-4 border-b bg-white sticky top-0 z-10">
        <h2 className="text-base font-bold text-gray-800 flex items-center">
          <img src={category} alt="category icon" className="w-6 h-6 mr-2" />
          Category
        </h2>
      </div>
      <ul className="text-sm overflow-y-auto h-screen max-h-[calc(100vh-4rem)]">
        {/*  */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left py-2 my-1  text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
          >
            <img src={hbselect} alt="category icon" className="w-6 h-6 mr-2 bg-green-500 rounded-md p-[2px]" />
            <span className="flex-grow text-sm font-sans font-bold">HB Select</span>
          </button>
        </li>

        {/* Fashion Category */}
        <li className="border-b">
  <button
    className="flex items-center w-full text-left py-2 my-1 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
    onClick={() => toggleDropdown('Fashion')}
  >
    <PiTShirtDuotone className="mr-3 h-6 w-6" />
    <span className="flex-grow font-bold">Apparels & Accessories</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`w-4 h-4 text-gray-500 transform transition-transform ${
        activeCategory === 'Fashion' ? 'rotate-90' : 'rotate-0'
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
        color="black"
      />
    </svg>
  </button>
  {activeCategory === 'Fashion' && (
    <>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/baby-children-accessories" className="flex items-center">
            Baby & Children's Accessories
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/baby-children-clothing" className="flex items-center">
            Baby & Children's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/bags-luggage" className="flex items-center">
           Bags & Luggage
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/jewellery" className="flex items-center">
           Jewellery
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-accessories" className="flex items-center">
           Men's Accessories
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
           Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/others" className="flex items-center">
           Others
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/sunglasses" className="flex items-center">
           Sunglasses
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/thrift-store" className="flex items-center">
           Thrift Store
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/watches" className="flex items-center">
           Watches
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/thrift-store" className="flex items-center">
           Women's Accessories
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
           Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-shoes" className="flex items-center">
           Women's Shoes
        </Link>
      </li>
    </>
  )}
</li>

        {/* Automobiles */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left  my-1  py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Automobiles')}
          >
            <TbWheel className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Automobiles</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Automobiles' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Automobiles' && (
            <>
               <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Beauty & Health */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left  my-1  py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Beauty')}
          >
            <PiFlowerLotusThin className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Beauty & Health</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Beauty' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Beauty' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Books and Learning */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Books')}
          >
            <LuBookText className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Books & Learning</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Books' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Books' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Business */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Business')}
          >
            <LuBriefcaseBusiness className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Business & Industrial</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Business' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Business' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Computer */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Computer')}
          >
            <FaComputer className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Computer & Peripherials</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Computer' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Computer' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Electronics */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left  my-1  py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Electronics')}
          >
            <CiPlug1 className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Electronics, TVs, & More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Electronics' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Electronics' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Events */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left  my-1  py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Events')}
          >
            <MdEvent className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Events & Happening</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Events' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Events' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Fresh */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Fresh')}
          >
            <GiFruitBowl className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Fresh Veggies & Meat</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Fresh' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Fresh' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Furnishing */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Furnishing')}
          >
            <LuSofa className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Furnishing & Appliances</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Furnishing' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Furnishing' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Jobs */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Jobs')}
          >
            <HiOutlineDocument className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Jobs</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Jobs' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Jobs' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Mobile */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Mobile')}
          >
            <CiMobile4 className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Mobile Phones & Accessories</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Mobile' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Mobile' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Musics */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left  my-1  py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Musics')}
          >
            <PiGuitar className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Music Instruments</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Musics' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Musics' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Pets */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left  my-1  py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Pets')}
          >
            <IoPawOutline className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Pets & Pet Care</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Pets' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Pets' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* pets for adoption */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('adoption')}
          >
            <PiHandHeartThin className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Pets for Adoption & Free Stuff</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'adoption' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'adoption' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Realstate */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Realstate')}
          >
            <IoHomeOutline className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Real Estate</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Realstate' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Realstate' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Services */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left  my-1  py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Services')}
          >
            <PiHandCoins className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Services</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Services' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Services' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Sports */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left  my-1  py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Sports')}
          >
            <IoAmericanFootball className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Sports & Fitness</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Sports' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Sports' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Toys */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Toys')}
          >
            <IoGameControllerOutline className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Toys & video Games</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Toys' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Toys' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Travel */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left my-1   py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Travel')}
          >
            <SlPlane className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Travel, Tour & Packages</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Travel' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Travel' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
        {/* Want to Buy */}
        <li className="border-b">
          <button
            className="flex items-center w-full text-left  my-1 py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
            onClick={() => toggleDropdown('Want')}
          >
            <MdOutlineShoppingCart className="text-lg  mr-3 h-6 w-6 " />
            <span className="flex-grow font-bold">Want To Buy(Buyer's List)</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                activeCategory === 'Want' ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
                color='black'
              />
            </svg>
          </button>
          {activeCategory === 'Want' && (
            <>
             <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/mens-clothing" className="flex items-center">
            Men's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/womens-clothing" className="flex items-center">
            Women's Clothing
        </Link>
      </li>
      <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center">
        <Link to="/accessories" className="flex items-center">
           Accessories
        </Link>
      </li>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
