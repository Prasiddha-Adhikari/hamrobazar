import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import gif from "../assets/Search.gif";
import Select from "react-select";
import Flag from "react-world-flags";
import down from "../assets/download.png";

// Country list with flag and code for select dropdown
const countryOptions = [
  { value: "+1", label: "+1 United States", flag: "US" },
  { value: "+44", label: "+44 United Kingdom", flag: "GB" },
  { value: "+91", label: "+91 India", flag: "IN" },
  { value: "+977", label: "+977 Nepal", flag: "NP" }, // Nepal
  { value: "+971", label: "+971 United Arab Emirates", flag: "AE" }, // UAE
  // Add other countries as needed
];

const OldLogin = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen p-4">
        {/* Left Column */}
        <div className="md:w-2/3 flex flex-col items-center justify-center bg-gray-50 space-y-4">
          <img
            src={gif} // Replace with your image URL
            alt="Signup Illustration"
            className="w-[90%] md:w-[85%]"
          />
          <img
            src={down} // Replace with your image URL
            alt="Signup Illustration"
            className="w-[90%] md:w-[85%] pt-16"
          />
        </div>

        {/* Right Column */}
        <div className="md:w-[40%] flex flex-col pt-12 pl-10 bg-gray-50">
          {/* Light Grey Box */}
          <div className="bg-gray-200 p-7 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700">
              For Existing Users <br /> Verify email{" "}
              <Link to="/oldlog" className="text-black hover:underline">
                Here
              </Link>
            </h3>
          </div>

          <h2 className="text-2xl font-semibold my-6">
            Verify Email{" "}
            <span className="text-gray-400 text-base font-normal">
              (for existing users)
            </span>
          </h2>
          <p className="text-sm pb-8">Existing Users need to verify their and update a new password to login.</p>
          <form className="w-full max-w-md space-y-4">
            <div className="border border-red-400 rounded-md">
              {/* Phone Number Box with Country Code */}
              <div className="flex items-center bg-white rounded-md overflow-hidden">
                {/* Email */}
                <input
                  type="email"
                  id="phone"
                  placeholder="Email"
                  className="w-full px-4 py-2 border-red-400 "
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full  text-black py-2 px-4 font-semibold rounded-md border border-gray-700`}
            >
              Verify
            </button>
            <p className="text-sm font-medium">
              Note : You will receive verification link in the wmail.
            </p>
          </form>
          <p className="mt-4 text-black font-semibold text-sm border-t py-12 ">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OldLogin;
