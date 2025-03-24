import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";
import Navbar from "../components/Navbar";

const VendorDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <VendorSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <Navbar />
        
        {/* Content Area */}
        <div className="flex-grow p-6 bg-gray-100">
          <div className="text-xl font-bold mb-4">Vendor Dashboard</div>

          {/* Details Section */}
          <div className="mt-4">
            <Outlet /> {/* Content from the routes will be displayed here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
