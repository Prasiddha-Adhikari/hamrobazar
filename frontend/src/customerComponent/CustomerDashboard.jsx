import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CustomerSidebar from './CustomerSidebar';

const CustomerDashboard = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <CustomerSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
  
        <div className="flex flex-col flex-grow">
          {/* Navbar */}
          <Navbar />
          
          {/* Content Area */}
          <div className="flex-grow p-6 bg-gray-100">
            <div className="text-xl font-bold mb-4">Customer Dashboard</div>
  
            {/* Details Section */}
            <div className="mt-4">
              <Outlet /> {/* Content from the routes will be displayed here */}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CustomerDashboard