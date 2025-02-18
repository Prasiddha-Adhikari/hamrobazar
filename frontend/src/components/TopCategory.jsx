import React, { useState } from "react";
import { FaSave } from "react-icons/fa"; // Import the save icon from react-icons
import "./top.css";

const categories = [
  "Apparels & Accessories",
  "AutoMobiles",
  "Beauty & Health",
  "Books & Learning",
  "Business & Industrial",
  "Computer & Peripherials",
  "Electronics, Tv & More",
  "Events & Happening",
  "Fresh Veggies & Meat",
  "Furnishing & Appliances",
  "Jobs",
  "Mobile Phone & Accessories",
  "Music Instruments",
  "Pets & Pet Care",
  "Pets For Adoption & Free Stuff",
  "Real Estate",
  "Services",
  "Sports & Fitness",
  "Toys & Video Games",
  "Travel, Tour & Packages",
  "Want To Buy (Buyer's list)",
  // Add more categories as needed
];

const TopCategory = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setScrollStartX(e.clientX);
    setScrollLeft(document.querySelector(".category-list").scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const x = e.clientX;
    const walk = (x - scrollStartX) * 2; // Adjust speed of scroll
    document.querySelector(".category-list").scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleSave = () => {
    // Handle save functionality here (e.g., show a notification, save to a server, etc.)
    alert("Saved!");
  };

  return (
    <div className="border-b bg-white flex justify-between items-center flex-grow overflow-hidden pb-1">
      {/* Top Category Title */}
      <div className="flex items-center h-6 flex-grow">
        <div className="text-base font-normal pl-4 flex items-center whitespace-nowrap mr-4">
          Top Categories
        </div>
      </div>

      {/* Category List */}
      <div
        className="flex overflow-x-auto items-center space-x-4 hide-scrollbar category-list cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {[...categories, ...categories].map((category, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-gray-600 text-sm px-4 py-1 items-center rounded-md border border-gray-300 hover:bg-gray-300 cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="hidden sm:flex items-center text-sm font-medium text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
      >
        <FaSave className="mr-2" />
        Save
      </button>
    </div>
  );
};

export default TopCategory;
