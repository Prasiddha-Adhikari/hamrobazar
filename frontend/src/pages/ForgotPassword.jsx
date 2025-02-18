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
  { value: "+977", label: "+977 Nepal", flag: "NP" },
  { value: "+971", label: "+971 United Arab Emirates", flag: "AE" },
];

const ForgotPassword = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen p-4">
        {/* Left Column */}
        <div className="md:w-2/3 flex flex-col items-center justify-center bg-gray-50 space-y-4">
          <img
            src={gif}
            alt="Signup Illustration"
            className="w-[90%] md:w-[85%]"
          />
          <img
            src={down}
            alt="Signup Illustration"
            className="w-[90%] md:w-[85%] pt-16"
          />
        </div>

        {/* Right Column */}
        <div className="md:w-[40%] flex flex-col pt-12 pl-10 bg-gray-50">
          <div className="bg-gray-200 p-8 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Make a Deal. <br /> Welcome to Hamrobazar
            </h3>
          </div>

          <h2 className="text-2xl font-semibold my-6">Reset Password</h2>
          <form className="w-full max-w-md space-y-4">
            <div className="border rounded-md">
              {/* Phone Number Box with Country Code */}
              <div className="flex items-center bg-white rounded-md overflow-hidden">
                <Select
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  options={countryOptions}
                  getOptionLabel={(e) => (
                    <div className="flex items-center space-x-2">
                      <Flag code={e.flag} style={{ width: 20, height: 15 }} />
                    </div>
                  )}
                  className="w-[20%]"
                  classNamePrefix="select-country"
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (base) => ({
                      ...base,
                      border: "none",
                      boxShadow: "none",
                      "&:hover": {
                        border: "none",
                      },
                    }),
                  }}
                />
                {/* Contact Number */}
                <input
                  type="tel"
                  id="phone"
                  placeholder="Contact number"
                  className="w-[60%] px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <hr className="pb-4" />
            <div>
              <label className="flex items-center space-x-2">
                <span className="text-black text-base font-semibold pb-2">
                  Reset password with OTP
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full text-black py-2 px-4 font-semibold rounded-md border border-gray-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
