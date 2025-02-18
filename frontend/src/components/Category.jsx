import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiFlowerLotusThin, PiGuitar, PiHandCoins, PiHandHeartThin, PiTShirtDuotone } from 'react-icons/pi';
import { BsPersonFill } from 'react-icons/bs';
import { MdEvent, MdOutlineShoppingCart, MdOutlineWatch } from 'react-icons/md';
import './sidebar.css'
import { TbWheel } from 'react-icons/tb';
import { LuBookText, LuBriefcaseBusiness, LuSofa } from 'react-icons/lu';
import { FaComputer } from 'react-icons/fa6';
import { CiMobile4, CiPlug1 } from 'react-icons/ci';
import { GiFruitBowl } from 'react-icons/gi';
import { HiOutlineDocument } from 'react-icons/hi';
import { IoAmericanFootball, IoGameControllerOutline, IoHomeOutline, IoPawOutline } from 'react-icons/io5';
import { SlPlane } from 'react-icons/sl';
import category from '../assets/category.svg';
import hbselect from '../assets/hbselect.png'

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleDropdown = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const categories = [
    {
      name: 'Apparels & Accessories',
      icon: <PiTShirtDuotone className="mr-3 h-6 w-6" />,
      links: [
        { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
        { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
        { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
      ]
    },
    {
        name: 'Automobiles',
        icon: <TbWheel className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Beauty & Health',
        icon: <PiFlowerLotusThin className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Books & Learning',
        icon: <LuBookText className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Business & Industrial',
        icon: <LuBriefcaseBusiness className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Computer & Peripherials',
        icon: <FaComputer className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Electronics, TVs, & More',
        icon: <CiPlug1 className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Events & Happening',
        icon: <MdEvent className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Fresh Veggies & Meat',
        icon: <GiFruitBowl className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Furnishing & Appliances',
        icon: <LuSofa className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Jobs',
        icon: <HiOutlineDocument className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Mobile Phones & Accessories',
        icon: <CiMobile4 className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Music Instruments',
        icon: <PiGuitar className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Pets & Pet Care',
        icon: <IoPawOutline className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Pets for Adoption & Free Stuff',
        icon: <PiHandHeartThin className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Real Estate',
        icon: <IoHomeOutline className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Services',
        icon: <PiHandCoins className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Sports & Fitness',
        icon: <IoAmericanFootball className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Toys & video Games',
        icon: <IoGameControllerOutline className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: 'Travel, Tour & Packages',
        icon: <SlPlane className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
      {
        name: "Want To Buy(Buyer's List)",
        icon: <MdOutlineShoppingCart className="mr-3 h-6 w-6" />,
        links: [
          { to: '/mens-clothing', label: "Men's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/womens-clothing', label: "Women's Clothing", icon: <BsPersonFill className="mr-2" /> },
          { to: '/accessories', label: 'Accessories', icon: <MdOutlineWatch className="mr-2" /> }
        ]
      },
    
  ];

  return (
    <div className="h-screen top-20 border-r">
      <div className="pb-4 border-b bg-white sticky top-0 z-10">
        <h2 className="text-base font-bold text-gray-800 flex items-center">
          <img src={category} alt="category icon" className="w-6 h-6 mr-2" />
          Category
        </h2>
      </div>
      <ul className="text-sm overflow-y-auto max-h-[calc(100vh-4rem)]">
        {/* HB Select Button */}
        <li className="border-b">
          <button className="flex items-center w-full text-left py-2 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none">
            <img src={hbselect} alt="category icon" className="w-6 h-6 mr-2 bg-green-500 rounded-md p-[2px]" />
            <span className="flex-grow text-sm font-sans font-bold">HB Select</span>
          </button>
        </li>

        {/* Categories */}
        {categories.map((category) => (
          <li className="border-b" key={category.name}>
            <button
              className="flex items-center w-full text-left py-2 my-1 text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none"
              onClick={() => toggleDropdown(category.name)}
            >
              {category.icon}
              <span className="flex-grow font-bold">{category.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-4 h-4 text-gray-500 transform transition-transform ${
                  activeCategory === category.name ? 'rotate-90' : 'rotate-0'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {activeCategory === category.name && (
              <ul>
                {category.links.map((link) => (
                  <li className="pl-10 text-sm text-gray-600 font-semibold hover:text-gray-800 flex items-center" key={link.to}>
                    <Link to={link.to} className="flex items-center">
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
