import React from "react";
import hbselect from "../assets/hbselect.png";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-white sticky top-0 z-50 h-[5rem] flex items-center">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between p-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={hbselect}
              alt="Hamro Bazar Logo"
              className="h-6 bg-black rounded-md"
            />
            <span
              className="text-sm sm:text-lg font-bold text-gray-800"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Link to="/">hamrobazar</Link>
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex items-center w-[50%] md:w-[40rem] h-[2.5rem] border border-black transition duration-300 rounded-md">
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}
            />
            <FaSearch className="text-gray-600 ml-auto mr-2" />
          </div>

          {/* Buttons */}
          <div className="hidden md:flex text-sm justify-end items-center space-x-4">
            <Link to="/postforfree">
              <button className="bg-black text-white py-[1px] px-2 md:px-4 md:py-2 md:text-sm text-[14] rounded-md group hover:bg-white border border-black hover:text-black transition duration-500 flex items-center">
                <span className="bg-white text-black rounded-sm px-1 mr-1 group-hover:bg-black group-hover:text-white transition duration-300 font-bold text-sm">
                  +
                </span>
                Post for free
              </button>
            </Link>

            {/* Pipe */}
            <span className="hidden sm:inline-block font-bold text-2xl">|</span>

            <button className="text-gray-600 hover:text-blue-700 px-4 py-2 rounded-md flex items-center">
              <Link to="/login">Login</Link>
            </button>
            <button className="border border-black text-black px-4 py-2 rounded-md hover:text-white hover:bg-black transition duration-300 flex items-center">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
