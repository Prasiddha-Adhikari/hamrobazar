import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <Navbar />
        
        {/* Content Area */}
        <div className="flex-grow p-6 bg-gray-100">
          <div className="text-xl font-bold mb-4">Admin Dashboard</div>

          {/* Details Section */}
          <div className="mt-4">
            <Outlet /> {/* Content from the routes will be displayed here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
