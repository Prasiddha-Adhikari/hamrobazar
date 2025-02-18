import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TopCategory from "../components/TopCategory";
import Hero from "../components/Hero";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Layout Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex flex-col md:flex-row space-y-4 md:space-y-0">
        {/* Sidebar */}
        <aside className="w-full md:w-[25%] bg-white sticky top-20  overflow-auto md:h-screen">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-[75%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
